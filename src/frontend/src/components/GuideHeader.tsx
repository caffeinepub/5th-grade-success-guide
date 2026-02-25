import React from 'react';

export default function GuideHeader() {
    return (
        <header className="relative overflow-hidden">
            {/* Hero banner image as background */}
            <div className="relative w-full h-56 sm:h-64 md:h-72">
                <img
                    src="/assets/generated/guide-hero-banner.dim_1200x300.png"
                    alt="5th Grade Success Guide Banner"
                    className="w-full h-full object-cover"
                />
                {/* Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent" />

                {/* Header content */}
                <div className="absolute inset-0 flex flex-col items-start justify-center px-6 sm:px-10 md:px-16 max-w-4xl">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="text-3xl sm:text-4xl animate-bounce-gentle">🌟</span>
                        <span className="text-3xl sm:text-4xl animate-bounce-gentle" style={{ animationDelay: '0.3s' }}>📚</span>
                        <span className="text-3xl sm:text-4xl animate-bounce-gentle" style={{ animationDelay: '0.6s' }}>✏️</span>
                    </div>
                    <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white leading-tight drop-shadow-lg">
                        5th Grade Success!
                    </h1>
                    <p className="font-body text-sm sm:text-base md:text-lg text-white/90 mt-2 font-semibold drop-shadow-md">
                        Tips & Tricks to Improve Your Grades 🎉
                    </p>
                    <p className="font-body text-xs sm:text-sm text-white/80 mt-1 drop-shadow">
                        Your guide to doing your best in school!
                    </p>
                </div>
            </div>
        </header>
    );
}
