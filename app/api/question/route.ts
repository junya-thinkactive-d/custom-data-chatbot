import { openai } from "@/utils/openai";
import { supabaseClient } from "@/utils/supabase";
import { OpenAIStream, StreamingTextResponse } from "ai";
import GPT3Tokenizer from "gpt3-tokenizer";
import { NextRequest, NextResponse } from "next/server";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

// export const corsHeaders = {
//   "Access-Control-Allow-Origin": "*",
//   "Access-Control-Allow-Headers":
//     "authorization, x-client-info, apikey, content-type",
// };

export async function POST(req: NextRequest) {
  // ask-customer-data logic
  if (req.method === "OPTIONS") {
    return NextResponse.json({ message: "ok" }, { status: 200 });
  }

  // req:(query:"Who is junya?")
  const { query } = await req.json();
  const input = query.replace(/\n/g, " ");

  // create an embedding for our question / input
  const embeddingResponse = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input,
  });

  const [{ embedding }] = embeddingResponse.data;

  // get the relevant documents to our question by using the match_documents
  const { data: documents, error } = await supabaseClient.rpc(
    "match_documents",
    {
      query_embedding: embedding as any,
      match_threshold: 0.73,
      match_count: 10,
    },
  );

  if (error) throw error;

  // loop through the relevant documents, format them for the chatgpt prompt
  // limit the token count to 1500

  const tokenizer = new GPT3Tokenizer({ type: "gpt3" });
  let tokenCount = 0;
  let contextText = "";

  for (let i = 0; i < documents.length; i++) {
    const document = documents[i];
    const content = document.content;
    const encoded = tokenizer.encode(content);
    tokenCount += encoded.text.length;

    if (tokenCount > 1500) {
      break;
    }

    contextText += `${content.trim()}---\n`;
  }

  // create promp (system statement, relevant documents, question)
  const prompt = [
    {
      role: "system",
      content: `
        You are a representative that is very helpful when it comes to taking about junya! Only ever answer truthfully and be as helpful as you can.
        Context sections:
        ${contextText}
      `,
    },
    { role: "user", content: `question: ${query}` },
  ] as ChatCompletionMessageParam[];

  // get response from text-davinci-003 model
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: prompt,
    stream: true,
  });

  const stream = OpenAIStream(completion);

  return new StreamingTextResponse(stream);

  // return the response from the model to our use through a Response
  // return NextResponse.json( text , { status: 200 });
}
