"use client";

import { useId, useState, type ReactNode } from "react";

/**
 * Una fila de «El método en 21 ideas» (/libro#metodo). En escritorio todo queda abierto.
 * En celular solo la Parte 01 llega abierta y las demás se abren con el botón, para que la lista
 * no ocupe nueve pantallas antes de la muestra y la compra.
 */
export default function ParteMetodo({ code, head, verLabel, defaultOpen, children }: { code: string; head: ReactNode; verLabel: string; defaultOpen: boolean; children: ReactNode }) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  return (
    <div className="rv grid gap-x-3 gap-y-4 lg:gap-x-6 grid-cols-[72px_minmax(0,1fr)] lg:grid-cols-[120px_300px_minmax(0,1fr)] pt-5 pb-[18px] border-t border-ink">
      <span className="num text-display-md">{code}</span>
      <div>
        {head}
        <button
          type="button"
          className="lg:hidden mt-3 inline-flex items-center gap-2 text-recuadro font-semibold ul cursor-pointer"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Ocultar" : verLabel}
          <span aria-hidden="true" className={`inline-block transition-transform duration-150 ${open ? "rotate-45" : ""}`}>
            +
          </span>
        </button>
      </div>
      <div id={id} className={`col-span-2 lg:col-span-1 ${open ? "" : "max-lg:hidden"}`}>
        {children}
      </div>
    </div>
  );
}
