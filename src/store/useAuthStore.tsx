import type { User } from "@/interfaces/user.interface";
import { create } from "zustand";

export interface UserState {
  user: User | null;
  actions: {
    setUser: (user: User | null) => Promise<void>;
  };
}

const actions = (
  set: (
    state: Partial<UserState> | ((state: UserState) => Partial<UserState>)
  ) => void
) => ({
  setUser: async (user: User | null) => {
    set((state: UserState) => ({
      ...state,
      user,
    }));
  },
});

// Create Zustand Store with type checking for state
export const useAuthStore = create<UserState>((set) => ({
  user: null,
  actions: actions(set),
}));
