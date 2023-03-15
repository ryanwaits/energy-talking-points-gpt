'use client';

import React from 'react';
import Link from 'next/link';

import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';
import { Button } from '@/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/ui/dropdown-menu';
import { ScrollArea } from '@/ui/scroll-area';

export function MobileNav() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='-ml-4 text-base hover:bg-transparent focus:ring-0  focus:ring-offset-0 md:hidden'
        >
          <Icons.logo className='mr-2 h-4 w-4' />{' '}
          <span className='font-bold'>Menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='start'
        sideOffset={24}
        alignOffset={4}
        className='w-[300px] overflow-scroll'
      >
        <DropdownMenuItem asChild>
          <Link href='/' className='flex items-center'>
            <Icons.logo className='mr-2 h-4 w-4' /> {siteConfig.name}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <ScrollArea className='h-[400px]'>
          <DropdownMenuItem asChild>
            <Link href='#'>Link</Link>
          </DropdownMenuItem>
          <DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Menu Label</DropdownMenuLabel>
            <DropdownMenuSeparator className='-mx-2' />
            <DropdownMenuItem asChild>Title</DropdownMenuItem>
          </DropdownMenuGroup>
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
