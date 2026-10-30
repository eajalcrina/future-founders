import { INDEXABLE, SITE } from "@/lib/site";

// Mismo criterio que redesignlab.org: los rastreadores de IA se declaran por escrito
// porque el objetivo es que citen el sitio. /api/ no tiene contenido indexable.
const AI_BOTS = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "Claude-User", "PerplexityBot", "Perplexity-User", "Google-Extended", "Applebot-Extended", "CCBot"];
const SIGNAL = "search=yes, ai-input=yes, ai-train=yes";

export const dynamic = "force-static";

export function GET() {
  const group = (agents: string[]) => [...agents.map((a) => `User-Agent: ${a}`), `Content-Signal: ${SIGNAL}`, "Allow: /", "Disallow: /api/"].join("\n");
  const body = INDEXABLE
    ? [group(["*"]), group(AI_BOTS), `Sitemap: ${SITE}/sitemap.xml`].join("\n\n") + "\n"
    : "User-Agent: *\nDisallow: /\n";
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
