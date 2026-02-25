import React from 'react';
import GuideSection from './GuideSection';

const sections = [
    {
        id: 'getting-organized',
        number: 1,
        emoji: '📋',
        title: 'Getting Organized',
        intro: 'Being organized is like having a superpower. When you know where everything is, school feels way less stressful.',
        colorClass: 'bg-section-1',
        borderColorClass: 'border-yellow-300',
        numberColorClass: 'bg-yellow-500',
        bullets: [
            { bold: 'Use a planner or homework notebook.', rest: ' Write down every assignment the moment your teacher gives it. Don\'t trust your memory!' },
            { bold: 'Keep your folders and binders neat.', rest: ' Use a different color folder for each subject. Put papers in the right folder right away.' },
            { bold: 'Create a homework routine.', rest: ' Pick a time every day (after a snack, after school) to sit down and do homework. Same time, same spot — your brain will get used to it.' },
        ],
    },
    {
        id: 'better-study-habits',
        number: 2,
        emoji: '📖',
        title: 'Better Study Habits',
        intro: 'Studying smart is better than studying hard for hours.',
        colorClass: 'bg-section-2',
        borderColorClass: 'border-green-300',
        numberColorClass: 'bg-green-500',
        bullets: [
            { bold: 'Break big assignments into small steps.', rest: ' A book report due Friday? Plan it out: Monday — read, Tuesday — notes, Wednesday — write, Thursday — edit.' },
            { bold: 'Review your notes a little every day.', rest: ' Five minutes of daily review is better than cramming the night before.' },
            'Try fun study tricks:',
            'Make flashcards for spelling words or math facts',
            'Quiz yourself (or have a parent quiz you)',
            'Teach the material to a stuffed animal or a sibling — if you can explain it, you know it!',
        ],
    },
    {
        id: 'improving-reading',
        number: 3,
        emoji: '🔍',
        title: 'Improving Reading Skills',
        intro: 'Reading is the foundation of almost every subject. The more you read, the better you do in school.',
        colorClass: 'bg-section-3',
        borderColorClass: 'border-sky-300',
        numberColorClass: 'bg-sky-500',
        bullets: [
            { bold: 'Read 20 minutes every day.', rest: ' It adds up fast!' },
            { bold: 'Choose books at the right level.', rest: ' Pick books that are challenging but not frustrating. Ask your teacher or librarian for suggestions.' },
            { bold: 'Ask questions while you read.', rest: ' "What\'s going to happen next?" "Why did the character do that?" This keeps your brain active.' },
            { bold: 'Learn new vocabulary words.', rest: ' When you see a word you don\'t know, look it up. Keep a vocabulary notebook.' },
        ],
    },
    {
        id: 'getting-better-at-math',
        number: 4,
        emoji: '🔢',
        title: 'Getting Better at Math',
        intro: 'Math gets easier the more you practice — really!',
        colorClass: 'bg-section-4',
        borderColorClass: 'border-orange-300',
        numberColorClass: 'bg-orange-500',
        bullets: [
            { bold: 'Practice multiplication and division facts daily.', rest: ' Knowing them by heart speeds up everything else.' },
            { bold: 'Show your work clearly.', rest: ' Write each step so you (and your teacher) can see how you got your answer.' },
            { bold: 'Always check your answers.', rest: ' After finishing, go back and redo the first few problems.' },
            { bold: 'Ask for help when you\'re confused.', rest: ' Raise your hand in class or ask your teacher after school. Everyone needs help sometimes — it\'s smart, not embarrassing.' },
        ],
    },
    {
        id: 'listening-participating',
        number: 5,
        emoji: '🙋',
        title: 'Listening and Participating in Class',
        intro: 'A lot of learning happens during class time. Make the most of it!',
        colorClass: 'bg-section-5',
        borderColorClass: 'border-purple-300',
        numberColorClass: 'bg-purple-500',
        bullets: [
            { bold: 'Raise your hand and participate.', rest: ' Answering questions out loud helps you remember things better.' },
            { bold: 'Take notes.', rest: ' Write down key words, not every single thing your teacher says.' },
            { bold: 'Follow directions carefully.', rest: ' Before starting a task, make sure you understand what you\'re supposed to do.' },
            { bold: 'Stay focused and respectful.', rest: ' Put away distractions, face the front, and give your teacher your full attention.' },
        ],
    },
    {
        id: 'test-taking-strategies',
        number: 6,
        emoji: '📝',
        title: 'Test-Taking Strategies',
        intro: 'Tests don\'t have to be scary. With a plan, you can tackle them like a pro.',
        colorClass: 'bg-section-6',
        borderColorClass: 'border-teal-300',
        numberColorClass: 'bg-teal-500',
        bullets: [
            { bold: 'Read every question carefully', rest: ' before answering. Don\'t rush!' },
            { bold: 'Skip hard questions and come back.', rest: ' Answer the easy ones first, then return to the tricky ones.' },
            { bold: 'Manage your time.', rest: ' Keep an eye on the clock so you don\'t run out of time.' },
            { bold: 'Stay calm and confident.', rest: ' Take a deep breath if you feel nervous. You\'ve studied — trust yourself!' },
        ],
    },
    {
        id: 'healthy-habits',
        number: 7,
        emoji: '🍎',
        title: 'Healthy Habits for School Success',
        intro: 'Your body and brain need fuel to do their best work.',
        colorClass: 'bg-section-7',
        borderColorClass: 'border-amber-300',
        numberColorClass: 'bg-amber-500',
        bullets: [
            { bold: 'Get enough sleep.', rest: ' Kids your age need 9–11 hours a night. A tired brain can\'t focus or remember things well.' },
            { bold: 'Eat a healthy breakfast.', rest: ' Even something small like toast and fruit gives your brain energy for the morning.' },
            { bold: 'Limit screen time.', rest: ' Too much TV or gaming before bed messes up your sleep and focus.' },
            { bold: 'Stay active.', rest: ' Exercise — even a walk or playing outside — helps your brain focus better.' },
        ],
    },
    {
        id: 'setting-goals',
        number: 8,
        emoji: '🏆',
        title: 'Setting Goals and Staying Motivated',
        intro: 'Knowing what you\'re working toward makes it easier to keep going.',
        colorClass: 'bg-section-8',
        borderColorClass: 'border-pink-300',
        numberColorClass: 'bg-pink-500',
        bullets: [
            { bold: 'Set small weekly goals.', rest: ' Instead of "I want straight A\'s," try "I will study spelling words every night this week."' },
            { bold: 'Track your progress.', rest: ' Keep a chart or checklist. Seeing improvements feels great!' },
            { bold: 'Celebrate your wins — even small ones.', rest: ' Got a better grade on a quiz? That\'s worth celebrating!' },
            { bold: 'Keep a positive mindset.', rest: ' Tell yourself: "I can get better at this." Believing in yourself really does make a difference.' },
        ],
    },
];

