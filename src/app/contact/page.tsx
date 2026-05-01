import { Building2, FileText, Image as ImageIcon, Mail, MapPin, Phone, Sparkles, Bookmark } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'
import { CONTACT_PAGE_OVERRIDE_ENABLED, ContactPageOverride } from '@/overrides/contact-page'

function getTone(kind: ReturnType<typeof getProductKind>) {
  if (kind === 'directory') {
    return {
      shell: 'bg-[#f6faf8] text-[#132722]',
      panel: 'border border-[#c5ddd4] bg-white shadow-[0_20px_50px_rgba(15,42,35,0.08)]',
      soft: 'border border-[#c5ddd4] bg-[#e8f2ed]',
      muted: 'text-[#3d5a52]',
      action: 'bg-[#1B4332] text-white hover:bg-[#2d5a47]',
    }
  }
  if (kind === 'editorial') {
    return {
      shell: 'bg-[#fbf6ee] text-[#241711]',
      panel: 'border border-[#dcc8b7] bg-[#fffdfa]',
      soft: 'border border-[#e6d6c8] bg-[#fff4e8]',
      muted: 'text-[#6e5547]',
      action: 'bg-[#241711] text-[#fff1e2] hover:bg-[#3a241b]',
    }
  }
  if (kind === 'visual') {
    return {
      shell: 'bg-[linear-gradient(180deg,#0f241f_0%,#1B4332_45%,#0f241f_100%)] text-white',
      panel: 'border border-white/12 bg-white/8 backdrop-blur-sm',
      soft: 'border border-white/12 bg-white/6 backdrop-blur-sm',
      muted: 'text-emerald-100/85',
      action: 'bg-[#5ee9b0] text-[#0a1f1a] hover:bg-[#4ad9a0]',
    }
  }
  return {
    shell: 'bg-[#f7f1ea] text-[#261811]',
    panel: 'border border-[#ddcdbd] bg-[#fffaf4]',
    soft: 'border border-[#e8dbce] bg-[#f3e8db]',
    muted: 'text-[#71574a]',
    action: 'bg-[#5b2b3b] text-[#fff0f5] hover:bg-[#74364b]',
  }
}

export default function ContactPage() {
  if (CONTACT_PAGE_OVERRIDE_ENABLED) {
    return <ContactPageOverride />
  }

  const rawEmails =
    process.env.CONTACT_EMAILS ||
    process.env.CONTACT_EMAIL ||
    process.env.NEXT_PUBLIC_CONTACT_EMAILS ||
    process.env.NEXT_PUBLIC_CONTACT_EMAIL ||
    ''
  const fallbackEmailDomain = process.env.NEXT_PUBLIC_SITE_DOMAIN?.trim() || ''
  const fallbackEmail = fallbackEmailDomain ? `support@${fallbackEmailDomain}` : ''
  const contactEmails = (rawEmails || fallbackEmail)
    .split(/[,;\n]/g)
    .map((value) => value.trim())
    .filter(Boolean)

  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)
  const tone = getTone(productKind)
  const lanes =
    productKind === 'directory'
      ? [
          { icon: Building2, title: 'Classifieds support', body: 'Help with posting ads, pricing, categories, and keeping your offers easy to scan.' },
          { icon: Phone, title: 'Gallery & media', body: 'Questions about uploads, image quality, or how gallery posts appear in the feed.' },
          { icon: MapPin, title: 'Local & trust', body: 'Coverage, verification cues, and keeping the marketplace useful for your area.' },
        ]
      : productKind === 'editorial'
        ? [
            { icon: FileText, title: 'Editorial submissions', body: 'Pitch essays, columns, and long-form ideas that fit the publication.' },
            { icon: Mail, title: 'Newsletter partnerships', body: 'Coordinate sponsorships, collaborations, and issue-level campaigns.' },
            { icon: Sparkles, title: 'Contributor support', body: 'Get help with voice, formatting, and publication workflow questions.' },
          ]
        : productKind === 'visual'
          ? [
              { icon: ImageIcon, title: 'Creator collaborations', body: 'Discuss gallery launches, creator features, and visual campaigns.' },
              { icon: Sparkles, title: 'Licensing and use', body: 'Reach out about usage rights, commercial requests, and visual partnerships.' },
              { icon: Mail, title: 'Media kits', body: 'Request creator decks, editorial support, or visual feature placement.' },
            ]
          : [
              { icon: Bookmark, title: 'Collection submissions', body: 'Suggest resources, boards, and links that deserve a place in the library.' },
              { icon: Mail, title: 'Resource partnerships', body: 'Coordinate curation projects, reference pages, and link programs.' },
              { icon: Sparkles, title: 'Curator support', body: 'Need help organizing shelves, collections, or profile-connected boards?' },
            ]

  return (
    <div className={`min-h-screen ${tone.shell}`}>
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">Contact {SITE_CONFIG.name}</p>
            <h1 className="mt-4 text-5xl font-semibold tracking-[-0.05em]">A support page that matches the product, not a generic contact form.</h1>
            <p className={`mt-5 max-w-2xl text-sm leading-8 ${tone.muted}`}>Tell us what you are trying to publish, fix, or launch. We will route it through the right lane instead of forcing every request into the same support bucket.</p>
            <div className="mt-8 space-y-4">
              {lanes.map((lane) => (
                <div key={lane.title} className={`rounded-[1.6rem] p-5 ${tone.soft}`}>
                  <lane.icon className="h-5 w-5" />
                  <h2 className="mt-3 text-xl font-semibold">{lane.title}</h2>
                  <p className={`mt-2 text-sm leading-7 ${tone.muted}`}>{lane.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={`rounded-[2rem] p-7 ${tone.panel}`}>
            <h2 className="text-2xl font-semibold">Send a message</h2>
            {contactEmails.length ? (
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${contactEmails[0]}`}
                  className={`inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-semibold ${tone.action}`}
                >
                  Email us
                </a>
                {contactEmails.slice(0, 3).map((email) => (
                  <a
                    key={email}
                    href={`mailto:${email}`}
                    className="inline-flex h-11 items-center justify-center rounded-full border border-current/15 bg-white/0 px-5 text-sm font-semibold"
                  >
                    {email}
                  </a>
                ))}
              </div>
            ) : null}
            <form className="mt-6 grid gap-4">
              <input className="h-12 rounded-xl border border-current/10 bg-transparent px-4 text-sm" placeholder="Your name" />
              <input className="h-12 rounded-xl border border-current/10 bg-transparent px-4 text-sm" placeholder="Email address" />
              <input className="h-12 rounded-xl border border-current/10 bg-transparent px-4 text-sm" placeholder="What do you need help with?" />
              <textarea className="min-h-[180px] rounded-2xl border border-current/10 bg-transparent px-4 py-3 text-sm" placeholder="Share the full context so we can respond with the right next step." />
              <button type="submit" className={`inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-semibold ${tone.action}`}>Send message</button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
