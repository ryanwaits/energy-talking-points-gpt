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
          'font-sans h-screen overflow-hidden bg-white text-neutral-900 antialiased',
          inter.variable,
          raleway.variable
        )}
      >
        <ThemeProvider>
          <div className='flex items-center gap-x-6 bg-gray-900 py-2.5 px-6 sm:px-3.5 sm:before:flex-1'>
            <p className='text-sm leading-6 text-white'>
              <a href='#'>
                <svg
                  viewBox='0 0 2 2'
                  className='mx-2 inline h-0.5 w-0.5 fill-current'
                  aria-hidden='true'
                >
                  <circle cx={1} cy={1} r={1} />
                </svg>
                <strong className='font-semibold'>
                  Currently in Beta and may not always return information
                  reflected in source material
                </strong>
                <svg
                  viewBox='0 0 2 2'
                  className='mx-2 inline h-0.5 w-0.5 fill-current'
                  aria-hidden='true'
                >
                  <circle cx={1} cy={1} r={1} />
                </svg>
              </a>
            </p>
            <div className='flex flex-1 justify-end'></div>
          </div>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
