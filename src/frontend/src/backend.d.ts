import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface StudyTip {
    id: bigint;
    title: string;
    content: string;
    subject: Subject;
}
export interface Quiz {
    id: bigint;
    title: string;
    subject: Subject;
    questions: Array<Question>;
}
export interface QuizResult {
    userId: Principal;
    answers: Array<bigint>;
    score: bigint;
    totalQuestions: bigint;
    timestamp: bigint;
    quizId: bigint;
}
export interface StudyPlan {
    timetable: string;
    subjects: Array<Subject>;
    timeSlots: Array<string>;
    userId: Principal;
}
export interface PomodoroSettings {
    focusTime: bigint;
    breakTime: bigint;
}
export interface GameProgress {
    quizScoresPerLevel: Array<[bigint, bigint]>;
    userId: Principal;
    currentLevel: bigint;
    unlockedLevels: Array<bigint>;
    completedLevels: Array<bigint>;
}
export interface Question {
    text: string;
    correctAnswerIndex: bigint;
    options: Array<string>;
}
export interface UserProfile {
    name: string;
    role: string;
    email: string;
}
export interface Note {
    id: bigint;
    subject: Subject;
    blob: ExternalBlob;
    description: string;
    fileName: string;
    uploadedBy: Principal;
}
export enum Subject {
    reading = "reading",
    socialStudies = "socialStudies",
    math = "math",
    grammar = "grammar",
    science = "science"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addNote(fileId: ExternalBlob, subject: Subject, fileName: string, description: string): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    completeSubjectChallenge(subjectId: string): Promise<void>;
    createQuiz(title: string, subject: Subject, questions: Array<Question>): Promise<bigint>;
    createStudyPlan(subjects: Array<Subject>, timeSlots: Array<string>, timetable: string): Promise<void>;
    createStudyTip(title: string, content: string, subject: Subject): Promise<bigint>;
    deleteNote(noteId: bigint): Promise<void>;
    deleteQuiz(id: bigint): Promise<void>;
    deleteStudyTip(id: bigint): Promise<void>;
    getAdminStatistics(): Promise<{
        totalStudyTips: bigint;
        totalQuizzes: bigint;
        totalNotes: bigint;
        totalUsers: bigint;
    }>;
    getAllNotes(): Promise<Array<Note>>;
    getAllQuizzes(): Promise<Array<Quiz>>;
    getAllStudyTips(): Promise<Array<StudyTip>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getGameProgress(): Promise<GameProgress | null>;
    getGameScores(): Promise<Array<bigint>>;
    getLeaderboard(): Promise<Array<[Principal, bigint]>>;
    getNotesBySubject(subject: Subject): Promise<Array<Note>>;
    getOverallProgress(): Promise<{
        quizScores: Array<bigint>;
        gameProgressData?: GameProgress;
        studyHours: bigint;
    }>;
    getPomodoroSettings(): Promise<PomodoroSettings>;
    getQuizResultsForQuiz(quizId: bigint): Promise<Array<QuizResult>>;
    getQuizResultsForUser(): Promise<Array<QuizResult>>;
    getQuizzesBySubject(subject: Subject): Promise<Array<Quiz>>;
    getStudyPlan(): Promise<StudyPlan | null>;
    getStudyTipsBySubject(subject: Subject): Promise<Array<StudyTip>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    hasCompletedSubjectChallenge(subjectId: string): Promise<boolean>;
    isCallerAdmin(): Promise<boolean>;
    recordScore(score: bigint): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    saveGameProgress(currentLevel: bigint, completedLevels: Array<bigint>, quizScoresPerLevel: Array<[bigint, bigint]>, unlockedLevels: Array<bigint>): Promise<void>;
    saveLevelQuizScore(level: bigint, score: bigint): Promise<void>;
    searchStudyTips(keyword: string): Promise<Array<StudyTip>>;
    submitQuizAnswers(quizId: bigint, answers: Array<bigint>): Promise<bigint>;
    updateLevelCompletion(level: bigint): Promise<void>;
    updatePomodoroSettings(focusTime: bigint, breakTime: bigint): Promise<void>;
    updateStudyPlan(subjects: Array<Subject>, timeSlots: Array<string>, timetable: string): Promise<void>;
    updateStudyTip(id: bigint, title: string, content: string, subject: Subject): Promise<void>;
}
