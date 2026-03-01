import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function FamousUniversities() {
    const [universities, setUniversities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUniversities = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/universities');
                setUniversities(res.data);
            } catch (error) {
                console.error('Error fetching universities:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchUniversities();
    }, []);

    if (universities.length === 0) return null;
    return (
        <section className="py-24 bg-white overflow-hidden relative border-y border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <div className="text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                    >
                        Study at <span className="text-blue-600">World-Class</span> Universities
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-gray-600 max-w-2xl mx-auto"
                    >
                        Our students have successfully secured admissions in top-tier institutions globally.
                    </motion.p>
                </div>
            </div>

            {/* Marquee Animation Container */}
            <div className="relative w-full flex align-center mt-10">
                <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10 hidden md:block"></div>
                <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10 hidden md:block"></div>

                <div className="flex animate-marquee whitespace-nowrap space-x-12 md:space-x-24 px-12 md:px-24 items-center">
                    {/* First set of logos */}
                    {universities.map((uni, index) => (
                        <div key={index} className="flex flex-col items-center justify-center min-w-[150px] group grayscale hover:grayscale-0 transition-all duration-300">
                            <div className="h-24 w-24 relative flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform duration-300">
                                <img
                                    src={uni.logoUrl}
                                    alt={`${uni.name} Logo`}
                                    className="max-h-full max-w-full object-contain drop-shadow-sm"
                                    loading="lazy"
                                />
                            </div>
                            <span className="text-sm font-medium text-gray-500 group-hover:text-blue-600 transition-colors opacity-0 group-hover:opacity-100 absolute -bottom-2">
                                {uni.name}
                            </span>
                        </div>
                    ))}
                    {/* Duplicated set for seamless loop */}
                    {universities.map((uni, index) => (
                        <div key={`dup-${index}`} className="flex flex-col items-center justify-center min-w-[150px] group grayscale hover:grayscale-0 transition-all duration-300">
                            <div className="h-24 w-24 relative flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform duration-300">
                                <img
                                    src={uni.logoUrl}
                                    alt={`${uni.name} Logo`}
                                    className="max-h-full max-w-full object-contain drop-shadow-sm"
                                    loading="lazy"
                                />
                            </div>
                            <span className="text-sm font-medium text-gray-500 group-hover:text-blue-600 transition-colors opacity-0 group-hover:opacity-100 absolute -bottom-2">
                                {uni.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}} />
        </section>
    );
}
