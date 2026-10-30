"use client";

import { track } from "@vercel/analytics";

// Enlace que registra un evento en Vercel Analytics (cta_calendar, cta_email, …).
export function TrackLink({ event, where, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { event: string; where: string }) {
  return <a {...props} onClick={(e) => { track(event, { where }); props.onClick?.(e); }} />;
}
