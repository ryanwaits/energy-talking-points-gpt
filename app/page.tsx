import React from 'react';

import { SearchQuery } from '@/components/search-query';

export default async function Home() {
  return (
    <>
      <main className='flex h-full flex-col items-center justify-center p-3 md:p-6'>
        <div className='flex h-screen w-full text-gray-800 antialiased'>
          <div className='flex h-full w-full flex-row overflow-x-hidden'>
            <div className='flex h-full flex-auto flex-col space-y-6 p-3 md:p-6'>
              <div className='flex flex-col items-center gap-3'>
                <h1 className='mt-2 text-3xl font-black md:text-5xl'>
                  ChatETP
                </h1>
                <p className='mx-auto w-auto text-center text-sm md:text-lg'>
                  Explore Energy Talking Points through conversation, powered by
                  OpenAI.
                </p>
                <div className='flex gap-2'>
                  <a
                    href='https://energytalkingpoints.com/'
                    target='_blank'
                    className='font-inherit transition-background relative inline-flex h-10 flex-shrink-0 cursor-pointer items-center overflow-hidden rounded-md border-none bg-neutral-900 px-6 text-xs font-semibold text-white no-underline transition-shadow duration-200 hover:bg-neutral-800 hover:shadow-md md:px-8 md:text-sm'
                  >
                    Resources
                  </a>
                  <a
                    href='https://github.com/ryanwaits/energy-talking-points-gpt'
                    target='_blank'
                    className='font-inherit transition-background relative inline-flex h-10 flex-shrink-0 cursor-pointer items-center overflow-hidden rounded-md border-none bg-gradient-to-br from-white to-[#f0f0f0] px-6 text-xs font-semibold text-[#171717] no-underline shadow transition-shadow duration-200 hover:shadow-md md:px-8 md:text-sm'
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
