import { create } from 'zustand';
import type { Language } from '@/lib/i18n';
import type { Sector, ExperienceLevel } from '@/lib/sectorRules';

interface QuizAnswers {
  fullName?: string;
  email?: string;
}

interface UserState {
  language: Language;
  sector: Sector | null;
  profession: string | null;
  experienceLevel: ExperienceLevel | null;
  requiresAdvancedATS: boolean;
  quizAnswers: QuizAnswers;
  quizCompleted: boolean;

  setLanguage: (lang: Language) => void;
  setSector: (sector: Sector) => void;
  setProfession: (profession: string) => void;
  setExperienceLevel: (level: ExperienceLevel) => void;
  setRequiresAdvancedATS: (val: boolean) => void;
  setQuizAnswers: (answers: Partial<QuizAnswers>) => void;
  setQuizCompleted: (val: boolean) => void;
  reset: () => void;
}

const savedLang = (typeof window !== 'undefined' && localStorage.getItem('ats-lang')) as Language | null;

export const useUserStore = create<UserState>((set) => ({
  language: savedLang || 'EN',
  sector: null,
  profession: null,
  experienceLevel: null,
  requiresAdvancedATS: false,
  quizAnswers: {},
  quizCompleted: false,

  setLanguage: (language) => {
    localStorage.setItem('ats-lang', language);
    set({ language });
  },
  setSector: (sector) => set({ sector }),
  setProfession: (profession) => set({ profession }),
  setExperienceLevel: (level) => set({ experienceLevel: level }),
  setRequiresAdvancedATS: (val) => set({ requiresAdvancedATS: val }),
  setQuizAnswers: (answers) => set((s) => ({ quizAnswers: { ...s.quizAnswers, ...answers } })),
  setQuizCompleted: (val) => set({ quizCompleted: val }),
  reset: () => set({
    sector: null, profession: null, experienceLevel: null,
    requiresAdvancedATS: false, quizAnswers: {}, quizCompleted: false,
  }),
}));
