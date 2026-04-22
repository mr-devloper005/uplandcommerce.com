import Link from 'next/link'
import { Bookmark, Building2, FileText, Image as ImageIcon, Sparkles } from 'lucide-react'
import { RegisterForm } from '@/components/auth/register-form'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'
import { REGISTER_PAGE_OVERRIDE_ENABLED, RegisterPageOverride } from '@/overrides/register-page'

function getRegisterConfig(kind: ReturnType<typeof getProductKind>) {
  if (kind === 'directory') {
    return {
      shell: 'bg-[#f6faf8] text-[#132722]',
      panel: 'border border-[#c5ddd4] bg-white shadow-[0_20px_50px_rgba(15,42,35,0.08)]',
      side: 'border border-[#c5ddd4] bg-[#e8f2ed]',
      muted: 'text-[#3d5a52]',
      action: 'bg-[#1B4332] text-white hover:bg-[#2d5a47]',
      icon: Building2,
      title: 'Join to post classifieds & gallery work',
      body: 'One account for local deals and image posts. Your session stays on this device until you sign out.',
    }
  }
  if (kind === 'editorial') {
    return {
      shell: 'bg-[#fbf6ee] text-[#241711]',
      panel: 'border border-[#dcc8b7] bg-[#fffdfa]',
      side: 'border border-[#e6d6c8] bg-[#fff4e8]',
      muted: 'text-[#6e5547]',
      action: 'bg-[#241711] text-[#fff1e2] hover:bg-[#3a241b]',
      icon: FileText,
      title: 'Start your contributor workspace',
      body: 'Create a profile for essays, issue drafts, editorial review, and publication scheduling.',
    }
  }
  if (kind === 'visual') {
    return {
      shell: 'bg-[linear-gradient(180deg,#0f241f_0%,#1B4332_45%,#0f241f_100%)] text-white',
      panel: 'border border-white/12 bg-white/8 backdrop-blur-sm',
      side: 'border border-white/12 bg-white/6 backdrop-blur-sm',
      muted: 'text-emerald-100/85',
      action: 'bg-[#5ee9b0] text-[#0a1f1a] hover:bg-[#4ad9a0]',
      icon: ImageIcon,
      title: 'Sign up to post gallery & classifieds',
      body: 'Forest green UI, mint CTAs, and a feed that stays visual-first—same local session behavior as sign-in.',
    }
  }
  return {
    shell: 'bg-[#f7f1ea] text-[#261811]',
    panel: 'border border-[#ddcdbd] bg-[#fffaf4]',
    side: 'border border-[#e8dbce] bg-[#f3e8db]',
    muted: 'text-[#71574a]',
    action: 'bg-[#5b2b3b] text-[#fff0f5] hover:bg-[#74364b]',
    icon: Bookmark,
    title: 'Create a curator account',
    body: 'Build shelves, save references, and connect collections to your profile without a generic feed setup.',
  }
}

export default function RegisterPage() {
  if (REGISTER_PAGE_OVERRIDE_ENABLED) {
    return <RegisterPageOverride />
  }

  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)
  const config = getRegisterConfig(productKind)
  const Icon = config.icon

  return (
    <div className={`min-h-screen ${config.shell}`}>
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <div className={`rounded-[2rem] p-8 ${config.side}`}>
            <Icon className="h-8 w-8" />
            <h1 className="mt-5 text-4xl font-semibold tracking-[-0.05em]">{config.title}</h1>
            <p className={`mt-5 text-sm leading-8 ${config.muted}`}>{config.body}</p>
            <div className="mt-8 grid gap-4">
              {['Forest green UI like premium marketplaces', 'Classified lane + gallery lane only', 'Local session—you stay signed in on this browser'].map((item) => (
                <div key={item} className="rounded-[1.5rem] border border-current/10 px-4 py-4 text-sm">{item}</div>
              ))}
            </div>
          </div>

          <div className={`rounded-[2rem] p-8 ${config.panel}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">Create account</p>
            <RegisterForm actionClassName={config.action} mutedClassName={config.muted} />
            <div className={`mt-6 flex items-center justify-between text-sm ${config.muted}`}>
              <span>Already have an account?</span>
              <Link href="/login" className="inline-flex items-center gap-2 font-semibold hover:underline">
                <Sparkles className="h-4 w-4" />
                Sign in
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
