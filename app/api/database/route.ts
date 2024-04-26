import { openai } from "@/utils/openai";
import { supabaseClient } from "@/utils/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();

    for (const document of text) {
      const input = document.replace(/\n/g, " ");
      const embeddingResponse = await openai.embeddings.create({
        model: "text-embedding-ada-002",
        input,
      });

      const [{ embedding }] = embeddingResponse.data;

      const { error } = await supabaseClient.from("documents").insert({
        content: document,
        embedding: embedding as any,
      });
      if (error) {
        return NextResponse.json({ message: "error" }, { status: 500 });
      }
    }
    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}
