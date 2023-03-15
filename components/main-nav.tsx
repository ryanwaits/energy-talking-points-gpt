'use client';

import React from 'react';
import Link from 'next/link';

import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/ui/navigation-menu';

export function MainNav() {
  return (
    <div className='hidden md:flex'>
      <Link href='/' className='mr-6 flex items-center space-x-2'>
        <Icons.logo className='h-6 w-6' />
        <span className='hidden font-bold sm:inline-block'>
          {siteConfig.name}
        </span>
      </Link>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link>
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <Link href={href} passHref legacyBehavior {...props}>
        <NavigationMenuLink
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-neutral-100 focus:bg-neutral-100 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700',
            className
          )}
        >
          <div className='text-sm font-medium leading-none'>{title}</div>
          <p className='text-sm leading-snug text-neutral-500 line-clamp-2 dark:text-neutral-400'>
            {children}
          </p>
        </NavigationMenuLink>
      </Link>
    </li>
  );
});
ListItem.displayName = 'ListItem';
