import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type GradeLevel = 'high' | 'passing' | 'low';
type Subject = 'Math' | 'Reading' | 'Science' | 'Social Studies' | 'Writing' | 'Spelling' | 'Other';

interface ResultData {
    grade: string;
    subject: Subject;
    topic: string;
    level: GradeLevel;
    tips: string[];
    message: string;
    messageEmoji: string;
}

function parseGradeLevel(grade: string): GradeLevel {
    const trimmed = grade.trim().toUpperCase();

    // Letter grade check
    if (trimmed === 'A' || trimmed === 'A+' || trimmed === 'A-' || trimmed === 'B' || trimmed === 'B+' || trimmed === 'B-') {
        return 'high';
    }
    if (trimmed === 'C' || trimmed === 'C+' || trimmed === 'C-') {
        return 'passing';
    }
    if (trimmed === 'D' || trimmed === 'D+' || trimmed === 'D-' || trimmed === 'F') {
        return 'low';
    }

    // Percentage check
    const num = parseFloat(trimmed.replace('%', ''));
    if (!isNaN(num)) {
        if (num >= 85) return 'high';
        if (num >= 70) return 'passing';
        return 'low';
    }

    // Default to passing if unrecognized
    return 'passing';
}

const subjectTips: Record<Subject, string[]> = {
    Math: [
        '🔢 Practice your multiplication tables every day — even just 5 minutes helps a lot!',
        '📝 Always show your work step by step so you can find where mistakes happen.',
        '🔁 Redo problems you got wrong until you understand why the right answer works.',
        '📐 Use graph paper or draw pictures to help visualize word problems.',
        '🎮 Try fun math games online like Prodigy or Khan Academy to make practice exciting!',
        '🤔 When stuck, try working backwards from the answer to understand the problem.',
    ],
    Reading: [
        '📖 Read for at least 20 minutes every day — even comic books count!',
        '🗒️ After each chapter, write 2–3 sentences about what happened in your own words.',
        '🔍 When you find a word you don\'t know, look it up and write it in a vocabulary journal.',
        '💬 Talk about what you\'re reading with a parent or friend — it helps you understand better.',
        '🔄 Re-read tricky paragraphs slowly and ask yourself: "Who? What? Where? Why?"',
        '📚 Choose books about topics you love — reading is easier when you\'re interested!',
    ],
    Science: [
        '🔬 Try to connect science topics to things you see in real life every day.',
        '📓 Keep a science journal and draw diagrams to help remember key concepts.',
        '🎥 Watch short science videos on YouTube Kids to see experiments in action.',
        '🗂️ Make flashcards for science vocabulary words and quiz yourself.',
        '🧪 Ask your teacher if you can do extra hands-on experiments or projects.',
        '🌍 Explore science apps or websites like NASA Kids\' Club for fun learning.',
    ],
    'Social Studies': [
        '🗺️ Use maps, timelines, and charts to organize information visually.',
        '📰 Connect what you\'re learning to current events or things happening in your community.',
        '🎭 Try acting out historical events or making a mini-documentary to remember them.',
        '🗒️ Create a timeline of important dates and events on a big piece of paper.',
        '💡 Ask "Why did this happen?" and "How does it affect us today?" for every topic.',
        '🌐 Explore kid-friendly history websites like DKfindout! or National Geographic Kids.',
    ],
    Writing: [
        '✏️ Write in a journal every day — even just a few sentences about your day.',
        '📋 Always plan your writing with a quick outline before you start.',
        '🔄 Read your writing out loud to catch mistakes and awkward sentences.',
        '💬 Ask a trusted adult or friend to read your work and give you feedback.',
        '📚 Read great books to see how good writers use words and sentences.',
        '🌟 Focus on one thing to improve at a time — like adding more details or better transitions.',
    ],
    Spelling: [
        '🔤 Practice your spelling words by writing each one three times.',
        '🎵 Make up a silly song or rhyme to remember tricky words.',
        '🃏 Use flashcards — write the word on one side and a picture or sentence on the other.',
        '📱 Ask someone to quiz you on your spelling words every night before the test.',
        '✍️ Use each spelling word in a sentence to help it stick in your memory.',
        '🔍 Look for smaller words hiding inside bigger words to help you remember them.',
    ],
    Other: [
        '📅 Break big assignments into smaller steps and work on one step each day.',
        '🤝 Ask your teacher for extra help or find a study buddy in your class.',
        '📓 Review your notes within 24 hours of class — it helps your brain remember!',
        '🎯 Set a small goal for each study session so you know what you want to accomplish.',
        '🏆 Celebrate small wins — every improvement counts, no matter how small!',
        '💤 Make sure you get enough sleep — a rested brain learns so much better.',
    ],
};

