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
  try {
    const tweets: Tweet[] = await client.fetch(feedQuery);
    return NextResponse.json({ tweets });
  } catch (error) {
    console.log(error);
    throw new Error("Could not get tweets from an api");
  }
}
