import React, { useState, useEffect } from 'react';
import { format, addDays, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isSameDay, addMonths, subMonths, parseISO } from 'date-fns';
import { cs } from 'date-fns/locale';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import EditReservationModal from './EditReservationModal';

interface Reservation {
    id: string;
    clientName: string;
    clientPhone: string;
    clientEmail: string;
    serviceName: string;
    serviceStartDateTime: string;
    serviceEndDateTime: string;
    selectedTime: string;
    selectedDate: string;
    createdAt: string;
    status: string;
    adminService?: string;
    adminNotes?: string;
}

const ReservationCalendar: React.FC = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);

    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = async () => {
        try {
            const q = query(collection(db, 'reservations'), orderBy('createdAt', 'desc'));
            const querySnapshot = await getDocs(q);
            const reservationsData: Reservation[] = [];
            querySnapshot.forEach((doc) => {
                reservationsData.push({ id: doc.id, ...doc.data() } as Reservation);
            });
            setReservations(reservationsData);
        } catch (error) {
            console.error('Error fetching reservations:', error);
        } finally {
            setLoading(false);
        }
    };

    const getReservationsForDate = (date: Date) => {
        return reservations.filter(reservation => {
            const reservationDate = parseISO(reservation.selectedDate);
            return isSameDay(reservationDate, date);
        });
    };


    const handleEditReservation = (reservation: Reservation) => {
        setSelectedReservation(reservation);
        setIsEditModalOpen(true);
    };

    const handleSaveReservation = (updatedReservation: Reservation) => {
        setReservations(prevReservations => 
            prevReservations.map(r => r.id === updatedReservation.id ? updatedReservation : r)
        );
    };

    const renderReservationCards = () => {
        const sortedReservations = reservations
            .sort((a, b) => new Date(a.serviceStartDateTime).getTime() - new Date(b.serviceStartDateTime).getTime());

        if (sortedReservations.length === 0) {
            return (
                <div className="text-center py-8 text-gray-400">
                    <span className="text-2xl mb-2 block">📅</span>
                    <p>Žádné rezervace</p>
                </div>
            );
        }

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedReservations.map((reservation) => (
                    <div
                        key={reservation.id}
                        className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h4 className="text-white font-medium font-serif text-lg">{reservation.clientName}</h4>
                                <p className="text-primary-400 text-sm">{reservation.serviceName}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full border border-green-500/30">
                                    {reservation.status}
                                </span>
                                <button
                                    onClick={() => handleEditReservation(reservation)}
                                    className="text-gray-400 hover:text-primary-400 transition-colors"
                                    title="Upravit rezervaci"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="text-gray-400 text-sm space-y-2">
                            <div className="flex items-center space-x-2">
                                <span>📅</span>
                                <span>{format(parseISO(reservation.selectedDate), 'd. MMMM yyyy', { locale: cs })}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span>🕐</span>
                                <span>{reservation.selectedTime}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span>📞</span>
                                <span>{reservation.clientPhone}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span>✉️</span>
                                <span className="text-xs">{reservation.clientEmail}</span>
                            </div>
                            {reservation.adminService && (
                                <div className="mt-3 pt-3 border-t border-white/10">
                                    <div className="flex items-start space-x-2">
                                        <span>💅</span>
                                        <span className="text-xs text-primary-300">{reservation.adminService}</span>
                                    </div>
                                </div>
                            )}
                            {reservation.adminNotes && (
                                <div className="flex items-start space-x-2">
                                    <span>📝</span>
                                    <span className="text-xs text-gray-300">{reservation.adminNotes}</span>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-400"></div>
            </div>
        );
    }

    return (
        <>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl">
                <h3 className="text-xl font-semibold mb-6 text-white font-serif">Rezervace</h3>
                {renderReservationCards()}
            </div>
            <EditReservationModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                reservation={selectedReservation}
                onSave={handleSaveReservation}
            />
        </>
    );
};

export default ReservationCalendar;
