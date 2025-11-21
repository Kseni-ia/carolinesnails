import React, { useState, useEffect } from 'react';
import { format, addDays, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isSameDay, addMonths, subMonths, setHours, setMinutes, isBefore, startOfDay, addMinutes, areIntervalsOverlapping, parseISO } from 'date-fns';
import { cs } from 'date-fns/locale';
import { httpsCallable } from 'firebase/functions';
import { functions, db } from '../../firebase/config';
import { collection, addDoc } from 'firebase/firestore';

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    serviceName?: string;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, serviceName = 'Manikúra' }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [availableSlots, setAvailableSlots] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState<'date' | 'time' | 'form' | 'success'>('date');
    const [clientName, setClientName] = useState('');
    const [clientPhone, setClientPhone] = useState('');
    const [clientEmail, setClientEmail] = useState('');

    const resetForm = () => {
        setStep('date');
        setSelectedDate(null);
        setSelectedTime(null);
        setClientName('');
        setClientPhone('');
        setClientEmail('');
        setAvailableSlots([]);
    };

    // useEffect(() => {
    //     initClient().catch(console.error);
    // }, []);

    useEffect(() => {
        if (selectedDate) {
            fetchAvailableSlots(selectedDate);
        }
    }, [selectedDate]);

    const fetchAvailableSlots = async (date: Date) => {
        setLoading(true);
        // Define working hours (9:00 to 18:00)
        const workStartHour = 9;
        const workEndHour = 18;
        const slotDuration = 60; // minutes
        const serviceDuration = 240; // 4 hours service in minutes
        const bufferDuration = 60; // 1 hour buffer in minutes

        // Get busy events from Google Calendar
        const start = setHours(setMinutes(date, 0), workStartHour);
        const end = setHours(setMinutes(date, 0), workEndHour);

        try {
            const checkAvailabilityFn = httpsCallable(functions, 'checkAvailability');
            const result = await checkAvailabilityFn({
                timeMin: start.toISOString(),
                timeMax: end.toISOString()
            });
            const busyEvents = (result.data as any[]) || [];

            // Generate all hourly slots first
            const slots: string[] = [];
            let currentSlot = start;

            while (isBefore(currentSlot, end)) {
                const slotStart = currentSlot;
                const slotEnd = addMinutes(slotStart, slotDuration);

                // Check if this slot is available considering bidirectional blocking
                const isBusy = busyEvents.some((event: any) => {
                    const eventStart = parseISO(event.start.dateTime || event.start.date);
                    const eventEnd = parseISO(event.end.dateTime || event.end.date);

                    // Check if current slot overlaps with existing event
                    const directOverlap = areIntervalsOverlapping(
                        { start: slotStart, end: slotEnd },
                        { start: eventStart, end: eventEnd }
                    );

                    // Check if current slot is within 5 hours before any existing booking
                    const slotIsBeforeEvent = slotEnd <= eventStart;
                    const hoursBeforeEvent = (eventStart.getTime() - slotEnd.getTime()) / (1000 * 60 * 60);
                    const withinBlockingWindowBefore = slotIsBeforeEvent && hoursBeforeEvent < 5;

                    // Check if current slot is within 1 hour after any existing booking (buffer time only)
                    const slotIsAfterEvent = slotStart >= eventEnd;
                    const hoursAfterEvent = (slotStart.getTime() - eventEnd.getTime()) / (1000 * 60 * 60);
                    const withinBlockingWindowAfter = slotIsAfterEvent && hoursAfterEvent < 1;

                    return directOverlap || withinBlockingWindowBefore || withinBlockingWindowAfter;
                });

                if (!isBusy) {
                    slots.push(format(slotStart, 'HH:mm'));
                }

                currentSlot = addMinutes(currentSlot, slotDuration);
            }

            setAvailableSlots(slots);
        } catch (error) {
            console.error("Error fetching availability", error);
            setAvailableSlots([]);
        } finally {
            setLoading(false);
            setStep('time');
        }
    };



    const handleDateClick = (day: Date) => {
        if (isBefore(day, startOfDay(new Date()))) return; // Disable past dates
        setSelectedDate(day);
    };

    const handleTimeSelect = (time: string) => {
        setSelectedTime(time);
        setStep('form');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (!selectedDate || !selectedTime) return;

        const [hours, minutes] = selectedTime.split(':').map(Number);
        const serviceDuration = 240; // 4 hours service in minutes
        const bufferDuration = 60; // 1 hour buffer in minutes

        // The actual service starts at the selected time and lasts for serviceDuration
        const serviceStartDateTime = setHours(setMinutes(selectedDate, minutes), hours);
        const serviceEndDateTime = addMinutes(serviceStartDateTime, serviceDuration);

        const eventDetails = {
            summary: `Rezervace: ${serviceName} - ${clientName}`,
            description: `Klient: ${clientName}\nTel: ${clientPhone}\nEmail: ${clientEmail}\n\nRezervace na ${selectedTime}. Služba trvá ${serviceDuration / 60} hodiny.`,
            start: serviceStartDateTime,
            end: serviceEndDateTime,
        };

        try {
            // Save to Firestore first
            const reservationData = {
                clientName,
                clientPhone,
                clientEmail,
                serviceName,
                serviceStartDateTime: serviceStartDateTime.toISOString(),
                serviceEndDateTime: serviceEndDateTime.toISOString(),
                selectedTime,
                selectedDate: selectedDate.toISOString(),
                createdAt: new Date().toISOString(),
                status: 'confirmed'
            };

            const docRef = await addDoc(collection(db, 'reservations'), reservationData);
            console.log('Reservation saved with ID:', docRef.id);

            // Then create Google Calendar event
            const createBookingFn = httpsCallable(functions, 'createBooking');
            await createBookingFn({
                summary: eventDetails.summary,
                description: eventDetails.description,
                startTime: eventDetails.start.toISOString(),
                endTime: eventDetails.end.toISOString(),
            });

            // Show success
            setLoading(false);
            setStep('success');
        } catch (error) {
            console.error('Booking failed', error);
            setLoading(false);
            alert('Rezervace se nezdařila. Zkuste to prosím znovu.');
        }
    };

    const renderHeader = () => {
        return (
            <div className="flex justify-between items-center mb-6 px-2">
                <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="text-primary-400 hover:text-white transition-colors">
                    ←
                </button>
                <span className="text-xl font-serif font-bold text-white capitalize">
                    {format(currentMonth, 'MMMM yyyy', { locale: cs })}
                </span>
                <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="text-primary-400 hover:text-white transition-colors">
                    →
                </button>
            </div>
        );
    };

    const renderDays = () => {
        const days = [];
        const startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });

        for (let i = 0; i < 7; i++) {
            days.push(
                <div key={i} className="text-center text-gray-400 text-sm font-medium py-2">
                    {format(addDays(startDate, i), 'EEEEEE', { locale: cs })}
                </div>
            );
        }
        return <div className="grid grid-cols-7 mb-2">{days}</div>;
    };

    const renderCells = () => {
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
        const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

        const rows = [];
        let days = [];
        let day = startDate;
        let formattedDate = '';

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = format(day, 'd');
                const cloneDay = day;
                const isDisabled = !isSameMonth(day, monthStart) || isBefore(day, startOfDay(new Date()));
                const isSelected = selectedDate && isSameDay(day, selectedDate);

                days.push(
                    <div
                        key={day.toString()}
                        className={`relative h-10 w-10 mx-auto flex items-center justify-center rounded-full cursor-pointer transition-all duration-200 
              ${isDisabled ? 'text-gray-700 cursor-not-allowed' : 'text-white hover:bg-white/10'}
              ${isSelected ? 'bg-primary-400 text-black font-bold shadow-gold-sm' : ''}
            `}
                        onClick={() => !isDisabled && handleDateClick(cloneDay)}
                    >
                        <span>{formattedDate}</span>
                    </div>
                );
                day = addDays(day, 1);
            }
            rows.push(
                <div key={day.toString()} className="grid grid-cols-7 gap-y-2">
                    {days}
                </div>
            );
            days = [];
        }
        return <div>{rows}</div>;
    };

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => {
                resetForm();
                onClose();
            }}
        >
            <div 
                className="bg-[#0a0a0a] border border-white/10 rounded-3xl w-full max-w-md overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] relative"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={() => {
                        resetForm();
                        onClose();
                    }}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="p-8">
                    <h2 className="text-2xl font-serif font-bold text-white mb-2">Rezervace termínu</h2>
                    <p className="text-primary-400 mb-6">{serviceName}</p>

                    {step === 'date' && (
                        <div className="animate-fadeIn">
                            {renderHeader()}
                            {renderDays()}
                            {renderCells()}
                        </div>
                    )}

                    {step === 'time' && (
                        <div className="animate-fadeIn">
                            <button onClick={() => setStep('date')} className="mb-4 text-sm text-gray-400 hover:text-white flex items-center">
                                ← Zpět na kalendář
                            </button>
                            <h3 className="text-white font-medium mb-4">Vyberte čas pro {selectedDate && format(selectedDate, 'd. MMMM', { locale: cs })}</h3>

                            {loading ? (
                                <div className="flex justify-center py-8">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-400"></div>
                                </div>
                            ) : (
                                <div className="grid grid-cols-3 gap-3">
                                    {availableSlots.map((time) => (
                                        <button
                                            key={time}
                                            onClick={() => handleTimeSelect(time)}
                                            className="py-2 px-4 rounded-xl border border-white/10 text-white hover:bg-primary-400 hover:text-black hover:border-primary-400 transition-all duration-300"
                                        >
                                            {time}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {step === 'form' && (
                        <form onSubmit={handleSubmit} className="space-y-4 animate-fadeIn">
                            <button type="button" onClick={() => setStep('time')} className="mb-2 text-sm text-gray-400 hover:text-white flex items-center">
                                ← Zpět na výběr času
                            </button>

                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Jméno a příjmení</label>
                                <input
                                    type="text"
                                    required
                                    value={clientName}
                                    onChange={(e) => setClientName(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-primary-400 focus:outline-none transition-colors"
                                    placeholder="Vaše jméno"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Telefon</label>
                                <input
                                    type="tel"
                                    required
                                    value={clientPhone}
                                    onChange={(e) => setClientPhone(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-primary-400 focus:outline-none transition-colors"
                                    placeholder="+420 000 000 000"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Email</label>
                                <input
                                    type="email"
                                    required
                                    value={clientEmail}
                                    onChange={(e) => setClientEmail(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-primary-400 focus:outline-none transition-colors"
                                    placeholder="vas@email.cz"
                                />
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-primary-400 text-black font-bold py-3 rounded-xl hover:bg-primary-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Odesílám...' : 'Potvrdit rezervaci'}
                                </button>
                            </div>
                        </form>
                    )}

                    {step === 'success' && (
                        <div className="text-center py-8 animate-fadeIn">
                            <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-white mb-2">Rezervace potvrzena!</h3>
                            <p className="text-gray-400 mb-6">Master received your reservation and will contact you soon.</p>
                            <button
                                onClick={() => {
                                    resetForm();
                                    onClose();
                                }}
                                className="bg-white/10 text-white px-6 py-2 rounded-xl hover:bg-white/20 transition-colors"
                            >
                                Zavřít
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookingModal;
