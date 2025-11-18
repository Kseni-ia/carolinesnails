import React from 'react';

const About: React.FC = () => {
    return (
        <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-black relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Text Content */}
                    <div className="space-y-8 relative z-10">
                        <div className="w-20 h-1 bg-primary-400 rounded-full" />
                        <h2 className="text-4xl sm:text-5xl font-bold text-white font-serif leading-tight">
                            O mně & <br />
                            <span className="text-primary-400">Moje Vášeň</span>
                        </h2>
                        <div className="space-y-6 text-lg text-gray-400 font-light leading-relaxed">
                            <p>
                                Vítejte v mém světě nehtového designu. Jmenuji se Caroline a nehty nejsou jen mou prací, ale mou největší vášní. Specializuji se na detailní nail art, precizní manikúru a zdraví vašich nehtů.
                            </p>
                            <p>
                                S více než 5 lety zkušeností a neustálým vzděláváním v nejnovějších trendech vám přináším služby, které kombinují luxus, relaxaci a dokonalý výsledek. Každá návštěva je pro mě příležitostí vytvořit něco jedinečného, co podtrhne vaši osobnost.
                            </p>
                            <p>
                                Používám pouze prémiové, certifikované materiály, které jsou šetrné k vašim nehtům a zaručují dlouhotrvající efekt.
                            </p>
                        </div>

                        <div className="pt-8 grid grid-cols-2 gap-8">
                            <div>
                                <h4 className="text-3xl font-bold text-white font-serif mb-2">5+</h4>
                                <p className="text-primary-400 text-sm uppercase tracking-widest">Let Zkušeností</p>
                            </div>
                            <div>
                                <h4 className="text-3xl font-bold text-white font-serif mb-2">1000+</h4>
                                <p className="text-primary-400 text-sm uppercase tracking-widest">Spokojených Klientek</p>
                            </div>
                        </div>
                    </div>

                    {/* Image/Visual Side */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary-400/20 to-transparent rounded-2xl transform rotate-3 scale-105" />
                        <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-[4/5]">
                            <img
                                src="/nails1.jpg"
                                alt="Caroline working on nails"
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                            {/* Floating Badge */}
                            <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl">
                                <p className="text-white font-serif italic text-center">
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
