"use client";
import { useState, useEffect, useCallback } from "react";

/**
 * Persists all calculator fields for a phase in localStorage.
 * Auto-saves 600 ms after any change. `save()` forces an immediate write.
 */
export function usePhaseData<T extends object>(
  phaseKey: string,
  defaults: T
) {
  const storageKey = `ff_toolkit_${phaseKey}`;
  const [data, setData] = useState<T>(defaults);
  const [saved, setSaved] = useState(true);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setData((prev) => ({ ...prev, ...JSON.parse(raw) }));
    } catch {}
  }, [storageKey]);

  // Auto-save with debounce
  useEffect(() => {
    const t = setTimeout(() => {
      try {
        localStorage.setItem(storageKey, JSON.stringify(data));
        setSaved(true);
      } catch {}
    }, 600);
    return () => clearTimeout(t);
  }, [data, storageKey]);

  const set = useCallback(
    (key: keyof T, value: string) => {
      setData((prev) => ({ ...prev, [key]: value }));
      setSaved(false);
    },
    []
  );

  const save = useCallback(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(data));
      setSaved(true);
    } catch {}
  }, [data, storageKey]);

  return { data, set, saved, save };
}
