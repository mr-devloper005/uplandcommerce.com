import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Braces, Code2, ShieldCheck, Terminal, Webhook } from "lucide-react";

export const revalidate = 300;

const docs = {
  api: {
    icon: Braces,
    title: "API overview",
    summary: "Post model and feed patterns (conceptual).",
    blocks: [
      {
        title: "Tasks and posts",
        body:
          "This site is task-based. A post belongs to a task (Classifieds or Gallery here), and the UI renders cards and detail pages without changing payload contracts.",
      },
      {
        title: "Feed + search",
        body:
          "Use the feed to fetch recent posts and /search to filter by keyword, category, or task. Keep queries short for fast scanning and predictable results.",
      },
      {
        title: "Performance notes",
        body:
          "Prefer server rendering for lists. Use CSS-first motion. Keep media heavy lifting on the CDN path.",
      },
    ],
  },
  webhooks: {
    icon: Webhook,
    title: "Webhooks",
    summary: "Event-driven integrations (conceptual guide).",
    blocks: [
      { title: "When to use", body: "Use webhooks for notifications, moderation queues, or syncing posts into another system." },
      { title: "Events", body: "Typical events: post.created, post.updated, post.deleted, and media.processed." },
      { title: "Retries", body: "Design idempotent handlers. Treat repeated deliveries as normal." },
    ],
  },
  auth: {
    icon: ShieldCheck,
    title: "Auth notes",
    summary: "Local auth behavior and UI expectations.",
    blocks: [
      { title: "Local session", body: "Login/signup persists to localStorage on this site. The UI expects an authenticated user to enable Create actions." },
      { title: "Swappable backend", body: "Auth connectors can be swapped later without changing the UI—keep client flows stable." },
    ],
  },
  cli: {
    icon: Terminal,
    title: "CLI patterns",
    summary: "Local testing workflows.",
    blocks: [
      { title: "Create local posts", body: "Use the Create flow to generate local-only posts for QA. Validate cards, filters, and detail pages quickly." },
      { title: "Check list layouts", body: "Verify mobile breakpoints and card density on /classifieds and /images." },
    ],
  },
} as const;

type DocKey = keyof typeof docs;

export default async function DeveloperDocPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolved = await params;
  const slug = (resolved?.slug || "").toLowerCase() as DocKey;
  const doc = docs[slug];
  if (!doc) return notFound();
  const Icon = doc.icon;

  return (
    <PageShell
      title={doc.title}
      description={doc.summary}
      actions={
        <Link href="/developers" className="rounded-full border border-[#c5ddd4] bg-white px-4 py-2 text-sm font-semibold text-[#1B4332] hover:bg-[#e8f2ed]">
          ← Back to Developers
        </Link>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-4">
          {doc.blocks.map((b) => (
            <Card key={b.title}>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-[#0f241f]">{b.title}</h2>
                <p className="mt-2 text-sm leading-7 text-[#3d5a52]">{b.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#3d5a52]">Reference</p>
                <h3 className="mt-2 text-xl font-semibold text-[#0f241f]">Build for scanning + visuals</h3>
              </div>
              <Badge variant="secondary" className="rounded-full px-3 py-1">
                <Icon className="mr-2 h-4 w-4" />
                {slug.toUpperCase()}
              </Badge>
            </div>
            <p className="mt-4 text-sm leading-7 text-[#3d5a52]">
              The product identity is two-lane: fast classified browsing and gallery-first image posts. Keep UI consistent, lean, and readable.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Link href="/classifieds" className="rounded-full border border-[#c5ddd4] bg-white px-4 py-2 text-sm font-semibold text-[#1B4332] hover:bg-[#e8f2ed]">Classifieds</Link>
              <Link href="/images" className="rounded-full border border-[#c5ddd4] bg-white px-4 py-2 text-sm font-semibold text-[#1B4332] hover:bg-[#e8f2ed]">Gallery</Link>
              <Link href="/search" className="rounded-full border border-[#c5ddd4] bg-white px-4 py-2 text-sm font-semibold text-[#1B4332] hover:bg-[#e8f2ed]">Browse</Link>
            </div>
            <div className="mt-6 rounded-[1.4rem] border border-[#c5ddd4] bg-[#e8f2ed] p-5">
              <p className="text-sm font-semibold text-[#0f241f]">What’s next</p>
              <p className="mt-2 text-sm leading-7 text-[#3d5a52]">
                Expand this doc page with real API routes and schemas only when the connector is finalized—UI stays the same either way.
              </p>
              <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#1B4332]">
                <Code2 className="h-4 w-4" />
                Keep contracts stable
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}
