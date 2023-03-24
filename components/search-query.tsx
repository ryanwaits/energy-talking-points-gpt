'use client';

import React from 'react';
import Avatar from 'boring-avatars';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

import { cn, formatList, md } from '@/lib/utils';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';

interface Conversation {
  id: number;
  text: string;
  isUserMessage: boolean;
}

const initialState: Conversation[] = [
  {
    id: 1,
    text: 'Hello there! Feel free to kick us off with any energy or climate questions you have.',
    isUserMessage: false,
  },
];

const initialSuggestions = [
  'What exactly do 97% of climate scientists agree on?',
  'Are there any mainstream ideas that we should be challenging when it comes to energy and the climate?',
  'Is Nuclear energy as dangerous as we are told?',
];

async function getSuggestions(query: string) {
  const response = await fetch('/api/search-query', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  });

  if (response.ok) {
    const { completion } = await response.json();
    return completion;
  } else {
    const { error } = await response.json();
    console.error('Error searching documents:', error);
    return [];
  }
}

export function SearchQuery() {
  const controls = useAnimation();
  const scrollableContainerRef = React.useRef(null);
  const [conversation, setConversation] =
    React.useState<Conversation[]>(initialState);
  const [query, setQuery] = React.useState('');
  const [suggestions, setSuggestions] =
    React.useState<string[]>(initialSuggestions);

  async function search(query: string) {
    addMessage(query);
    setQuery('');
    const response = await fetch('/api/search-query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    if (response.ok) {
      const { completion } = await response.json();
      addMessage(completion, false);
      const suggestionPrompt = `In a consistent, numbered format (1. Q1, 2. Q2 3. Q3) Please generate 3 questions aimed at challenging, learning more, and/or moving the conversation forward based on the following response: ${completion}`;
      const data = await getSuggestions(suggestionPrompt);
      const suggestions = data.split(/\d+\.\s+/).slice(1);
      setSuggestions(suggestions);
    } else {
      const { error } = await response.json();
      console.error('Error searching documents:', error);
    }
  }

  function addMessage(text: string, isUserMessage = true) {
    setConversation((prevConversation) => [
      ...prevConversation,
      { id: prevConversation.length + 1, text, isUserMessage },
    ]);
  }

  React.useEffect(() => {
    if (scrollableContainerRef.current) {
      const messages = scrollableContainerRef.current;
      if (messages) {
        messages.scrollTo({ top: messages.scrollHeight, behavior: 'smooth' });
      }
    }
  }, [conversation]);

  return (
    <>
      <div className='flex flex-auto flex-shrink-0 flex-col space-y-6 rounded-2xl p-4'>
        <div
          className='flex h-[50%] flex-col overflow-x-auto overflow-y-auto'
          ref={scrollableContainerRef}
        >
          <div className='flex flex-col'>
            <div className='grid grid-cols-12 gap-y-2'>
              <AnimatePresence mode='popLayout' initial={false}>
                {conversation.map((convo) => (
                  <motion.div
                    key={convo.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{
                      default: { duration: 0.15 },
                      layout: {
                        type: 'spring',
                        bounce: 0.4,
                        duaration: 1,
                        // duration: animatingMessages.includes(conversation)
                        //   ? 0.15 * animatingMessages.indexOf(conversation) + 0.85
                        //   : 1,
                      },
                    }}
                    className={
                      convo.isUserMessage
                        ? 'message col-start-6 col-end-13 rounded-lg p-3'
                        : 'message col-start-1 col-end-8 rounded-lg p-3'
                    }
                  >
                    {convo.isUserMessage ? (
                      <div className='flex flex-row-reverse items-center justify-start'>
                        <div className='w-10'>
                          <Avatar
                            size={35}
                            name='human-flourishing'
                            variant='beam'
                            colors={['#3b82f6', '#2563eb', '#1d4ed8']}
                          />
                        </div>
                        <div className='relative mr-3 rounded-xl border border-[#f3f3f3] bg-white py-2 px-4 text-sm'>
                          <div>{convo.text}</div>
                        </div>
                      </div>
                    ) : (
                      <div className='flex flex-row items-center'>
                        <div className='flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-neutral-900 text-white'>
                          <MessageCircle size='18' />
                        </div>
                        <div className='relative ml-3 rounded-lg border border-[#f3f3f3] bg-[#fcfcfc] py-2 px-4 text-sm'>
                          <div>{convo.text}</div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
        <div className='flex h-16 w-full flex-row items-center rounded-xl bg-white'>
          <div className='flex-grow'>
            <div className='flex items-center'>
              <Input
                className='w-full border border-[#f3f3f3]'
                placeholder='Search'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    search(query);
                  }
                }}
              />
              <Button
                className='font-sans transition-border-color transition-background m-0 ml-2 cursor-pointer whitespace-nowrap rounded-md bg-neutral-900 px-3 py-2 text-sm font-semibold text-white transition-shadow duration-200 hover:bg-neutral-900/95'
                type='button'
                onClick={() => search(query)}
              >
                Send
              </Button>
            </div>
          </div>
        </div>
        <div className='grid h-20 grid-cols-3 gap-3 py-4'>
          {suggestions.map((suggestion, index) => (
            <motion.div
              key={suggestion}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className='relative h-full cursor-pointer rounded-lg border border-[#f3f3f3] bg-[#fcfcfc] py-2 px-4 text-sm hover:border-[#ededed] hover:bg-[#f8f8f8]'
              onClick={() => search(suggestion)}
            >
              <div>
                <p className='text-sm leading-5'>{suggestion}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}
