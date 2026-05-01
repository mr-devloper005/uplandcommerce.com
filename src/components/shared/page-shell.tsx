'use client'

import type { ReactNode } from 'react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'

export function PageShell({
  title,
  description,
  actions,
  children,
}: {
  title: string
  description?: string
  actions?: ReactNode
  children?: ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#f6faf8] text-[#132722]">
      <NavbarShell />
      <main>
        <section className="border-b border-[#c5ddd4] bg-gradient-to-b from-white/95 to-[#eef6f2]/90 shadow-[inset_0_-1px_0_rgba(27,67,50,0.06)] backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="text-3xl font-semibold tracking-[-0.03em] text-[#0f241f] sm:text-4xl">{title}</h1>
                {description && (
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#3d5a52] sm:text-base">{description}</p>
                )}
              </div>
              {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          {children}
        </section>
      </main>
      <Footer />
    </div>
  )
}