function getTips(subject: Subject, level: GradeLevel): string[] {
    const allTips = subjectTips[subject] || subjectTips['Other'];
    // Return 5 tips; for low grades, include the last "general" tip too
    if (level === 'low') return allTips.slice(0, 5);
    if (level === 'passing') return allTips.slice(0, 5);
    return allTips.slice(0, 4);
}

function getEncouragement(level: GradeLevel): { message: string; messageEmoji: string } {
    if (level === 'low') {
        return {
            message: "Don't give up — here's how you can improve! 💪",
            messageEmoji: '😤',
        };
    }
    if (level === 'passing') {
        return {
            message: "Good job! Here's how to go from good to GREAT! 🚀",
            messageEmoji: '😊',
        };
    }
    return {
        message: "Amazing work! Keep shining and stay on top! 🌟",
        messageEmoji: '🥳',
    };
}

const levelColors: Record<GradeLevel, string> = {
    low: 'bg-section-7 border-orange-300',
    passing: 'bg-section-3 border-green-300',
    high: 'bg-section-1 border-yellow-300',
};

const levelBadgeColors: Record<GradeLevel, string> = {
    low: 'bg-orange-400 text-white',
    passing: 'bg-green-500 text-white',
    high: 'bg-yellow-400 text-foreground',
};

