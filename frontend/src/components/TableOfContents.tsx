import React, { useState, useEffect } from 'react';

const sections = [
    { id: 'getting-organized', label: 'Getting Organized', emoji: '📋' },
    { id: 'better-study-habits', label: 'Better Study Habits', emoji: '📖' },
    { id: 'improving-reading', label: 'Improving Reading Skills', emoji: '🔍' },
    { id: 'getting-better-at-math', label: 'Getting Better at Math', emoji: '🔢' },
    { id: 'listening-participating', label: 'Listening & Participating', emoji: '🙋' },
    { id: 'test-taking-strategies', label: 'Test-Taking Strategies', emoji: '📝' },
    { id: 'healthy-habits', label: 'Healthy Habits', emoji: '🍎' },
    { id: 'setting-goals', label: 'Setting Goals & Motivation', emoji: '🏆' },
    { id: 'grade-checker', label: 'Grade Checker', emoji: '📊' },
];

export default function TableOfContents() {
    const [activeSection, setActiveSection] = useState<string>('');
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
        );

        sections.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const handleClick = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        setIsOpen(false);
    };

    return (
        <nav className="sticky top-0 z-40 bg-card/95 backdrop-blur-sm border-b border-border shadow-xs">
            <div className="max-w-5xl mx-auto px-4 py-3">
                {/* Mobile toggle */}
                <button
                    className="md:hidden flex items-center gap-2 font-body font-bold text-foreground text-sm w-full"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-expanded={isOpen}
                    aria-label="Toggle table of contents"
                >
                    <span className="text-lg">📚</span>
                    <span>Jump to a Section</span>
                    <span className="ml-auto text-muted-foreground">{isOpen ? '▲' : '▼'}</span>
                </button>

                {/* Desktop nav */}
                <div className="hidden md:flex items-center gap-1 flex-wrap">
                    <span className="font-display text-sm text-muted-foreground mr-2 shrink-0">Jump to:</span>
                    {sections.map((section) => (
                        <button
                            key={section.id}
                            onClick={() => handleClick(section.id)}
                            className={`
                                flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-body font-700 transition-all duration-200
                                ${activeSection === section.id
                                    ? 'bg-primary text-primary-foreground shadow-fun scale-105'
                                    : 'bg-secondary text-secondary-foreground hover:bg-primary/20 hover:scale-105'
                                }
                            `}
                        >
                            <span>{section.emoji}</span>
                            <span className="font-semibold">{section.label}</span>
                        </button>
                    ))}
                </div>

                {/* Mobile dropdown */}
                {isOpen && (
                    <div className="md:hidden mt-3 grid grid-cols-2 gap-2">
                        {sections.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => handleClick(section.id)}
                                className={`
                                    flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-body font-semibold text-left transition-all duration-200
                                    ${activeSection === section.id
                                        ? 'bg-primary text-primary-foreground shadow-fun'
                                        : 'bg-secondary text-secondary-foreground hover:bg-primary/20'
                                    }
                                `}
                            >
                                <span className="text-base">{section.emoji}</span>
                                <span>{section.label}</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </nav>
    );
}
