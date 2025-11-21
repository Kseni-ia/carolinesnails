import React, { useEffect, useRef, useState } from 'react';

const About: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section
            id="about"
            ref={sectionRef}
            className="py-10 md:py-24 px-4 sm:px-6 lg:px-8 bg-black relative overflow-hidden"
        >
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    {/* Text Content */}
                    <div className={`space-y-6 md:space-y-8 relative z-10 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <div className="w-16 md:w-20 h-1 bg-primary-400 rounded-full" />
                        <h2 className="text-3xl sm:text-5xl font-bold text-white font-serif leading-tight">
                            O mně & <br />
                            <span className="text-primary-400">Moje Vášeň</span>
                        </h2>
                        <div className="space-y-4 md:space-y-6 text-base md:text-lg text-gray-400 font-light leading-relaxed">
                            <p className={`transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                                Vítejte v mém světě nehtového designu. Jmenuji se Karoline a nehty nejsou jen mou prací, ale mou největší vášní. Specializuji se na detailní nail art, precizní manikúru a zdraví vašich nehtů.
                            </p>
                            <p className={`transition-all duration-1000 delay-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                                S více než 5 lety zkušeností a neustálým vzděláváním v nejnovějších trendech vám přináším služby, které kombinují luxus, relaxaci a dokonalý výsledek. Každá návštěva je pro mě příležitostí vytvořit něco jedinečného, co podtrhne vaši osobnost.
                            </p>
                            <p className={`transition-all duration-1000 delay-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                                Používám pouze prémiové, certifikované materiály, které jsou šetrné k vašim nehtům a zaručují dlouhotrvající efekt.
                            </p>
                        </div>

                        <div className={`pt-4 md:pt-8 grid grid-cols-2 gap-8 transition-all duration-1000 delay-900 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                            <div>
                                <h4 className="text-2xl md:text-3xl font-bold text-white font-serif mb-1 md:mb-2">5+</h4>
                                <p className="text-primary-400 text-xs md:text-sm uppercase tracking-widest">Let Zkušeností</p>
                            </div>
                            <div>
                                <h4 className="text-2xl md:text-3xl font-bold text-white font-serif mb-1 md:mb-2">1000+</h4>
                                <p className="text-primary-400 text-xs md:text-sm uppercase tracking-widest">Spokojených Klientek</p>
                            </div>
                        </div>
                    </div>

                    {/* Image/Visual Side */}
                    <div className={`relative transition-all duration-1000 delay-500 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary-400/20 to-transparent rounded-2xl transform rotate-3 scale-105" />
                        <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-[4/5] md:aspect-[4/5]">
                            <img
                                src="/nails1.jpg"
                                alt="Caroline working on nails"
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                            {/* Floating Badge */}
                            <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8 bg-white/10 backdrop-blur-md border border-white/20 p-4 md:p-6 rounded-xl">
                                <p className="text-white font-serif italic text-center text-sm md:text-base">
                                    "Krása začíná v detailu."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
