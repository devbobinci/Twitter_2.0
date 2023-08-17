import { NextResponse, NextRequest } from "next/server";

import { client } from "../../../client";
import { Comment, TweetBody } from "@/typings";
import { groq } from "next-sanity";

export async function POST(req: NextRequest, res: NextResponse) {
  if (req.method !== "POST")
    return new Response(null, { status: 404, statusText: "Not found" });

  const data: TweetBody = await req.json();

  const mutations = {
    mutations: [
      {
        create: {
          _type: "tweet",
          text: data.text,
          username: data.username,
          blockTweet: false,
          profileImg: data.profileImg,
          image: data.image,
        },
      },
    ],
  };

  const apiEndpoint = `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2023-04-22/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`;

  const result = await fetch(apiEndpoint, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${process.env.SANITY_TOKEN_API}`,
    },
    body: JSON.stringify(mutations),
  });

  const json = await result.json();

  return NextResponse.json({ json });
}
