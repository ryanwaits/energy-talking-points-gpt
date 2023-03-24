interface SiteConfig {
  name: string;
  description: string;
  links: {
    twitter: string;
    github: string;
  };
}

export const siteConfig: SiteConfig = {
  name: 'energy-talking-points-gpt',
  description:
    'AI Energy Talking Points: A web app using OpenAI embeddings and Supabase to chat with energy and climate content from EnergyTalkingPoints.com.',
  links: {
    twitter: 'https://twitter.com/ryan_waits',
    github: 'https://github.com/ryanwaits/energy-talking-points-gpt',
  },
};
