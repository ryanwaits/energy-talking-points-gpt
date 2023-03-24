'use client';

import { ThemeProvider as NextThemeProvider } from 'next-themes';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <NextThemeProvider defaultTheme='light'>{children}</NextThemeProvider>;
}
