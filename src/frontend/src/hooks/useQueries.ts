import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Subject, Question, UserProfile, UserRole } from '@/backend';

// Admin Statistics
export function useAdminStatistics() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ['adminStats'],
    queryFn: async () => {
      if (!actor) throw new Error('No actor');
      return actor.getAdminStatistics();
    },
    enabled: !!actor && !isFetching,
  });
}

// Study Tips
export function useAllStudyTips() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ['studyTips'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllStudyTips();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useStudyTipsBySubject(subject: Subject) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ['studyTips', subject],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getStudyTipsBySubject(subject);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSearchStudyTips(keyword: string) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ['studyTips', 'search', keyword],
    queryFn: async () => {
      if (!actor || !keyword) return [];
      return actor.searchStudyTips(keyword);
    },
    enabled: !!actor && !isFetching && keyword.length > 0,
  });
}

export function useCreateStudyTip() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ title, content, subject }: { title: string; content: string; subject: Subject }) => {
      if (!actor) throw new Error('No actor');
      return actor.createStudyTip(title, content, subject);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['studyTips'] });
    },
  });
}

export function useUpdateStudyTip() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, title, content, subject }: { id: bigint; title: string; content: string; subject: Subject }) => {
      if (!actor) throw new Error('No actor');
      return actor.updateStudyTip(id, title, content, subject);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['studyTips'] });
    },
  });
}

export function useDeleteStudyTip() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error('No actor');
      return actor.deleteStudyTip(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['studyTips'] });
    },
  });
}

// Notes
export function useAllNotes() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ['notes'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllNotes();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useNotesBySubject(subject: Subject) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ['notes', subject],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getNotesBySubject(subject);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useDeleteNote() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error('No actor');
      return actor.deleteNote(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });
}

// Quizzes
export function useAllQuizzes() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ['quizzes'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllQuizzes();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useQuizzesBySubject(subject: Subject) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ['quizzes', subject],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getQuizzesBySubject(subject);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateQuiz() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ title, subject, questions }: { title: string; subject: Subject; questions: Question[] }) => {
      if (!actor) throw new Error('No actor');
      return actor.createQuiz(title, subject, questions);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quizzes'] });
    },
  });
}

export function useDeleteQuiz() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error('No actor');
      return actor.deleteQuiz(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quizzes'] });
    },
  });
}

export function useSubmitQuizAnswers() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ quizId, answers }: { quizId: bigint; answers: bigint[] }) => {
      if (!actor) throw new Error('No actor');
      return actor.submitQuizAnswers(quizId, answers);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quizResults'] });
      queryClient.invalidateQueries({ queryKey: ['overallProgress'] });
    },
  });
}

export function useQuizResultsForUser() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ['quizResults', 'user'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getQuizResultsForUser();
    },
    enabled: !!actor && !isFetching,
  });
}

// Study Plan
export function useStudyPlan() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ['studyPlan'],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getStudyPlan();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateStudyPlan() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ subjects, timeSlots, timetable }: { subjects: Subject[]; timeSlots: string[]; timetable: string }) => {
      if (!actor) throw new Error('No actor');
      return actor.createStudyPlan(subjects, timeSlots, timetable);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['studyPlan'] });
    },
  });
}

// Game Progress
export function useGameProgress() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ['gameProgress'],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getGameProgress();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSaveGameProgress() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ currentLevel, completedLevels, quizScoresPerLevel, unlockedLevels }: {
      currentLevel: bigint;
      completedLevels: bigint[];
      quizScoresPerLevel: [bigint, bigint][];
      unlockedLevels: bigint[];
    }) => {
      if (!actor) throw new Error('No actor');
      return actor.saveGameProgress(currentLevel, completedLevels, quizScoresPerLevel, unlockedLevels);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gameProgress'] });
      queryClient.invalidateQueries({ queryKey: ['overallProgress'] });
    },
  });
}

export function useUpdateLevelCompletion() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (level: bigint) => {
      if (!actor) throw new Error('No actor');
      return actor.updateLevelCompletion(level);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gameProgress'] });
    },
  });
}

export function useSaveLevelQuizScore() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ level, score }: { level: bigint; score: bigint }) => {
      if (!actor) throw new Error('No actor');
      return actor.saveLevelQuizScore(level, score);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gameProgress'] });
    },
  });
}

// Overall Progress
export function useOverallProgress() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ['overallProgress'],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getOverallProgress();
    },
    enabled: !!actor && !isFetching,
  });
}

// Pomodoro Settings
export function usePomodoroSettings() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ['pomodoroSettings'],
    queryFn: async () => {
      if (!actor) return { focusTime: BigInt(25), breakTime: BigInt(5) };
      return actor.getPomodoroSettings();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdatePomodoroSettings() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ focusTime, breakTime }: { focusTime: bigint; breakTime: bigint }) => {
      if (!actor) throw new Error('No actor');
      return actor.updatePomodoroSettings(focusTime, breakTime);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pomodoroSettings'] });
    },
  });
}

// Leaderboard
export function useLeaderboard() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ['leaderboard'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getLeaderboard();
    },
    enabled: !!actor && !isFetching,
  });
}
