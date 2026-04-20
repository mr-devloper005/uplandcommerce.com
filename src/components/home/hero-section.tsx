"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Camera, CheckCircle2, MapPin, Search, Sparkles, Tag, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContentImage } from "@/components/shared/content-image";
import { SITE_CONFIG, type TaskConfig } from "@/lib/site-config";
import { siteContent } from "@/config/site.content";
import { SITE_THEME } from "@/config/site.theme";

const FALLBACK_IMAGE = "/placeholder.svg?height=1400&width=2400";

/* ─── theme palette map (all variants kept) ─── */
const heroClasses = {
  'search-first': {
    section: 'border-b border-[#c5ddd4] bg-[linear-gradient(180deg,#e8f2ed_0%,#f6faf8_42%,#ffffff_100%)] text-[#132722]',
    overlay: 'bg-[radial-gradient(circle_at_top_left,rgba(94,233,176,0.14),transparent_28%),radial-gradient(circle_at_top_right,rgba(27,67,50,0.08),transparent_26%)]',
    grid: 'lg:grid-cols-[1.08fr_0.92fr]',
    card: 'border border-[#c5ddd4]/80 bg-white/90 shadow-[0_28px_90px_rgba(15,42,35,0.12)]',
    title: 'text-[#0f241f]',
    body: 'text-[#3d5a52]',
    badge: 'bg-[#1B4332] text-white',
    primary: 'bg-[#1B4332] text-white hover:bg-[#2d5a47]',
    secondary: 'border border-[#c5ddd4] bg-white text-[#1B4332] hover:bg-[#e8f2ed]',
    search: 'border border-[#c5ddd4] bg-white/95 shadow-[0_12px_36px_rgba(15,42,35,0.12)]',
    stat: 'border border-[#c5ddd4] bg-white/80',
    pill: 'border border-[#1B4332]/20 bg-white/80 text-[#1B4332] hover:bg-[#e8f2ed]',
    trust: 'text-[#3d5a52]',
    subText: 'text-[#3d5a52]',
  },
  'spotlight-split': {
    section: 'border-b border-[rgba(123,72,35,0.14)] bg-[linear-gradient(180deg,#1f1613_0%,#2d1d17_50%,#fff7ed_100%)] text-white',
    overlay: 'bg-[linear-gradient(90deg,rgba(20,12,9,0.88)_0%,rgba(32,19,14,0.66)_45%,rgba(255,247,237,0)_100%)]',
    grid: 'lg:grid-cols-[1.14fr_0.86fr]',
    card: 'border border-white/10 bg-white/8 shadow-[0_28px_100px_rgba(18,9,4,0.4)] backdrop-blur-md',
    title: 'text-white',
    body: 'text-amber-100/78',
    badge: 'bg-[#ffdd9c] text-[#2a160c]',
    primary: 'bg-[#ffdd9c] text-[#2a160c] hover:bg-[#ffd17d]',
    secondary: 'border border-white/18 bg-white/10 text-white hover:bg-white/16',
    search: 'border border-white/14 bg-white/10 backdrop-blur-md',
    stat: 'border border-white/12 bg-white/8',
    pill: 'border border-white/16 bg-white/10 text-white hover:bg-white/16',
    trust: 'text-amber-100/70',
    subText: 'text-amber-100/70',
  },
  'gallery-mosaic': {
    section: 'border-b border-slate-800 bg-[linear-gradient(180deg,#07111f_0%,#0c172b_45%,#101c31_100%)] text-white',
    overlay: 'bg-[radial-gradient(circle_at_top_left,rgba(110,231,183,0.16),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(99,102,241,0.16),transparent_26%)]',
    grid: 'lg:grid-cols-[0.95fr_1.05fr]',
    card: 'border border-white/10 bg-slate-900/65 shadow-[0_30px_110px_rgba(15,23,42,0.45)] backdrop-blur-xl',
    title: 'text-white',
    body: 'text-slate-300',
    badge: 'bg-[#8df0c8] text-[#07111f]',
    primary: 'bg-[#8df0c8] text-[#07111f] hover:bg-[#77dfb8]',
    secondary: 'border border-white/18 bg-white/6 text-white hover:bg-white/12',
    search: 'border border-white/12 bg-white/8 backdrop-blur-md',
    stat: 'border border-white/10 bg-white/6',
    pill: 'border border-white/14 bg-white/8 text-white hover:bg-white/14',
    trust: 'text-slate-400',
    subText: 'text-slate-300',
  },
  'catalog-promo': {
    section: 'border-b border-[rgba(66,74,42,0.14)] bg-[linear-gradient(180deg,#f6f6ee_0%,#f4f7df_35%,#ffffff_100%)] text-[#18210f]',
    overlay: 'bg-[radial-gradient(circle_at_top_right,rgba(163,230,53,0.16),transparent_22%),radial-gradient(circle_at_top_left,rgba(34,197,94,0.14),transparent_24%)]',
    grid: 'lg:grid-cols-[1.12fr_0.88fr]',
    card: 'border border-[#dce5c2] bg-white/90 shadow-[0_28px_80px_rgba(64,76,34,0.12)]',
    title: 'text-[#18210f]',
    body: 'text-[#5c684b]',
    badge: 'bg-[#18210f] text-[#ebf5d9]',
    primary: 'bg-[#18210f] text-[#ebf5d9] hover:bg-[#25331a]',
    secondary: 'border border-[#dce5c2] bg-white text-[#18210f] hover:bg-[#f4f7df]',
    search: 'border border-[#dce5c2] bg-white shadow-[0_12px_32px_rgba(64,76,34,0.1)]',
    stat: 'border border-[#dce5c2] bg-white/80',
    pill: 'border border-[#18210f]/16 bg-white text-[#18210f] hover:bg-[#f4f7df]',
    trust: 'text-[#5c684b]',
    subText: 'text-[#5c684b]',
  },
  'forest-market': {
    section: 'border-b border-[#0f2a24] bg-[linear-gradient(165deg,#1B4332_0%,#14332c_38%,#1B4332_100%)] text-white',
    overlay: 'bg-[radial-gradient(ellipse_80%_60%_at_20%_0%,rgba(94,233,176,0.14),transparent_50%),radial-gradient(circle_at_90%_10%,rgba(255,255,255,0.07),transparent_42%)]',
    grid: 'lg:grid-cols-[1.08fr_0.92fr]',
    card: 'border border-white/14 bg-white/10 shadow-[0_28px_80px_rgba(0,0,0,0.28)] backdrop-blur-md',
    title: 'text-white',
    body: 'text-emerald-50/88',
    badge: 'bg-[#5ee9b0] text-[#0a1f1a]',
    primary: 'bg-[#5ee9b0] text-[#0a1f1a] hover:bg-[#4ad9a0]',
    secondary: 'border border-white/22 bg-transparent text-white hover:bg-white/10',
    search: 'border border-white/16 bg-white/12 shadow-[0_12px_36px_rgba(0,0,0,0.3)] backdrop-blur-md',
    stat: 'border border-white/12 bg-white/8 backdrop-blur-sm',
    pill: 'border border-white/20 bg-white/10 text-white hover:bg-white/18',
    trust: 'text-emerald-100/65',
    subText: 'text-emerald-50/80',
  },
} as const;

