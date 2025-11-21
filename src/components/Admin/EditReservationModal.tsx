import React, { useState, useEffect } from 'react';
import { parseISO, setHours, setMinutes } from 'date-fns';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';

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

interface EditReservationModalProps {
    isOpen: boolean;
    onClose: () => void;
    reservation: Reservation | null;
    onSave: (updatedReservation: Reservation) => void;
}

const EditReservationModal: React.FC<EditReservationModalProps> = ({ 
    isOpen, 
    onClose, 
    reservation, 
    onSave 
}) => {
    const [loading, setLoading] = useState(false);
    const [editedReservation, setEditedReservation] = useState<Reservation | null>(null);

    useEffect(() => {
        if (reservation) {
            setEditedReservation({ ...reservation });
        }
    }, [reservation]);

    const handleInputChange = (field: keyof Reservation, value: string) => {
        if (editedReservation) {
            setEditedReservation({ ...editedReservation, [field]: value });
        }
    };

    const handleTimeChange = (newTime: string) => {
        if (editedReservation) {
            const [hours, minutes] = newTime.split(':').map(Number);
            const originalDate = parseISO(editedReservation.selectedDate);
            const newStartDateTime = setHours(setMinutes(originalDate, minutes), hours);
            const newEndDateTime = new Date(newStartDateTime.getTime() + 240 * 60 * 1000); // Add 4 hours

            setEditedReservation({
                ...editedReservation,
                selectedTime: newTime,
                serviceStartDateTime: newStartDateTime.toISOString(),
                serviceEndDateTime: newEndDateTime.toISOString()
            });
        }
    };

    const handleDateChange = (newDate: string) => {
        if (editedReservation) {
            const [hours, minutes] = editedReservation.selectedTime.split(':').map(Number);
            const parsedDate = parseISO(newDate);
            const newStartDateTime = setHours(setMinutes(parsedDate, minutes), hours);
            const newEndDateTime = new Date(newStartDateTime.getTime() + 240 * 60 * 1000); // Add 4 hours

            setEditedReservation({
                ...editedReservation,
                selectedDate: newDate,
                serviceStartDateTime: newStartDateTime.toISOString(),
                serviceEndDateTime: newEndDateTime.toISOString()
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editedReservation) return;

        setLoading(true);
        try {
            const reservationRef = doc(db, 'reservations', editedReservation.id);
            const updateData = {
                clientPhone: editedReservation.clientPhone,
                selectedTime: editedReservation.selectedTime,
                selectedDate: editedReservation.selectedDate,
                serviceStartDateTime: editedReservation.serviceStartDateTime,
                serviceEndDateTime: editedReservation.serviceEndDateTime,
                adminService: editedReservation.adminService || '',
                adminNotes: editedReservation.adminNotes || ''
            };

            await updateDoc(reservationRef, updateData);
            onSave(editedReservation);
            onClose();
        } catch (error) {
            console.error('Error updating reservation:', error);
            alert('Nepodařilo se uložit změny. Zkuste to prosím znovu.');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen || !editedReservation) return null;

    return (
        <div 
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
        >
            <div 
                className="bg-[#0a0a0a] border border-white/10 rounded-3xl w-full max-w-lg overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] relative max-h-[85vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10 p-2"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="p-6 overflow-y-auto flex-1">
                    <h2 className="text-xl font-serif font-bold text-white mb-1">Upravit rezervaci</h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                        {/* Client Info Header - Compact */}
                        <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                            <div className="flex items-center space-x-3 mb-2">
                                <div className="w-8 h-8 rounded-full bg-primary-400/20 flex items-center justify-center text-primary-400 font-serif font-bold">
                                    {editedReservation.clientName.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="text-white font-medium text-sm">{editedReservation.clientName}</h3>
                                    <p className="text-gray-400 text-xs">{editedReservation.clientEmail}</p>
                                </div>
                            </div>
                            
                            {/* Phone Input - Integrated into header card */}
                            <div>
                                <input
                                    type="tel"
                                    value={editedReservation.clientPhone}
                                    onChange={(e) => handleInputChange('clientPhone', e.target.value)}
                                    className="w-full bg-black/20 border border-white/10 rounded-lg p-2 text-sm text-white focus:border-primary-400 focus:outline-none transition-colors"
                                    placeholder="Telefon"
                                    required
                                />
                            </div>
                        </div>

                        {/* Date & Time - Grid Layout */}
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs text-gray-400 mb-1">Datum</label>
                                <input
                                    type="date"
                                    value={editedReservation.selectedDate}
                                    onChange={(e) => handleDateChange(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-2.5 text-sm text-white focus:border-primary-400 focus:outline-none transition-colors"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs text-gray-400 mb-1">Čas</label>
                                <input
                                    type="time"
                                    value={editedReservation.selectedTime}
                                    onChange={(e) => handleTimeChange(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-2.5 text-sm text-white focus:border-primary-400 focus:outline-none transition-colors"
                                    required
                                />
                            </div>
                        </div>

                        {/* Admin-only Fields */}
                        <div className="border-t border-white/10 pt-3">
                            <h3 className="text-xs font-medium text-primary-400 mb-3 uppercase tracking-wider">Administrace</h3>
                            
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-xs text-gray-400 mb-1">Služba</label>
                                    <textarea
                                        value={editedReservation.adminService || ''}
                                        onChange={(e) => handleInputChange('adminService', e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white focus:border-primary-400 focus:outline-none transition-colors resize-none"
                                        placeholder="Popis služby..."
                                        rows={2}
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs text-gray-400 mb-1">Poznámky</label>
                                    <textarea
                                        value={editedReservation.adminNotes || ''}
                                        onChange={(e) => handleInputChange('adminNotes', e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white focus:border-primary-400 focus:outline-none transition-colors resize-none"
                                        placeholder="Interní poznámky..."
                                        rows={2}
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Footer Actions - Sticky */}
                <div className="p-4 border-t border-white/10 bg-[#0a0a0a] flex space-x-3 z-20">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 bg-white/5 text-white py-3 rounded-xl hover:bg-white/10 transition-colors text-sm font-medium"
                    >
                        Zrušit
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="flex-1 bg-primary-400 text-black font-bold py-3 rounded-xl hover:bg-primary-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                    >
                        {loading ? 'Ukládám...' : 'Uložit změny'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditReservationModal;
