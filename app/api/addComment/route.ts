import { NextResponse, NextRequest } from "next/server";

import { client } from "../../../client";
import { Comment, CommentBody, TweetBody } from "@/typings";
import { groq } from "next-sanity";

export async function POST(req: NextRequest, res: NextResponse) {
  if (req.method !== "POST")
    return new Response(null, { status: 404, statusText: "Not found" });

  const comment: CommentBody = await req.json();

  const mutations = {
    mutations: [
      {
        create: {
          _type: "comment",
          comment: comment.comment,
          username: comment.username,
          profileImg: comment.profileImg,
          tweet: {
            _type: "reference",
            _ref: comment.tweetId,
          },
        },
      },
    ],
  };

  const apiEndpoint = `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2023-04-22/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`;

  try {
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
  } catch (error) {
    console.log(error);
    throw new Error(
      "Adding your comment has not went properly, try again later"
    );
  }
}
