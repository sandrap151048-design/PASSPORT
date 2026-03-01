import { useState, useEffect } from 'react'
import Image from 'next/image'

const events = [
    {
        id: 1,
        title: "World Passport's Virtual Edu Expo",
        subtitle: "A Mega 5 Days Expo",
        description: "For Higher Studies Abroad",
        date: "10th to 14th Mar 2026",
        details: "Interact Online with 75+ Universities from 12 Countries",
        image: "/images/event-expo.png",
        color: "bg-orange-500",
        linkText: "Begin Your Global Journey"
    },
    {
        id: 2,
        title: "World Passport Global Fair 2026",
        subtitle: "Connect with Top Institutions",
        description: "Direct Interaction with Admissions",
        date: "25th Mar 2026",
        details: "Face-to-face sessions with 50+ Global University Reps",
        image: "/images/event-fair.jpg",
        color: "bg-blue-600",
        linkText: "Secure Your Passport"
    }
]

export default function EventCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0)

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % events.length)
    }

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + events.length) % events.length)
    }

    return (
        <div className="relative w-full max-w-7xl mx-auto px-4 py-12 group">
            <div className="relative overflow-hidden rounded-[2.5rem] bg-white shadow-2xl border border-neutral-100 min-h-[500px] flex flex-col md:flex-row">

                {/* Carousel Content */}
                <div className="flex-1 p-8 md:p-16 flex flex-col justify-center relative z-10">
                    <span className="text-neutral-500 font-bold text-sm tracking-[0.2em] uppercase mb-4 block animate-fade-in-up">
                        {events[currentIndex].subtitle}
                    </span>
                    <h2 className="text-4xl md:text-6xl font-black text-[#1a1045] mb-4 tracking-tight leading-tight uppercase animate-fade-in-up">
                        {events[currentIndex].title}
                    </h2>
                    <p className="text-2xl md:text-3xl font-medium text-orange-500 mb-8 animate-fade-in-up delay-100">
                        {events[currentIndex].description}
                    </p>

                    <div className="bg-[#1a1045] text-white p-6 rounded-2xl flex items-center gap-6 mb-10 w-fit animate-fade-in-up delay-200">
                        <div className="bg-orange-500 p-3 rounded-xl">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-2xl font-bold uppercase tracking-tight">{events[currentIndex].date}</p>
                        </div>
                    </div>

                    <p className="text-lg text-neutral-600 font-medium mb-12 max-w-lg leading-relaxed normal-case animate-fade-in-up delay-300">
                        {events[currentIndex].details}
                    </p>

                    <button className="w-fit px-12 py-5 bg-red-600 text-white font-black text-xl rounded-full shadow-xl shadow-red-200 hover:bg-red-700 hover:-translate-y-1 transition-all flex items-center gap-4 animate-fade-in-up delay-400 group/btn">
                        {events[currentIndex].linkText}
                        <svg className="w-6 h-6 group-hover/btn:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </button>
                </div>

                {/* Carousel Image */}
                <div className="flex-1 relative min-h-[400px] md:min-h-full">
                    <Image
                        src={events[currentIndex].image}
                        alt={events[currentIndex].title}
                        fill
                        className="object-cover animate-scale-up"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent hidden md:block" />

                    {/* Decorative Elements from Screenshot */}
                    <div className="absolute top-10 right-10 flex flex-col items-center gap-2 scale-125">
                        <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center border-4 border-white shadow-lg rotate-12">
                            <span className="text-white font-black text-[10px] text-center uppercase leading-none px-2">Up to 100% Scholarships*</span>
                        </div>
                    </div>
                </div>

                {/* Navigation Arrows */}
                <button
                    onClick={prevSlide}
                    className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center text-[#1a1045] hover:bg-[#1a1045] hover:text-white transition-all z-20"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center text-[#1a1045] hover:bg-[#1a1045] hover:text-white transition-all z-20"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
                    </svg>
                </button>

                {/* Indicators */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                    {events.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentIndex(i)}
                            className={`w-3 h-3 rounded-full transition-all ${currentIndex === i ? 'w-10 bg-orange-500' : 'bg-neutral-300 hover:bg-neutral-400'}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
