interface SiteConfig {
  name: string;
  description: string;
  links: {
    twitter: string;
    github: string;
  };
}

export const siteConfig: SiteConfig = {
  name: 'ryanwaits/ui',
  description: 'Nextjs 13 starter template using @shadcn/ui components.',
  links: {
    twitter: 'https://twitter.com/ryan_waits',
    github: 'https://github.com/ryanwaits/ui',
  },
};