export default function GuideContent() {
    return (
        <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
            {sections.map((section) => (
                <GuideSection key={section.id} {...section} />
            ))}

            {/* Encouraging Conclusion */}
            <section
                id="conclusion"
                className="rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-primary/20 via-accent/10 to-secondary border-2 border-primary/30 shadow-card text-center"
            >
                <div className="text-5xl mb-4 animate-bounce-gentle">🎓</div>
                <h2 className="font-display text-3xl sm:text-4xl text-foreground mb-4">
                    You've Got This!
                </h2>
                <div className="max-w-2xl mx-auto space-y-4 font-body text-base sm:text-lg text-foreground/80 leading-relaxed">
                    <p>
                        Improving your grades is not about being the smartest kid in the room — it's about showing up, trying your best, and not giving up when things get hard. Mistakes aren't failures; they're how you learn. Every great student made plenty of them.
                    </p>
                    <p>
                        Be patient with yourself. Be kind to yourself. And remember: small steps every day lead to big results over time. You have everything it takes to succeed — now go show what you can do!
                    </p>
                </div>
                <div className="flex justify-center gap-3 mt-6 text-3xl">
                    <span className="animate-wiggle">⭐</span>
                    <span className="animate-bounce-gentle">🌟</span>
                    <span className="animate-wiggle" style={{ animationDelay: '0.5s' }}>⭐</span>
                </div>
            </section>
        </main>
    );
}
