import { NextApiRequest, NextApiResponse } from 'next';

import { searchDocuments } from '@/lib/search-embeddings';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { query } = req.body;

    if (!query) {
      res.status(400).json({ error: 'Query is required.' });
      return;
    }

    try {
      const completion = await searchDocuments(query);
      res.status(200).json({ completion });
    } catch (error) {
      console.error('Error while searching documents:', error);
      res
        .status(500)
        .json({ error: 'An error occurred while searching documents.' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }
}
