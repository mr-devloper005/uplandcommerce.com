import Link from 'next/link'
import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { mockFaqs } from '@/data/mock-data'
import { ArrowRight, Camera, ShieldCheck, Tag } from 'lucide-react'

const topics = [
  { title: 'Getting started', description: 'Create an account, stay signed in locally, and post your first item.' },
  { title: 'Classifieds', description: 'Pricing, categories, location fields, and posting safely.' },
  { title: 'Gallery', description: 'Upload tips, image order, and how posts show on the feed.' },
  { title: 'Trust & safety', description: 'Reporting, scams, and what gets removed (fast).' },
]

export default function HelpPage() {
  return (
    <PageShell
      title="Help Center"
      description="Fast answers for classifieds and gallery posting."
      actions={
        <Button asChild className="rounded-full bg-[#1B4332] text-white hover:bg-[#2d5a47]">
          <Link href="/contact">Contact Support</Link>
        </Button>
      }
    >
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="grid gap-6 md:grid-cols-2">
          {topics.map((topic) => (
            <Card key={topic.title} className="transition-transform hover:-translate-y-1">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-[#0f241f]">{topic.title}</h2>
                <p className="mt-2 text-sm text-[#3d5a52]">{topic.description}</p>
              </CardContent>
            </Card>
          ))}
          <Card className="md:col-span-2">
            <CardContent className="p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#3d5a52]">Quick links</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <Link href="/classifieds" className="group rounded-[1.4rem] border border-[#c5ddd4] bg-white p-5 hover:bg-[#e8f2ed]">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <Tag className="h-5 w-5 text-[#1B4332]" />
                      <span className="text-sm font-semibold text-[#0f241f]">Browse classifieds</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-[#3d5a52] transition-transform group-hover:translate-x-0.5" />
                  </div>
                  <p className="mt-2 text-sm text-[#3d5a52]">Scan deals fast, then drill into details.</p>
                </Link>
                <Link href="/images" className="group rounded-[1.4rem] border border-[#c5ddd4] bg-white p-5 hover:bg-[#e8f2ed]">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <Camera className="h-5 w-5 text-[#1B4332]" />
                      <span className="text-sm font-semibold text-[#0f241f]">Open gallery</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-[#3d5a52] transition-transform group-hover:translate-x-0.5" />
                  </div>
                  <p className="mt-2 text-sm text-[#3d5a52]">Visual posts with big thumbnails and light chrome.</p>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-lg font-semibold text-[#0f241f]">FAQ</h3>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#e8f2ed] px-3 py-1 text-xs font-semibold text-[#1B4332]">
                <ShieldCheck className="h-3.5 w-3.5" />
                Safety first
              </span>
            </div>
            <Accordion type="single" collapsible className="mt-4">
              {mockFaqs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  )
}
