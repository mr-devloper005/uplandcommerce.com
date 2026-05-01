import { defineSiteTheme } from '@/config/site.theme.defaults'

export const SITE_THEME = defineSiteTheme({
  shell: 'market',
  hero: {
    variant: 'forest-market',
    eyebrow: 'Classifieds + gallery discovery',
  },
  home: {
    layout: 'market-catalog',
    primaryTask: 'classified',
    featuredTaskKeys: ['classified', 'image'],
  },
  navigation: {
    variant: 'compact',
  },
  footer: {
    variant: 'columns',
  },
  cards: {
    listing: 'listing-elevated',
    article: 'editorial-feature',
    image: 'catalog-grid',
    profile: 'studio-panel',
    classified: 'catalog-grid',
    pdf: 'catalog-grid',
    sbm: 'editorial-feature',
    social: 'studio-panel',
    org: 'catalog-grid',
    comment: 'editorial-feature',
  },
})
