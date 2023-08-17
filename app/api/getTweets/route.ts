import { NextResponse, NextRequest } from "next/server";

import { client } from "../../../client";
import { Tweet } from "@/typings";
import { groq } from "next-sanity";

// Pobiera wszystkie poprawne tweety sortujac je od najnowszego
const feedQuery = groq`*[_type == "tweet" && !blockTweet]{
  _id,
  ...,
} | order(_createdAt desc)`;

export async function GET(req: NextRequest, res: NextResponse) {
  const tweets: Tweet[] = await client.fetch(feedQuery);

  // ! Zamiast res.json
  return NextResponse.json({ tweets });
}
