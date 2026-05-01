'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '@/components/ui/command'
import { useToast } from '@/components/ui/use-toast'
import type { LucideIcon } from 'lucide-react'
import { FileText, Plus, Tag, Settings, Search, Building2, LayoutGrid, Image as ImageIcon, User } from 'lucide-react'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'

const taskIcons: Record<TaskKey, LucideIcon> = {
  article: FileText,
  listing: Building2,
  sbm: LayoutGrid,
  classified: Tag,
  image: ImageIcon,
  profile: User,
  social: LayoutGrid,
  pdf: FileText,
  org: Building2,
  comment: FileText,
}

const createLabels: Partial<Record<TaskKey, string>> = {
  classified: 'Post a classified ad',
  image: 'Upload a gallery post',
}

export function CommandPalette() {
  const router = useRouter()
  const { toast } = useToast()
  const [open, setOpen] = useState(false)

  const { quickLinks, createActions } = useMemo(() => {
    const enabled = SITE_CONFIG.tasks.filter((t) => t.enabled)
    const quickLinks = [
      ...enabled.map((task) => ({
        label: `Go to ${task.label}`,
        href: task.route,
        icon: taskIcons[task.key] || LayoutGrid,
      })),
      { label: 'Go to Settings', href: '/settings', icon: Settings },
    ]
    const createActions = enabled.map((task) => ({
      label: createLabels[task.key] || `Create ${task.label}`,
      href: `/create/${task.key}`,
      icon: Plus,
    }))
    return { quickLinks, createActions }
  }, [])

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setOpen((prev) => !prev)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <CommandDialog open={open} onOpenChange={setOpen} title="Command Palette" description="Search for a command to run...">
      <CommandInput placeholder="Search classifieds, gallery, settings…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigate">
          {quickLinks.map((item) => (
            <CommandItem
              key={item.href}
              onSelect={() => {
                router.push(item.href)
                setOpen(false)
              }}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Create">
          {createActions.map((item) => (
            <CommandItem
              key={item.href}
              onSelect={() => {
                router.push(item.href)
                setOpen(false)
              }}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Quick">
          <CommandItem
            onSelect={() => {
              toast({ title: 'Search opened', description: 'Search classifieds and gallery posts.' })
              router.push('/search')
              setOpen(false)
            }}
          >
            <Search className="mr-2 h-4 w-4" />
            Open Search
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
