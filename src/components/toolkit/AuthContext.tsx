"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/lib/supabase";

export interface ToolkitUser {
  id: string;
  name: string;
  email: string;
  role: string;
  company: string;
}

interface AuthContextValue {
  user: ToolkitUser | null;
  login: (email: string, password: string) => boolean;
  register: (data: RegisterData) => boolean;
  logout: () => void;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: string;
  company: string;
}

interface StoredUser extends ToolkitUser {
  password: string;
}

const STORAGE_KEY = "ff_toolkit_user";
const USERS_KEY = "ff_toolkit_users";

const AuthContext = createContext<AuthContextValue | null>(null);

/** Sync a user profile to Supabase (upsert by email, fire-and-forget). */
async function syncUserToSupabase(user: ToolkitUser) {
  if (!supabase) return;
  await supabase.from("toolkit_users").upsert(
    { id: user.id, email: user.email, name: user.name, role: user.role, company: user.company },
    { onConflict: "email" }
  );
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<ToolkitUser | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- lectura única de localStorage al montar
      if (stored) setUser(JSON.parse(stored));
    } catch {}
  }, []);

  function getUsers(): StoredUser[] {
    try {
      return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
    } catch {
      return [];
    }
  }

  function register(data: RegisterData): boolean {
    const users = getUsers();
    if (users.find((u) => u.email === data.email)) return false;
    const newUser: StoredUser = {
      id: `${Date.now()}`,
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
      company: data.company,
    };
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    const { password: _p, ...publicUser } = newUser;
    void _p;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(publicUser));
    setUser(publicUser);
    syncUserToSupabase(publicUser).catch(() => {});
    return true;
  }

  function login(email: string, password: string): boolean {
    const users = getUsers();
    const found = users.find((u) => u.email === email && u.password === password);
    if (!found) return false;
    const { password: _p, ...publicUser } = found;
    void _p;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(publicUser));
    setUser(publicUser);
    syncUserToSupabase(publicUser).catch(() => {});
    return true;
  }

  function logout() {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