export default function GradeChecker() {
    const [grade, setGrade] = useState('');
    const [subject, setSubject] = useState<Subject | ''>('');
    const [topic, setTopic] = useState('');
    const [result, setResult] = useState<ResultData | null>(null);
    const [errors, setErrors] = useState<{ grade?: string; subject?: string; topic?: string }>({});

    const validate = () => {
        const newErrors: { grade?: string; subject?: string; topic?: string } = {};
        if (!grade.trim()) newErrors.grade = 'Please enter your last grade.';
        if (!subject) newErrors.subject = 'Please select a subject.';
        if (!topic.trim()) newErrors.topic = 'Please describe the topic or what was hard.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        if (!subject) return;

        const level = parseGradeLevel(grade);
        const tips = getTips(subject as Subject, level);
        const { message, messageEmoji } = getEncouragement(level);

        setResult({
            grade: grade.trim(),
            subject: subject as Subject,
            topic: topic.trim(),
            level,
            tips,
            message,
            messageEmoji,
        });

        // Scroll to result after a short delay
        setTimeout(() => {
            document.getElementById('grade-checker-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    };

    const handleReset = () => {
        setGrade('');
        setSubject('');
        setTopic('');
        setResult(null);
        setErrors({});
    };

    return (
        <section id="grade-checker" className="scroll-mt-20">
            {/* Section Header */}
            <div className="rounded-3xl p-6 sm:p-8 shadow-card border-2 bg-section-2 border-blue-200 transition-shadow duration-300 hover:shadow-card-hover">
                <div className="flex items-start gap-4 mb-6">
                    <div className="shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center font-display text-lg font-bold text-white shadow-fun bg-blue-500">
                        9
                    </div>
                    <div className="flex-1">
                        <h2 className="font-display text-2xl sm:text-3xl text-foreground leading-tight flex items-center gap-2 flex-wrap">
                            <span className="text-2xl sm:text-3xl">📝</span>
                            Grade Checker
                        </h2>
                        <p className="font-body text-sm sm:text-base text-muted-foreground mt-1 font-medium">
                            Enter your last grade, subject, and what topic was tricky — and we'll give you personalized tips to improve! 🎯
                        </p>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {/* Last Grade */}
                        <div className="space-y-2">
                            <Label htmlFor="grade-input" className="font-body font-bold text-foreground text-sm flex items-center gap-1">
                                <span>🎓</span> Your Last Grade
                            </Label>
                            <Input
                                id="grade-input"
                                type="text"
                                placeholder="e.g. B, C+, 78%, D"
                                value={grade}
                                onChange={(e) => { setGrade(e.target.value); setErrors((prev) => ({ ...prev, grade: undefined })); }}
                                className={`font-body rounded-xl border-2 ${errors.grade ? 'border-destructive' : 'border-border'} bg-background`}
                            />
                            {errors.grade && <p className="text-xs text-destructive font-body">{errors.grade}</p>}
                        </div>

                        {/* Subject */}
                        <div className="space-y-2">
                            <Label htmlFor="subject-select" className="font-body font-bold text-foreground text-sm flex items-center gap-1">
                                <span>📚</span> Subject
                            </Label>
                            <Select
                                value={subject}
                                onValueChange={(val) => { setSubject(val as Subject); setErrors((prev) => ({ ...prev, subject: undefined })); }}
                            >
                                <SelectTrigger
                                    id="subject-select"
                                    className={`font-body rounded-xl border-2 ${errors.subject ? 'border-destructive' : 'border-border'} bg-background`}
                                >
                                    <SelectValue placeholder="Pick a subject…" />
                                </SelectTrigger>
                                <SelectContent className="font-body rounded-xl">
                                    <SelectItem value="Math">🔢 Math</SelectItem>
                                    <SelectItem value="Reading">📖 Reading</SelectItem>
                                    <SelectItem value="Science">🔬 Science</SelectItem>
                                    <SelectItem value="Social Studies">🗺️ Social Studies</SelectItem>
                                    <SelectItem value="Writing">✏️ Writing</SelectItem>
                                    <SelectItem value="Spelling">🔤 Spelling</SelectItem>
                                    <SelectItem value="Other">📌 Other</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.subject && <p className="text-xs text-destructive font-body">{errors.subject}</p>}
                        </div>
                    </div>

                    {/* Topic */}
                    <div className="space-y-2">
                        <Label htmlFor="topic-input" className="font-body font-bold text-foreground text-sm flex items-center gap-1">
                            <span>🤔</span> What Topic Was Hard?
                        </Label>
                        <Textarea
                            id="topic-input"
                            placeholder="e.g. I had trouble with fractions and word problems…"
                            value={topic}
                            onChange={(e) => { setTopic(e.target.value); setErrors((prev) => ({ ...prev, topic: undefined })); }}
                            className={`font-body rounded-xl border-2 resize-none ${errors.topic ? 'border-destructive' : 'border-border'} bg-background min-h-[90px]`}
                        />
                        {errors.topic && <p className="text-xs text-destructive font-body">{errors.topic}</p>}
                    </div>

                    {/* Submit */}
                    <div className="flex gap-3 flex-wrap">
                        <Button
                            type="submit"
                            className="font-display rounded-2xl px-6 py-2.5 text-base shadow-fun bg-primary text-primary-foreground hover:scale-105 transition-transform duration-200"
                        >
                            🔍 Check My Grade!
                        </Button>
                        {result && (
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleReset}
                                className="font-body rounded-2xl px-5 py-2.5 text-sm border-2"
                            >
                                🔄 Start Over
                            </Button>
                        )}
                    </div>
                </form>
            </div>

            {/* Results Card */}
            {result && (
                <div
                    id="grade-checker-result"
                    className={`mt-5 rounded-3xl p-6 sm:p-8 shadow-card border-2 ${levelColors[result.level]} scroll-mt-20 transition-all duration-500`}
                >
                    {/* Result Header */}
                    <div className="flex items-center gap-3 mb-5 flex-wrap">
                        <span className="text-4xl">{result.messageEmoji}</span>
                        <div>
                            <p className="font-display text-xl sm:text-2xl text-foreground">{result.message}</p>
                            <div className="flex items-center gap-2 mt-1 flex-wrap">
                                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-body font-bold shadow-fun ${levelBadgeColors[result.level]}`}>
                                    🎓 Grade: {result.grade}
                                </span>
                                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-body font-bold bg-primary/20 text-foreground">
                                    📚 {result.subject}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Topic recap */}
                    <div className="mb-5 bg-background/60 rounded-2xl px-4 py-3 border border-border">
                        <p className="font-body text-sm text-muted-foreground font-semibold mb-0.5">📌 Topic you found tricky:</p>
                        <p className="font-body text-sm sm:text-base text-foreground italic">"{result.topic}"</p>
                    </div>

                    {/* Tips */}
                    <div>
                        <h3 className="font-display text-lg sm:text-xl text-foreground mb-3 flex items-center gap-2">
                            💡 Here's How to Improve:
                        </h3>
                        <ul className="space-y-3">
                            {result.tips.map((tip, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                    <span className="shrink-0 mt-0.5 text-lg">⭐</span>
                                    <span className="font-body text-sm sm:text-base text-foreground leading-relaxed">{tip}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Closing cheer */}
                    <div className="mt-6 text-center bg-background/50 rounded-2xl py-3 px-4 border border-border">
                        <p className="font-display text-base sm:text-lg text-foreground">
                            {result.level === 'low' && '🌈 Every expert was once a beginner. You\'ve got this!'}
                            {result.level === 'passing' && '🚀 A little more effort and you\'ll be at the top!'}
                            {result.level === 'high' && '🏆 Keep up the fantastic work — you\'re a star student!'}
                        </p>
                    </div>
                </div>
            )}
        </section>
    );
}
