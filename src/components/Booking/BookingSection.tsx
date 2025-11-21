import React, { useState } from 'react';
import BookingModal from './BookingModal';

const BookingSection: React.FC = () => {
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    return (
        <section id="book" className="py-20 bg-black relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-400/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-400/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 md:p-12 text-center">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
                        Připraveni na nové nehty?
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
                        Rezervujte si svůj termín online jednoduše a rychle. Vyberte si službu, datum a čas, který vám vyhovuje.
                    </p>

                    <button
                        onClick={() => setIsBookingOpen(true)}
                        className="btn-primary text-lg px-8 py-3 shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transform hover:-translate-y-1 transition-all duration-300"
                    >
                        Rezervovat termín
                    </button>
                </div>
            </div>

            <BookingModal
                isOpen={isBookingOpen}
                onClose={() => setIsBookingOpen(false)}
            />
        </section>
    );
};

export default BookingSection;
