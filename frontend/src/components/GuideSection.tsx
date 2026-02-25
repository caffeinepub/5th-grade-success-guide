import React from 'react';

interface GuideSectionProps {
    id: string;
    number: number;
    emoji: string;
    title: string;
    intro?: string;
    bullets: (string | { bold: string; rest: string })[];
    colorClass: string;
    borderColorClass: string;
    numberColorClass: string;
}

export default function GuideSection({
    id,
    number,
    emoji,
    title,
    intro,
    bullets,
    colorClass,
    borderColorClass,
    numberColorClass,
}: GuideSectionProps) {
    return (
        <section
            id={id}
            className={`rounded-3xl p-6 sm:p-8 shadow-card border-2 ${colorClass} ${borderColorClass} scroll-mt-20 transition-shadow duration-300 hover:shadow-card-hover`}
        >
            <div className="flex items-start gap-4 mb-5">
                {/* Section number badge */}
                <div className={`shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center font-display text-lg font-bold text-white shadow-fun ${numberColorClass}`}>
                    {number}
                </div>
                {/* Title with emoji */}
                <div className="flex-1">
                    <h2 className="font-display text-2xl sm:text-3xl text-foreground leading-tight flex items-center gap-2 flex-wrap">
                        <span className="text-2xl sm:text-3xl">{emoji}</span>
                        {title}
                    </h2>
                    {intro && (
                        <p className="font-body text-sm sm:text-base text-muted-foreground mt-1 font-medium">
                            {intro}
                        </p>
                    )}
                </div>
            </div>

            <ul className="space-y-3">
                {bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                        <span className="shrink-0 mt-0.5 text-lg">⭐</span>
                        <span className="font-body text-sm sm:text-base text-foreground leading-relaxed">
                            {typeof bullet === 'string' ? (
                                bullet
                            ) : (
                                <>
                                    <strong className="font-bold">{bullet.bold}</strong>
                                    {bullet.rest}
                                </>
                            )}
                        </span>
                    </li>
                ))}
            </ul>
        </section>
    );
}
