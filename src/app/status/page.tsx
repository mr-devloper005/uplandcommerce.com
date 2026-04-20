import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, Clock, ShieldCheck } from 'lucide-react'

const services = [
  { name: 'Web App', status: 'Operational' },
  { name: 'API', status: 'Operational' },
  { name: 'Media CDN', status: 'Operational' },
]

const incidents = [
  { date: 'Mar 12, 2026', title: 'Delayed notifications', status: 'Resolved' },
  { date: 'Feb 22, 2026', title: 'Search indexing lag', status: 'Resolved' },
]

export default function StatusPage() {
  return (
    <PageShell
      title="System Status"
      description="Live health checks for classifieds, gallery uploads, and search."
    >
      <div className="space-y-6">
        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <Card>
            <CardContent className="p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#3d5a52]">Current state</p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#e8f2ed] px-4 py-2 text-sm font-semibold text-[#1B4332]">
                  <CheckCircle2 className="h-4 w-4" />
                  All systems operational
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-[#c5ddd4] bg-white px-4 py-2 text-sm font-semibold text-[#3d5a52]">
                  <Clock className="h-4 w-4" />
                  Updated just now
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-[#c5ddd4] bg-white px-4 py-2 text-sm font-semibold text-[#3d5a52]">
                  <ShieldCheck className="h-4 w-4" />
                  Incident playbooks active
                </span>
              </div>
              <p className="mt-4 text-sm leading-7 text-[#3d5a52]">
                This page tracks the surfaces that matter: browsing classifieds, loading gallery media, and search feed freshness.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#3d5a52]">What we monitor</p>
              <ul className="mt-4 space-y-2 text-sm text-[#3d5a52]">
                <li>Media upload + image delivery paths</li>
                <li>Search feed freshness and filtering</li>
                <li>Page rendering and cache revalidation</li>
                <li>Local save flows for drafts and posts</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {services.map((service) => (
            <Card key={service.name}>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-[#0f241f]">{service.name}</h2>
                <Badge className="mt-3" variant="secondary">{service.status}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-[#0f241f]">Incident History</h3>
            <div className="mt-4 space-y-3">
              {incidents.map((incident) => (
                <div key={incident.title} className="rounded-[1.2rem] border border-[#c5ddd4] bg-[#e8f2ed] px-4 py-3">
                  <div className="text-xs text-[#3d5a52]">{incident.date}</div>
                  <div className="text-sm font-medium text-[#0f241f]">{incident.title}</div>
                  <div className="text-xs text-[#3d5a52]">{incident.status}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  )
}
