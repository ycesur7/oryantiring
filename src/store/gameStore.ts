import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Checkpoint {
  id: number;
  name: string;
  value: string;
  qrCode: string;
  description: string;
  icon: string;
  color: string;
  completed: boolean;
  score?: number;
  scenario: {
    title: string;
    question: string;
    options: Array<{
      text: string;
      points: number;
      feedback: string;
    }>;
  };
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  requirement: string;
  earned: boolean;
  earnedAt?: number;
}

export interface UserProgress {
  totalPoints: number;
  completedCheckpoints: number;
  earnedBadges: string[];
  valueScores: {
    [key: string]: number;
  };
}

interface GameState {
  checkpoints: Checkpoint[];
  badges: Badge[];
  progress: UserProgress;
  demoMode: boolean;
  
  setCheckpoints: (checkpoints: Checkpoint[]) => void;
  setBadges: (badges: Badge[]) => void;
  completeCheckpoint: (id: number, score: number) => void;
  earnBadge: (badgeId: string) => void;
  setDemoMode: (enabled: boolean) => void;
  resetProgress: () => void;
  unlockCheckpointByQR: (qrCode: string) => number | null;
}

const initialProgress: UserProgress = {
  totalPoints: 0,
  completedCheckpoints: 0,
  earnedBadges: [],
  valueScores: {},
};

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      checkpoints: [],
      badges: [],
      progress: initialProgress,
      demoMode: false,

      setCheckpoints: (checkpoints) => set({ checkpoints }),
      
      setBadges: (badges) => set({ badges }),
      
      completeCheckpoint: (id, score) => set((state) => {
        const checkpoint = state.checkpoints.find(cp => cp.id === id);
        if (!checkpoint || checkpoint.completed) return state;

        const updatedCheckpoints = state.checkpoints.map(cp =>
          cp.id === id ? { ...cp, completed: true, score } : cp
        );

        const currentValueScore = state.progress.valueScores[checkpoint.value] || 0;

        const newProgress = {
          ...state.progress,
          totalPoints: state.progress.totalPoints + score,
          completedCheckpoints: state.progress.completedCheckpoints + 1,
          valueScores: {
            ...state.progress.valueScores,
            [checkpoint.value]: currentValueScore + score,
          },
        };

        return {
          checkpoints: updatedCheckpoints,
          progress: newProgress,
        };
      }),
      
      earnBadge: (badgeId) => set((state) => {
        if (state.progress.earnedBadges.includes(badgeId)) return state;

        return {
          badges: state.badges.map(badge =>
            badge.id === badgeId ? { ...badge, earned: true, earnedAt: Date.now() } : badge
          ),
          progress: {
            ...state.progress,
            earnedBadges: [...state.progress.earnedBadges, badgeId],
          },
        };
      }),
      
      setDemoMode: (enabled) => set({ demoMode: enabled }),
      
      resetProgress: () => set((state) => ({
        checkpoints: state.checkpoints.map(cp => ({ ...cp, completed: false, score: undefined })),
        badges: state.badges.map(badge => ({ ...badge, earned: false, earnedAt: undefined })),
        progress: initialProgress,
      })),

      unlockCheckpointByQR: (qrCode) => {
        const checkpoint = get().checkpoints.find(cp => cp.qrCode === qrCode);
        return checkpoint ? checkpoint.id : null;
      },
    }),
    {
      name: 'dijital-degerler-storage',
    }
  )
);
