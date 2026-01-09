import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface WaterState {
  currentIntake: number;
  dailyGoal: number;
  lastUpdatedDate: string; // ISO date string YYYY-MM-DD
  history: Record<string, number>; // date -> total amount
  notificationsEnabled: boolean;
  
  addWater: (amount: number) => void;
  setDailyGoal: (goal: number) => void;
  resetDaily: () => void;
  toggleNotifications: (enabled: boolean) => void;
  checkDate: () => void; // call on app start to see if it's a new day
}

const getTodayDate = () => new Date().toISOString().split('T')[0];

export const useWaterStore = create<WaterState>()(
  persist(
    (set, get) => ({
      currentIntake: 0,
      dailyGoal: 2000,
      lastUpdatedDate: getTodayDate(),
      history: {},
      notificationsEnabled: true,

      addWater: (amount) => {
        const today = getTodayDate();
        const { lastUpdatedDate, currentIntake, history } = get();

        if (today !== lastUpdatedDate) {
           // New day, reset first implies we should probably have handled this in checkDate, 
           // but let's handle it here too for robustness
           set({
             currentIntake: amount,
             lastUpdatedDate: today,
             history: { ...history, [lastUpdatedDate]: currentIntake }, 
           });
        } else {
          set({ currentIntake: currentIntake + amount });
        }
      },

      setDailyGoal: (goal) => set({ dailyGoal: goal }),

      resetDaily: () => set({ currentIntake: 0 }),
      
      toggleNotifications: async (enabled: boolean) => {
          set({ notificationsEnabled: enabled });
          // Ideally we handle the actual scheduling/canceling here or in the component calling this
      },

      checkDate: () => {
        const today = getTodayDate();
        const { lastUpdatedDate, currentIntake, history } = get();

        if (today !== lastUpdatedDate) {
          // It's a new day. Archive yesterday (or whatever the last date was)
          set({
            currentIntake: 0,
            lastUpdatedDate: today,
            history: { ...history, [lastUpdatedDate]: currentIntake },
          });
        }
      },
    }),
    {
      name: 'water-storage',
      storage: createJSONStorage(() => AsyncStorage),
      // Only persist specific fields if needed, but persisting all is fine
    }
  )
);
