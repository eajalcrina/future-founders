import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/sitio";
import { allWorkbookIds } from "@/content/workbook-util";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const main: [string, number][] = [
    ["", 1],
    ["/libro", 0.9],
    ["/kit", 0.9],
    ["/diagnostico", 0.8],
    ["/programas", 0.8],
    ["/workbook", 0.6],
    ["/toolkit", 0.5],
  ];
  return [
    ...main.map(([p, priority]) => ({ url: `${SITE_URL}${p}`, lastModified: now, changeFrequency: "monthly" as const, priority })),
    ...allWorkbookIds().map((id) => ({ url: `${SITE_URL}/workbook/${id}`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.4 })),
  ];
}
