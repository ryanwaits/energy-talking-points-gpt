import { ClassValue, clsx } from 'clsx';
import MarkdownIt from 'markdown-it';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatList(text) {
  const regex = /((\d+|[Qq]\d+)[.,:;-]?\s?)/g;
  const matches = text.match(regex);

  // If there are no matches, return the original string
  if (!matches) {
    return text;
  }

  const formattedText = matches
    .map((match, index) => {
      const item = text.split(regex)[index * 2 + 1];
      return `${match.trim()} ${item.trim()}`;
    })
    .join('\n\n');
  return formattedText;
}

export const md = new MarkdownIt();
