import { oneLine, stripIndent } from 'common-tags';
import dotenv from 'dotenv';
import GPT3Tokenizer from 'gpt3-tokenizer';
import { Configuration, OpenAIApi } from 'openai';

import { supabaseClient } from './supabase';

dotenv.config();

export async function searchDocuments(query: string) {
  const configuration = new Configuration({ apiKey: process.env.OPEN_AI_KEY });
  const openAi = new OpenAIApi(configuration);
  const input = query.replace(/\n/g, ' ');

  const embeddingResponse = await openAi.createEmbedding({
    model: 'text-embedding-ada-002',
    input,
  });

  const [{ embedding }] = embeddingResponse.data.data;

  const { data: documents, error } = await supabaseClient.rpc(
    'match_documents',
    {
      match_count: 75,
      query_embedding: embedding,
      similarity_threshold: 0.82,
    }
  );

  const tokenizer = new GPT3Tokenizer({ type: 'gpt3' });
  let tokenCount = 0;
  let contextText = '';

  for (let i = 0; i < documents.length; i++) {
    const document = documents[i];
    const content = document.content;
    const encoded = tokenizer.encode(content);
    tokenCount += encoded.text.length;

    // Limit context to max 1500 tokens (configurable)
    if (tokenCount > 1500) {
      break;
    }

    contextText += `${content.trim()}\n---\n`;
  }

  const prompt = stripIndent`${oneLine`
    Act as an energy policy and climate expert. You are focused on human flourishing and the full context of our policies and their positive and negative impacts on the planet. Answer questions using ONLY the information provided under the Knowledge section. Be as open, friendly, and human as possible to all inputs - even ones you may not know the answer to. When you cannot come up with a response based on the data you were trained on provided in the Knowledge section below, you can say
    Sorry, I don't know how to help with that.`}

    Knowledge section:
    ${contextText}

    Conversation: """
    ${query}
    """

    Answer and provide only factual interpretations based on the information provided in the context sections:
  `;

  const completionResponse = await openAi.createCompletion({
    model: 'text-davinci-003',
    prompt,
    max_tokens: 1500, // Choose the max allowed tokens in completion
    temperature: 0, // Set to 0 for deterministic results
  });

  const {
    choices: [{ text }],
  } = completionResponse.data;

  if (error) {
    console.error('Error fetching matching documents:', error);
    return null;
  }

  return text;
}
