"use client";
import { useState, useEffect, useCallback, useRef } from "react";

/**
 * Guarda los campos de una fase del toolkit en localStorage.
 * El toolkit está retirado (/toolkit redirige a /workbook), así que ya no sincroniza con un servidor.
 * Guarda solo 600 ms después de cada cambio; `save()` fuerza la escritura.
 */
export function usePhaseData<T extends object>(phaseKey: string, defaults: T) {
  const storageKey = `ff_toolkit_${phaseKey}`;

  const [data, setData] = useState<T>(defaults);
  const [saved, setSaved] = useState(true);
  const hydrated = useRef(false);

  useEffect(() => {
    if (hydrated.current) return;
    hydrated.current = true;
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setData({ ...defaults, ...JSON.parse(raw) });
    } catch {}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      try {
        localStorage.setItem(storageKey, JSON.stringify(data));
        setSaved(true);
      } catch {}
    }, 600);
    return () => clearTimeout(t);
  }, [data, storageKey]);

  const set = useCallback((key: keyof T, value: string) => {
    setData((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }, []);

  const save = useCallback(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(data));
      setSaved(true);
    } catch {}
  }, [data, storageKey]);

  return { data, set, saved, save };
}
