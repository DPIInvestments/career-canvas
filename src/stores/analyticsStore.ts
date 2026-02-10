import { create } from 'zustand';
import type { Language } from '@/lib/i18n';
import type { Sector, ExperienceLevel } from '@/lib/sectorRules';

export type EventType =
  | 'landing_visit'
  | 'quiz_started'
  | 'quiz_completed'
  | 'preview_viewed'
  | 'recommendations_viewed';

interface QuizCompletedPayload {
  sector: Sector;
  profession: string;
  experience: ExperienceLevel;
  language: Language;
  requiresAdvancedATS: boolean;
}

interface AnalyticsEvent {
  type: EventType;
  timestamp: number;
  payload?: QuizCompletedPayload;
}

interface AnalyticsState {
  events: AnalyticsEvent[];
  track: (type: EventType, payload?: QuizCompletedPayload) => void;
  getCount: (type: EventType) => number;
  getCompletedQuizzes: () => QuizCompletedPayload[];
}

export const useAnalyticsStore = create<AnalyticsState>((set, get) => ({
  events: [],

  track: (type, payload) => {
    set((s) => ({
      events: [...s.events, { type, timestamp: Date.now(), payload }],
    }));
  },

  getCount: (type) => {
    return get().events.filter((e) => e.type === type).length;
  },

  getCompletedQuizzes: () => {
    return get()
      .events.filter((e) => e.type === 'quiz_completed' && e.payload)
      .map((e) => e.payload!);
  },
}));
