import { PageShell } from "@/components/shared/page-shell";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { fetchSiteFeed } from "@/lib/site-connector";
import { buildPostUrl, getPostTaskKey } from "@/lib/task-data";
import { getMockPostsForTask } from "@/lib/mock-posts";
import { SITE_CONFIG } from "@/lib/site-config";
import { TaskPostCard } from "@/components/shared/task-post-card";
import Link from "next/link";

export const revalidate = 3;

const matchText = (value: string, query: string) =>
  value.toLowerCase().includes(query);

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, " ");

const compactText = (value: unknown) => {
  if (typeof value !== "string") return "";
  return stripHtml(value).replace(/\s+/g, " ").trim().toLowerCase();
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string; category?: string; task?: string; master?: string }>;
}) {
  const resolved = (await searchParams) || {};
  const query = (resolved.q || "").trim();
  const normalized = query.toLowerCase();
  const category = (resolved.category || "").trim().toLowerCase();
  const task = (resolved.task || "").trim().toLowerCase();
  const useMaster = resolved.master !== "0";
  const feed = await fetchSiteFeed(
    useMaster ? 1000 : 300,
    useMaster
      ? { fresh: true, category: category || undefined, task: task || undefined }
      : undefined
  );
  const posts =
    feed?.posts?.length
      ? feed.posts
      : useMaster
        ? []
        : SITE_CONFIG.tasks.flatMap((task) => getMockPostsForTask(task.key));

  const filtered = posts.filter((post) => {
    const content = post.content && typeof post.content === "object" ? post.content : {};
    const typeText = compactText((content as any).type);
    if (typeText === "comment") return false;
    const description = compactText((content as any).description);
    const body = compactText((content as any).body);
    const excerpt = compactText((content as any).excerpt);
    const categoryText = compactText((content as any).category);
    const tags = Array.isArray(post.tags) ? post.tags.join(" ") : "";
    const tagsText = compactText(tags);
    const derivedCategory = categoryText || tagsText;
    if (category && !derivedCategory.includes(category)) return false;
    if (task && typeText && typeText !== task) return false;
    if (!normalized.length) return true;
    return (
      matchText(compactText(post.title || ""), normalized) ||
      matchText(compactText(post.summary || ""), normalized) ||
      matchText(description, normalized) ||
      matchText(body, normalized) ||
      matchText(excerpt, normalized) ||
      matchText(tagsText, normalized)
    );
  });

  const results = normalized.length > 0 ? filtered : filtered.slice(0, 24);

  return (
    <PageShell
      title="Browse"
      description={
        query
          ? `Results for "${query}"`
          : "Use one search box for deals and gallery posts."
      }
      actions={
        <form action="/search" className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
          <input type="hidden" name="master" value="1" />
          {category ? <input type="hidden" name="category" value={category} /> : null}
          {task ? <input type="hidden" name="task" value={task} /> : null}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              name="q"
              defaultValue={query}
              placeholder="Search classifieds and gallery…"
              className="h-11 pl-9"
            />
          </div>
          <Button type="submit" className="h-11 rounded-full bg-[#1B4332] text-white hover:bg-[#2d5a47]">
            Search
          </Button>
        </form>
      }
    >
      <div className="mb-8 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[2rem] border border-[#c5ddd4] bg-white p-6 shadow-[0_18px_52px_rgba(15,42,35,0.08)]">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#3d5a52]">Quick lanes</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link href="/classifieds" className="inline-flex items-center rounded-full border border-[#1B4332]/18 bg-[#e8f2ed] px-4 py-2 text-sm font-semibold text-[#1B4332] hover:bg-[#dff0e9]">
              Browse classifieds
            </Link>
            <Link href="/images" className="inline-flex items-center rounded-full border border-[#1B4332]/18 bg-[#e8f2ed] px-4 py-2 text-sm font-semibold text-[#1B4332] hover:bg-[#dff0e9]">
              Open gallery
            </Link>
            <Link href="/create/classified" className="inline-flex items-center rounded-full border border-[#1B4332]/18 bg-white px-4 py-2 text-sm font-semibold text-[#1B4332] hover:bg-[#e8f2ed]">
              Post an ad
            </Link>
            <Link href="/create/image" className="inline-flex items-center rounded-full border border-[#1B4332]/18 bg-white px-4 py-2 text-sm font-semibold text-[#1B4332] hover:bg-[#e8f2ed]">
              Upload a post
            </Link>
          </div>
        </div>
        <div className="rounded-[2rem] border border-[#c5ddd4] bg-white p-6 shadow-[0_18px_52px_rgba(15,42,35,0.08)]">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#3d5a52]">Search tips</p>
          <ul className="mt-4 space-y-2 text-sm text-[#3d5a52]">
            <li>Try category words: “camera”, “apartment”, “bike”, “job”.</li>
            <li>Use location text when present: “downtown”, “north side”.</li>
            <li>Short queries work best for scanning: 1–3 keywords.</li>
          </ul>
        </div>
      </div>

      {results.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((post) => {
            const task = getPostTaskKey(post);
            const href = task ? buildPostUrl(task, post.slug) : `/posts/${post.slug}`;
            return <TaskPostCard key={post.id} post={post} href={href} />;
          })}
        </div>
      ) : (
        <div className="rounded-[2rem] border border-dashed border-[#c5ddd4] bg-white p-10 text-center text-[#3d5a52]">
          No matching posts yet. Try browsing <Link className="font-semibold text-[#1B4332] hover:underline" href="/classifieds">Classifieds</Link> or the <Link className="font-semibold text-[#1B4332] hover:underline" href="/images">Gallery</Link>.
        </div>
      )}
    </PageShell>
  );
}
