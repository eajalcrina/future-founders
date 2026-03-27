"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "@/lib/supabase";

const STORAGE_KEY_USER = "ff_toolkit_user";

function getCurrentUserEmail(): string | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_USER);
    if (!raw) return null;
    return (JSON.parse(raw) as { email?: string }).email ?? null;
  } catch {
    return null;
  }
}

async function loadPhaseFromSupabase<T>(phaseNumber: number, userEmail: string): Promise<T | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("toolkit_phases")
    .select("data")
    .eq("user_email", userEmail)
    .eq("phase", phaseNumber)
    .single();
  if (error || !data) return null;
  return data.data as T;
}

async function savePhaseToSupabase<T extends object>(phaseNumber: number, userEmail: string, phaseData: T) {
  if (!supabase) return;
  await supabase.from("toolkit_phases").upsert(
    { user_email: userEmail, phase: phaseNumber, data: phaseData, updated_at: new Date().toISOString() },
    { onConflict: "user_email,phase" }
  );
}

/**
 * Persists all calculator fields for a phase.
 * - Primary store: localStorage (instant, offline-safe)
 * - Secondary store: Supabase (syncs when user is logged in and Supabase is configured)
 * Auto-saves 600ms after any change. `save()` forces an immediate write.
 */
export function usePhaseData<T extends object>(phaseKey: string, defaults: T) {
  const storageKey = `ff_toolkit_${phaseKey}`;
  const phaseNumber = parseInt(phaseKey.replace("phase", "")) || 0;

  const [data, setData] = useState<T>(defaults);
  const [saved, setSaved] = useState(true);
  const hydrated = useRef(false);

  // Hydrate: localStorage first, then try to merge from Supabase
  useEffect(() => {
    if (hydrated.current) return;
    hydrated.current = true;

    let localData: T = defaults;
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) localData = { ...defaults, ...JSON.parse(raw) };
    } catch {}
    setData(localData);

    // If Supabase is available and user is logged in, fetch remote data
    const email = getCurrentUserEmail();
    if (!email || !supabase) return;
    loadPhaseFromSupabase<T>(phaseNumber, email)
      .then((remote) => {
        if (remote) {
          const merged = { ...localData, ...remote };
          setData(merged);
          try {
            localStorage.setItem(storageKey, JSON.stringify(merged));
          } catch {}
        }
      })
      .catch(() => {});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-save (localStorage + Supabase) with 600ms debounce
  useEffect(() => {
    const t = setTimeout(() => {
      try {
        localStorage.setItem(storageKey, JSON.stringify(data));
        setSaved(true);
      } catch {}

      const email = getCurrentUserEmail();
      if (email) {
        savePhaseToSupabase(phaseNumber, email, data).catch(() => {});
      }
    }, 600);
    return () => clearTimeout(t);
  }, [data, storageKey, phaseNumber]);

  const set = useCallback((key: keyof T, value: string) => {
    setData((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }, []);

  const save = useCallback(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(data));
      setSaved(true);
    } catch {}
    const email = getCurrentUserEmail();
    if (email) {
      savePhaseToSupabase(phaseNumber, email, data).catch(() => {});
    }
  }, [data, storageKey, phaseNumber]);

  return { data, set, saved, save };
}
