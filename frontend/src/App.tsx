import React from 'react';
import GuideHeader from './components/GuideHeader';
import TableOfContents from './components/TableOfContents';
import GuideContent from './components/GuideContent';
import GradeChecker from './components/GradeChecker';

export default function App() {
    const hostname = typeof window !== 'undefined' ? window.location.hostname : 'unknown-app';
    const appId = encodeURIComponent(hostname);

    return (
        <div className="min-h-screen bg-background flex flex-col">
            {/* Hero Header */}
            <GuideHeader />

            {/* Sticky Table of Contents */}
            <TableOfContents />

            {/* Main Guide Content */}
            <GuideContent />

            {/* Grade Checker Tool */}
            <main className="max-w-5xl mx-auto w-full px-4 sm:px-6 pb-10">
                <GradeChecker />
            </main>

            {/* Footer */}
            <footer className="mt-auto border-t border-border bg-card">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm font-body text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <span className="text-lg">📚</span>
                        <span className="font-semibold text-foreground">5th Grade Success Guide</span>
                    </div>
                    <p className="text-center sm:text-right">
                        © {new Date().getFullYear()} &nbsp;·&nbsp; Built with{' '}
                        <span className="text-red-400">❤️</span> using{' '}
                        <a
                            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-primary hover:underline"
                        >
                            caffeine.ai
                        </a>
                    </p>
                </div>
            </footer>
        </div>
    );
}