const categories = [
  { label: "Electronics", href: "/classifieds?category=electronics" },
  { label: "Vehicles", href: "/classifieds?category=vehicles" },
  { label: "Housing", href: "/classifieds?category=housing" },
  { label: "Jobs", href: "/classifieds?category=jobs" },
  { label: "Services", href: "/classifieds?category=services" },
  { label: "All photos", href: "/images" },
];

const stats = [
  { icon: Tag, value: "50K+", label: "Active ads" },
  { icon: Camera, value: "120K+", label: "Gallery posts" },
  { icon: Users, value: "100K+", label: "Members" },
  { icon: TrendingUp, value: "2.4K", label: "Posted today" },
];

const trustPoints = [
  { icon: CheckCircle2, label: "Free to post" },
  { icon: MapPin, label: "Hyper-local" },
  { icon: CheckCircle2, label: "No hidden fees" },
];

export function HeroSection({ images, tasks }: { images: string[]; tasks: TaskConfig[] }) {
  const slides = useMemo(() => {
    const valid = images.filter(Boolean);
    return valid.length ? valid.slice(0, 5) : [FALLBACK_IMAGE];
  }, [images]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [searchValue, setSearchValue] = useState("");

  const featuredTasks = tasks
    .filter((task) => SITE_THEME.home.featuredTaskKeys.includes(task.key))
    .slice(0, 2);

  const palette = heroClasses[SITE_THEME.hero.variant];

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, [slides]);

  return (
    <section className={`relative overflow-hidden ${palette.section}`}>
      {/* Background image */}
      <div className="absolute inset-0">
        <ContentImage
          key={slides[activeIndex]}
          src={slides[activeIndex]}
          alt={`Featured visual ${activeIndex + 1} from ${SITE_CONFIG.name}`}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-25 transition-opacity duration-700"
          intrinsicWidth={1600}
          intrinsicHeight={900}
        />
      </div>
      <div className={`absolute inset-0 ${palette.overlay}`} />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── TOP SECTION ── */}
        <div className={`grid items-start gap-10 pt-14 lg:pt-20 ${palette.grid}`}>

          {/* LEFT: headline + search + categories + trust */}
          <div className="flex flex-col">

            {/* Eyebrow badge */}
            <div className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] ${palette.badge}`}>
              <Sparkles className="h-3.5 w-3.5" />
              {SITE_THEME.hero.eyebrow}
            </div>

            {/* Headline */}
            <h1 className={`mt-5 text-[2.6rem] font-bold leading-[1.12] tracking-[-0.055em] sm:text-[3.5rem] lg:text-[4rem] xl:text-[4.4rem] ${palette.title}`}>
              {siteContent.hero.title[0]}
              <span className={`block ${palette.body}`}>{siteContent.hero.title[1]}</span>
            </h1>
            <p className={`mt-4 max-w-xl text-base leading-8 sm:text-lg ${palette.body}`}>
              {siteContent.hero.description}
            </p>

            {/* ── Search bar ── */}
            <form
              action="/search"
              className={`mt-7 flex w-full max-w-2xl items-center gap-3 rounded-full px-4 py-2.5 ${palette.search}`}
            >
              <Search className="h-5 w-5 shrink-0 opacity-60" />
              <input
                name="q"
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder={siteContent.hero.searchPlaceholder}
                className="flex-1 bg-transparent text-sm outline-none placeholder:opacity-60"
              />
              <input type="hidden" name="master" value="1" />
              <Button
                type="submit"
                size="sm"
                className={`shrink-0 rounded-full px-5 text-sm font-semibold ${palette.primary}`}
              >
                Search
              </Button>
            </form>

            {/* Category pills */}
            <div className="mt-4 flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Link
                  key={cat.label}
                  href={cat.href}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${palette.pill}`}
                >
                  {cat.label}
                </Link>
              ))}
            </div>

            {/* CTA row */}
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild size="lg" className={`rounded-full px-7 ${palette.primary}`}>
                <Link href={siteContent.hero.primaryCta.href}>
                  {siteContent.hero.primaryCta.label}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className={`rounded-full px-7 ${palette.secondary}`}>
                <Link href={siteContent.hero.secondaryCta.href}>
                  {siteContent.hero.secondaryCta.label}
                </Link>
              </Button>
            </div>

            {/* Trust signals */}
            <div className={`mt-6 flex flex-wrap items-center gap-4 text-xs font-medium ${palette.trust}`}>
              {trustPoints.map((t) => (
                <span key={t.label} className="inline-flex items-center gap-1.5">
                  <t.icon className="h-3.5 w-3.5" />
                  {t.label}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT: image mosaic + lane cards */}
          <div className="hidden flex-col gap-4 lg:flex">

            {/* Mosaic grid */}
            <div className={`overflow-hidden rounded-[2rem] p-3.5 ${palette.card}`}>
              <div className="grid grid-cols-3 grid-rows-2 gap-2.5" style={{ height: 320 }}>
                {/* Large feature image */}
                <div className="relative col-span-2 row-span-2 overflow-hidden rounded-[1.5rem]">
                  <ContentImage
                    src={slides[activeIndex]}
                    alt={`Feature image ${activeIndex + 1}`}
                    fill
                    sizes="33vw"
                    className="object-cover transition-all duration-700"
                    intrinsicWidth={800}
                    intrinsicHeight={700}
                  />
                  <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
                    <Tag className="h-3 w-3" />
                    Featured
                  </div>
                </div>
                {/* Two small thumbnails */}
                {[1, 2].map((offset) => (
                  <div
                    key={offset}
                    className="relative overflow-hidden rounded-[1rem]"
                    style={{ minHeight: 0 }}
                  >
                    <ContentImage
                      src={slides[(activeIndex + offset) % slides.length] || FALLBACK_IMAGE}
                      alt={`Thumbnail ${offset}`}
                      fill
                      sizes="15vw"
                      className="object-cover"
                      intrinsicWidth={400}
                      intrinsicHeight={300}
                    />
                  </div>
                ))}
              </div>

              {/* Slide dots */}
              {slides.length > 1 && (
                <div className="mt-3 flex items-center justify-center gap-1.5">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActiveIndex(i)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        i === activeIndex
                          ? "w-7 bg-current opacity-80"
                          : "w-2 bg-current opacity-25"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Lane shortcut cards */}
            <div className="grid grid-cols-2 gap-3">
              {featuredTasks.map((task) => (
                <Link
                  key={task.key}
                  href={task.route}
                  className={`group flex flex-col justify-between rounded-[1.5rem] p-4 transition-all hover:-translate-y-0.5 ${palette.card}`}
                >
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.24em] opacity-60">
                      {task.key === "classified" ? "Deals" : "Visuals"}
                    </p>
                    <p className="mt-1.5 text-lg font-bold">{task.label}</p>
                    <p className="mt-1 text-xs leading-relaxed opacity-70">{task.description}</p>
                  </div>
                  <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold">
                    Open <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ── STATS STRIP ── */}
        <div className="mt-10 pb-10 lg:pb-14">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className={`flex items-center gap-3 rounded-[1.4rem] px-4 py-3.5 ${palette.stat}`}>
                <div className="rounded-full bg-current/10 p-2">
                  <s.icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-lg font-bold leading-none">{s.value}</p>
                  <p className={`mt-0.5 text-[11px] font-medium ${palette.subText}`}>{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
