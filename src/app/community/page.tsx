import Link from "next/link";
import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { buildTaskMetadata } from "@/lib/seo";
import { Camera, MessageCircle, ShieldCheck, Tag, Users } from "lucide-react";

export const revalidate = 3;
export const generateMetadata = () => buildTaskMetadata("social");

const pillars = [
  {
    icon: Tag,
    title: "Buy & sell without noise",
    body: "Classified posts stay price-forward and scannable—less fluff, clearer metadata, faster decisions.",
  },
  {
    icon: Camera,
    title: "Gallery lane for visuals",
    body: "Upload shots, moodboards, and visual stories with big thumbnails and light chrome around the media.",
  },
  {
    icon: ShieldCheck,
    title: "Trust and reporting",
    body: "Simple report paths and clear expectations keep both lanes usable for everyone.",
  },
];

const guidelines = [
  { title: "Be specific", body: "Include price, condition, and location. One clear photo beats ten blurry ones." },
  { title: "Keep it local", body: "If it's a meetup or pickup, confirm a public place and a clear time window." },
  { title: "No spam", body: "Repeated posts and misleading titles get removed fast." },
  { title: "Respect privacy", body: "No personal info screenshots, doxxing, or harassment." },
];

export default function CommunityPage() {
  return (
    <PageShell
      title="Community"
      description="A lightweight community hub for classifieds + gallery posting."
      actions={
        <div className="flex flex-wrap gap-2">
          <Button asChild className="rounded-full bg-[#1B4332] text-white hover:bg-[#2d5a47]">
            <Link href="/create/classified">Post an ad</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full border-[#c5ddd4] bg-white text-[#1B4332] hover:bg-[#e8f2ed]">
            <Link href="/create/image">Upload a post</Link>
          </Button>
        </div>
      }
    >
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="grid gap-4 sm:grid-cols-2">
          {pillars.map((p) => (
            <Card key={p.title} className="sm:col-span-1">
              <CardContent className="p-6">
                <p.icon className="h-5 w-5 text-[#1B4332]" />
                <h2 className="mt-4 text-lg font-semibold text-[#0f241f]">{p.title}</h2>
                <p className="mt-2 text-sm leading-7 text-[#3d5a52]">{p.body}</p>
              </CardContent>
            </Card>
          ))}
          <Card className="sm:col-span-2">
            <CardContent className="p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#3d5a52]">Join the flow</p>
                  <h3 className="mt-2 text-xl font-semibold text-[#0f241f]">Browse live posts, then contribute.</h3>
                </div>
                <Badge variant="secondary" className="rounded-full px-3 py-1">
                  <Users className="mr-2 h-4 w-4" />
                  Community guidelines
                </Badge>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link href="/classifieds" className="rounded-full border border-[#c5ddd4] bg-white px-4 py-2 text-sm font-semibold text-[#1B4332] hover:bg-[#e8f2ed]">
                  Browse classifieds
                </Link>
                <Link href="/images" className="rounded-full border border-[#c5ddd4] bg-white px-4 py-2 text-sm font-semibold text-[#1B4332] hover:bg-[#e8f2ed]">
                  Open gallery
                </Link>
                <Link href="/help" className="rounded-full border border-[#c5ddd4] bg-white px-4 py-2 text-sm font-semibold text-[#1B4332] hover:bg-[#e8f2ed]">
                  Help Center
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-lg font-semibold text-[#0f241f]">Guidelines</h3>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#e8f2ed] px-3 py-1 text-xs font-semibold text-[#1B4332]">
                <MessageCircle className="h-3.5 w-3.5" />
                Keep it clean
              </span>
            </div>
            <div className="mt-4 grid gap-3">
              {guidelines.map((g) => (
                <div key={g.title} className="rounded-[1.2rem] border border-[#c5ddd4] bg-white p-4">
                  <p className="text-sm font-semibold text-[#0f241f]">{g.title}</p>
                  <p className="mt-1 text-sm leading-7 text-[#3d5a52]">{g.body}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}
