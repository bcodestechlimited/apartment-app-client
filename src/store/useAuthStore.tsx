import type { User } from "@/interfaces/user.interface";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthCredentials {
  email: string;
  password: string;
}

export interface UserState {
  user: User | null;
  authCredentials: AuthCredentials | null;
  actions: {
    setUser: (user: User | null) => Promise<void>;
    setAuthCredentials: (creds: AuthCredentials | null) => void;
  };
}

const actions = (
  set: (
    state: Partial<UserState> | ((state: UserState) => Partial<UserState>)
  ) => void
) => ({
  setUser: async (user: User | null) => {
    set({ user });
  },
  setAuthCredentials: (creds: AuthCredentials | null) => {
    set({ authCredentials: creds });
  },
});

// Create Zustand Store with type checking for state
// export const useAuthStore = create<UserState>((set) => ({
//   user: null,
//   actions: actions(set),
// }));

export const useAuthStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      authCredentials: null,
      actions: actions(set),
    }),
    {
      name: "auth-store",
      // storage: sessionStorage, // 💡 safer than localStorage
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
      partialize: (state) => ({
        authCredentials: state.authCredentials, // only store credentials (if needed)
      }),
    }
  )
);

export const useAuthActions = () => {
  const { actions } = useAuthStore();
  return actions;
};
