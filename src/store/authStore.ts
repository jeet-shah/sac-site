import { create } from "zustand";
import type { UserRole } from "@/types/auth.types";

interface AuthState {
  role: UserRole;
  setRole: (role: UserRole) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  role: "guest",

  setRole: (role) => set({ role }),
}));