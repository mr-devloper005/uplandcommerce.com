import Link from 'next/link'
import { ArrowRight, Globe, Mail, MapPin, Phone, ShieldCheck, Tag } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { TaskPostCard } from '@/components/shared/task-post-card'
import { TaskImageCarousel } from '@/components/tasks/task-image-carousel'
import { RichContent, formatRichHtml } from '@/components/shared/rich-content'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'

export function DirectoryTaskDetailPage({
  task,
  taskLabel,
  taskRoute,
  post,
  description,
  category,
  images,
  mapEmbedUrl,
  related,
}: {
  task: TaskKey
  taskLabel: string
  taskRoute: string
  post: SitePost
  description: string
  category: string
  images: string[]
  mapEmbedUrl: string | null
  related: SitePost[]
}) {
  const content = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const location = typeof content.address === 'string' ? content.address : typeof content.location === 'string' ? content.location : ''
  const website = typeof content.website === 'string' ? content.website : ''
  const phone = typeof content.phone === 'string' ? content.phone : ''
  const email = typeof content.email === 'string' ? content.email : ''
  const highlights = Array.isArray(content.highlights) ? content.highlights.filter((item): item is string => typeof item === 'string') : []
  const isClassified = task === 'classified'
  const descriptionHtml = formatRichHtml(description || '', 'Details coming soon.')
  const schemaPayload = {
    '@context': 'https://schema.org',
    '@type': task === 'profile' ? 'Organization' : 'LocalBusiness',
    name: post.title,
    description,
    image: images[0],
    url: `${taskRoute}/${post.slug}`,
    address: location || undefined,
    telephone: phone || undefined,
    email: email || undefined,
  }

  if (isClassified) {
    return (
      <div className="min-h-screen bg-[#f6faf8] text-[#132722]">
        <SchemaJsonLd data={schemaPayload} />
        <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <Link href={taskRoute} className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#3d5a52] hover:text-[#132722]">
            ← Back to {taskLabel}
          </Link>

          <section className="overflow-hidden rounded-[1.4rem] border border-[#c5ddd4] bg-[#ffffff] shadow-[0_24px_70px_rgba(148,84,33,0.16)]">
            <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
              <div className="flex min-h-[560px] items-center justify-center border-b border-[#c5ddd4] bg-[#e8f2ed] lg:border-b-0 lg:border-r">
                <div className="w-full max-w-4xl p-4">
                  <TaskImageCarousel images={images} />
                </div>
              </div>

              <div className="max-h-[46rem] overflow-y-auto p-6 sm:p-7">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center rounded-full border border-[#c5ddd4] bg-[#e8f2ed] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#3d5a52]">
                    {category || taskLabel}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#0ea5a4] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#062b2b]">
                    <ShieldCheck className="h-3.5 w-3.5" /> Verified
                  </span>
                </div>

                <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.04em] text-[#132722]">{post.title}</h1>

                <div className="mt-6 grid gap-3">
                  {location ? <div className="flex items-center gap-3 rounded-xl border border-[#c5ddd4] bg-[#e8f2ed] px-4 py-3 text-sm text-[#3d5a52]"><MapPin className="h-4 w-4" /> {location}</div> : null}
                  {phone ? <div className="flex items-center gap-3 rounded-xl border border-[#c5ddd4] bg-[#e8f2ed] px-4 py-3 text-sm text-[#3d5a52]"><Phone className="h-4 w-4" /> {phone}</div> : null}
                  {email ? <div className="flex items-center gap-3 rounded-xl border border-[#c5ddd4] bg-[#e8f2ed] px-4 py-3 text-sm text-[#3d5a52]"><Mail className="h-4 w-4" /> {email}</div> : null}
                  {website ? <div className="flex items-center gap-3 rounded-xl border border-[#c5ddd4] bg-[#e8f2ed] px-4 py-3 text-sm text-[#3d5a52]"><Globe className="h-4 w-4" /> {website}</div> : null}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  {website ? <a href={website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#0ea5a4] px-5 py-3 text-sm font-semibold text-[#062b2b] hover:bg-[#14b8a6]">Visit website <ArrowRight className="h-4 w-4" /></a> : null}
                  <Link href={taskRoute} className="inline-flex items-center gap-2 rounded-full border border-[#c5ddd4] bg-[#e8f2ed] px-5 py-3 text-sm font-semibold text-[#1B4332] hover:bg-[#ffe9d8]">Browse more</Link>
                </div>

                <div className="mt-7 border-t border-[#c5ddd4] pt-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#3d5a52]">About this classified</p>
                  <RichContent html={descriptionHtml} className="mt-3 text-sm leading-8 text-[#3d5a52]" />
                  {highlights.length ? (
                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      {highlights.slice(0, 4).map((item) => (
                        <div key={item} className="rounded-xl border border-[#c5ddd4] bg-[#e8f2ed] px-4 py-3 text-sm text-[#3d5a52]">
                          {item}
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </section>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1fr]">
            {mapEmbedUrl ? (
              <div className="overflow-hidden rounded-[1.2rem] border border-[#c5ddd4] bg-[#ffffff] shadow-[0_20px_60px_rgba(148,84,33,0.14)]">
                <div className="border-b border-[#c5ddd4] px-6 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#3d5a52]">Location</p>
                </div>
                <iframe src={mapEmbedUrl} title={`${post.title} map`} className="h-[320px] w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
            ) : <div />}

            <div className="rounded-[1.2rem] border border-[#c5ddd4] bg-[#ffffff] p-6 shadow-[0_20px_60px_rgba(148,84,33,0.14)]">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#3d5a52]">Quick trust cues</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {['Clear contact & price cues', 'Photo-forward presentation', 'Map when location matters', 'Related picks nearby'].map((item) => (
                  <div key={item} className="rounded-xl border border-[#c5ddd4] bg-[#e8f2ed] px-4 py-4 text-sm text-[#3d5a52]">{item}</div>
                ))}
              </div>
            </div>
          </div>

          {related.length ? (
            <section className="mt-14">
              <div className="flex items-end justify-between gap-4 border-b border-[#c5ddd4] pb-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#3d5a52]">Related picks</p>
                  <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#132722]">Keep browsing nearby matches.</h2>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full border border-[#c5ddd4] bg-[#e8f2ed] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#1B4332]">
                  <Tag className="h-3.5 w-3.5" /> {taskLabel}
                </span>
              </div>
              <div className="mt-8 grid gap-6 lg:grid-cols-3">
                {related.map((item) => (
                  <TaskPostCard key={item.id} post={item} href={`${taskRoute}/${item.slug}`} taskKey={task} />
                ))}
              </div>
            </section>
          ) : null}
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f6faf8] text-[#132722]">
      <SchemaJsonLd data={schemaPayload} />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Link href={taskRoute} className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#3d5a52] hover:text-[#0f241f]">
          ← Back to {taskLabel}
        </Link>

        <section className={`grid gap-8 lg:items-start ${isClassified ? 'lg:grid-cols-[1.08fr_0.92fr]' : 'lg:grid-cols-[1.02fr_0.98fr]'}`}>
          <div>
            <div className={`overflow-hidden border bg-white shadow-[0_24px_70px_rgba(15,42,35,0.1)] ${isClassified ? 'rounded-[1.2rem] border-[#d6dce5]' : 'rounded-[2.2rem] border-[#c5ddd4]'}`}>
              <div className={`relative h-[420px] overflow-hidden ${isClassified ? 'bg-[#eff3f8]' : 'bg-[#e8f2ed]'}`}>
                <ContentImage src={images[0]} alt={post.title} fill className="object-cover" />
              </div>
              {images.length > 1 ? (
                <div className="grid grid-cols-4 gap-3 p-4">
                  {images.slice(1, 5).map((image) => (
                    <div key={image} className={`relative h-24 overflow-hidden rounded-2xl border ${isClassified ? 'border-[#d6dce5] bg-[#eff3f8]' : 'border-[#c5ddd4] bg-[#e8f2ed]'}`}>
                      <ContentImage src={image} alt={post.title} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              ) : null}
            </div>

            <div className={`mt-8 border bg-white p-7 shadow-[0_20px_60px_rgba(15,42,35,0.09)] ${isClassified ? 'rounded-[1.2rem] border-[#d6dce5]' : 'rounded-[2rem] border-[#c5ddd4]'}`}>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#3d5a52]">About this {task}</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#0f241f]">Everything you need to decide—price, place, and proof.</h2>
              <RichContent html={descriptionHtml} className="mt-4 text-sm leading-8 text-[#3d5a52]" />
              {highlights.length ? (
                <div className="mt-6 grid gap-3 md:grid-cols-2">
                  {highlights.slice(0, 4).map((item) => (
                    <div key={item} className={`rounded-[1.4rem] border px-4 py-4 text-sm text-[#3d5a52] ${isClassified ? 'border-[#d6dce5] bg-[#f3f6fb]' : 'border-[#c5ddd4] bg-[#e8f2ed]'}`}>
                      {item}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          <div className="space-y-6">
            <div className={`border bg-white p-7 shadow-[0_24px_60px_rgba(15,42,35,0.1)] ${isClassified ? 'rounded-[1.2rem] border-[#d6dce5]' : 'rounded-[2rem] border-[#c5ddd4]'}`}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#3d5a52]">{category || taskLabel}</p>
                  <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-[#0f241f]">{post.title}</h1>
                </div>
                <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white ${isClassified ? 'bg-[#334155]' : 'bg-[#1B4332]'}`}>
                  <ShieldCheck className="h-3.5 w-3.5" /> Verified
                </span>
              </div>

              <div className="mt-6 grid gap-3">
                {location ? <div className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm text-[#3d5a52] ${isClassified ? 'border-[#d6dce5] bg-[#f3f6fb]' : 'border-[#c5ddd4] bg-[#e8f2ed]'}`}><MapPin className="h-4 w-4" /> {location}</div> : null}
                {phone ? <div className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm text-[#3d5a52] ${isClassified ? 'border-[#d6dce5] bg-[#f3f6fb]' : 'border-[#c5ddd4] bg-[#e8f2ed]'}`}><Phone className="h-4 w-4" /> {phone}</div> : null}
                {email ? <div className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm text-[#3d5a52] ${isClassified ? 'border-[#d6dce5] bg-[#f3f6fb]' : 'border-[#c5ddd4] bg-[#e8f2ed]'}`}><Mail className="h-4 w-4" /> {email}</div> : null}
                {website ? <div className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm text-[#3d5a52] ${isClassified ? 'border-[#d6dce5] bg-[#f3f6fb]' : 'border-[#c5ddd4] bg-[#e8f2ed]'}`}><Globe className="h-4 w-4" /> {website}</div> : null}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {website ? <a href={website} target="_blank" rel="noreferrer" className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white ${isClassified ? 'bg-[#334155] hover:bg-[#475569]' : 'bg-[#1B4332] hover:bg-[#2d5a47]'}`}>Visit website <ArrowRight className="h-4 w-4" /></a> : null}
                <Link href={taskRoute} className={`inline-flex items-center gap-2 rounded-full border bg-white px-5 py-3 text-sm font-semibold ${isClassified ? 'border-[#d6dce5] text-[#334155] hover:bg-[#f3f6fb]' : 'border-[#c5ddd4] text-[#1B4332] hover:bg-[#e8f2ed]'}`}>Browse more</Link>
              </div>
            </div>

            {mapEmbedUrl ? (
              <div className={`overflow-hidden border bg-white shadow-[0_24px_60px_rgba(15,42,35,0.1)] ${isClassified ? 'rounded-[1.2rem] border-[#d6dce5]' : 'rounded-[2rem] border-[#c5ddd4]'}`}>
                <div className={`border-b px-6 py-4 ${isClassified ? 'border-[#d6dce5]' : 'border-[#c5ddd4]'}`}>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#3d5a52]">Location</p>
                </div>
                <iframe src={mapEmbedUrl} title={`${post.title} map`} className="h-[320px] w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
            ) : null}

            <div className={`border bg-white p-6 shadow-[0_24px_60px_rgba(15,42,35,0.1)] ${isClassified ? 'rounded-[1.2rem] border-[#d6dce5]' : 'rounded-[2rem] border-[#c5ddd4]'}`}>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#3d5a52]">Quick trust cues</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {['Clear contact & price cues', 'Photo-forward presentation', 'Map when location matters', 'Related picks nearby'].map((item) => (
                  <div key={item} className={`rounded-[1.3rem] border px-4 py-4 text-sm text-[#3d5a52] ${isClassified ? 'border-[#d6dce5] bg-[#f3f6fb]' : 'border-[#c5ddd4] bg-[#e8f2ed]'}`}>{item}</div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {related.length ? (
          <section className="mt-14">
            <div className="flex items-end justify-between gap-4 border-b border-[#c5ddd4] pb-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#3d5a52]">Related picks</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#0f241f]">Keep browsing nearby matches.</h2>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#c5ddd4] bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#3d5a52]">
                <Tag className="h-3.5 w-3.5" /> {taskLabel}
              </span>
            </div>
            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {related.map((item) => (
                <TaskPostCard key={item.id} post={item} href={`${taskRoute}/${item.slug}`} taskKey={task} />
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </div>
  )
}

