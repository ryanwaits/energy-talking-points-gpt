import { ThemeProvider } from '@/providers/theme';
import { Inter, Raleway } from '@next/font/google';

import { cn } from '@/lib/utils';
import { SiteHeader } from '@/components/site-header';
import '@/styles/globals.css';

const raleway = Raleway({
  variable: '--display-font',
  subsets: ['latin'],
});

const inter = Inter({
  variable: '--body-font',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={cn(
          'font-sans h-screen bg-white text-neutral-900 antialiased dark:bg-neutral-900 dark:text-white',
          inter.variable,
          raleway.variable
        )}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
