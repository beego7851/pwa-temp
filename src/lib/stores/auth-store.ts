import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthState = {
  isAuthenticated: boolean;
  user: any | null;
  memberNumber: string | null;
  setAuth: (
    isAuthenticated: boolean,
    user: any | null,
    memberNumber: string | null,
  ) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthState>(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      memberNumber: null,
      setAuth: (isAuthenticated, user, memberNumber) =>
        set({ isAuthenticated, user, memberNumber }),
      clearAuth: () =>
        set({ isAuthenticated: false, user: null, memberNumber: null }),
    }),
    {
      name: "auth-storage",
    },
  ),
);
