export const siteIdentity = {
  code: process.env.NEXT_PUBLIC_SITE_CODE || 'uc8q4m2x7v',
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'Upland Commerce',
  tagline: process.env.NEXT_PUBLIC_SITE_TAGLINE || 'Visual classified platform',
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    'A hybrid marketplace for image-first discoveries, quick deals, and classified-style publishing.',
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || 'uplandcommerce.com',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://uplandcommerce.com',
  ogImage: process.env.NEXT_PUBLIC_SITE_OG_IMAGE || '/og-default.png',
  googleMapsEmbedApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY || 'AIzaSyBco7dIECu3rJWjP3J0MImnR_uxlbeqAe0',

} as const

export const defaultAuthorProfile = {
  name: siteIdentity.name,
  avatar: '/placeholder.svg?height=80&width=80',
} as const

