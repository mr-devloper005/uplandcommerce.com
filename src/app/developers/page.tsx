import Link from "next/link";
import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { buildPageMetadata } from "@/lib/seo";
import { Braces, Code2, ShieldCheck, Terminal, Webhook } from "lucide-react";

export const revalidate = 300;

export const generateMetadata = async () =>
  buildPageMetadata({
    path: "/developers",
    title: "Developers",
    description: "Integrate, automate, and build against the site surfaces (read-only docs).",
    keywords: ["developers", "api", "webhooks", "integration"],
  });

const sections = [
  {
    slug: "api",
    icon: Braces,
    title: "API overview",
    body: "Understand the post model, tasks, and feed endpoints without changing contracts.",
  },
  {
    slug: "webhooks",
    icon: Webhook,
    title: "Webhooks",
    body: "Get notified when new posts are created or updated (conceptual guide).",
  },
  {
    slug: "auth",
    icon: ShieldCheck,
    title: "Auth notes",
    body: "Client auth is local for this site; production connectors can be swapped without UI changes.",
  },
  {
    slug: "cli",
    icon: Terminal,
    title: "CLI patterns",
    body: "Recommended workflows for testing posts, categories, and previews locally.",
  },
];

export default function DevelopersPage() {
  return (
    <PageShell
      title="Developers"
      description="Docs and integration patterns for classifieds + gallery surfaces."
      actions={
        <Button asChild variant="outline" className="rounded-full border-[#c5ddd4] bg-white text-[#1B4332] hover:bg-[#e8f2ed]">
          <Link href="/status">View status</Link>
        </Button>
      }
    >
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="grid gap-4 sm:grid-cols-2">
          {sections.map((s) => (
            <Card key={s.slug} className="transition-transform hover:-translate-y-1">
              <CardContent className="p-6">
                <s.icon className="h-5 w-5 text-[#1B4332]" />
                <h2 className="mt-4 text-lg font-semibold text-[#0f241f]">{s.title}</h2>
                <p className="mt-2 text-sm leading-7 text-[#3d5a52]">{s.body}</p>
                <Link href={`/developers/${s.slug}`} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#1B4332] hover:underline">
                  Open docs <Code2 className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#3d5a52]">Quick start</p>
                <h3 className="mt-2 text-xl font-semibold text-[#0f241f]">Build against the two lanes.</h3>
              </div>
              <Badge variant="secondary" className="rounded-full px-3 py-1">
                Read-only guide
              </Badge>
            </div>
            <div className="mt-4 space-y-3 text-sm text-[#3d5a52]">
              <p>1) Use `/classifieds` and `/images` as your primary browse surfaces.</p>
              <p>2) Use `/search` for cross-lane discovery and previews.</p>
              <p>3) Keep UI light—prefer server rendering and CSS-first motion.</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <Link href="/classifieds" className="rounded-full border border-[#c5ddd4] bg-white px-4 py-2 text-sm font-semibold text-[#1B4332] hover:bg-[#e8f2ed]">Classifieds</Link>
              <Link href="/images" className="rounded-full border border-[#c5ddd4] bg-white px-4 py-2 text-sm font-semibold text-[#1B4332] hover:bg-[#e8f2ed]">Gallery</Link>
              <Link href="/help" className="rounded-full border border-[#c5ddd4] bg-white px-4 py-2 text-sm font-semibold text-[#1B4332] hover:bg-[#e8f2ed]">Help Center</Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}
