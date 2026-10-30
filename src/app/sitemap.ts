import type { MetadataRoute } from "next";
import { ROUTES, SITE, UPDATED, type RouteKey } from "@/lib/site";

const PRIORITY: Record<RouteKey, number> = { home: 1, fractional: 0.8, privacy: 0.2 };

export default function sitemap(): MetadataRoute.Sitemap {
  return (Object.keys(ROUTES) as RouteKey[]).flatMap((k) =>
    (["es", "en"] as const).map((lang) => ({
      url: SITE + (ROUTES[k][lang] === "/" ? "" : ROUTES[k][lang]),
      lastModified: UPDATED[k],
      priority: PRIORITY[k],
      alternates: { languages: { es: SITE + (ROUTES[k].es === "/" ? "" : ROUTES[k].es), en: SITE + ROUTES[k].en } },
    })),
  );
}
