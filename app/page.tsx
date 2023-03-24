import React from 'react';

import { SearchQuery } from '@/components/search-query';

export default async function Home() {
  return (
    <>
      <main className='flex h-full flex-col items-center justify-center p-0 md:p-6'>
        <div className='flex h-screen w-full text-gray-800 antialiased'>
          <div className='flex h-full w-full flex-row overflow-x-hidden'>
            <div className='flex h-full flex-auto flex-col space-y-6 p-0 md:p-6'>
              <div className='flex flex-col items-center gap-3'>
                <h1 className='mt-2 text-4xl font-black sm:text-3xl'>
                  ChatETP
                </h1>
                <p className='text-md mx-auto w-auto text-center sm:text-sm'>
                  Explore Energy Talking Points through conversation, powered by
                  OpenAI.
                </p>
                <div className='flex gap-2'>
                  <a
                    href='https://energytalkingpoints.com/'
                    target='_blank'
                    className='font-inherit transition-background relative inline-flex h-10 flex-shrink-0 cursor-pointer items-center overflow-hidden rounded-md border-none bg-neutral-900 px-8 text-sm font-semibold text-white no-underline transition-shadow duration-200 hover:bg-neutral-800 hover:shadow-md sm:px-6 sm:text-xs'
                  >
                    Resources
                  </a>
                  <a
                    href='https://github.com/ryanwaits/energy-talking-points-gpt'
                    target='_blank'
                    className='font-inherit transition-background relative inline-flex h-10 flex-shrink-0 cursor-pointer items-center overflow-hidden rounded-md border-none bg-gradient-to-br from-white to-[#f0f0f0] px-8 text-sm font-semibold text-[#171717] no-underline shadow transition-shadow duration-200 hover:shadow-md sm:px-6 sm:text-xs'
                  >
                    Code
                  </a>
                </div>
              </div>
              <SearchQuery />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
