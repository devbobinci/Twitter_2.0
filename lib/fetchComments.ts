import { Comment } from "@/typings";

export const fetchComments = async (tweetId: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getComments?tweetId=${tweetId}`
  );

  const data = await res.json();
  try {
    const comments: Comment[] = data.comments;
    return comments;
  } catch (error) {
    console.log(error);
    throw new Error("Comments could not be get right now");
  }
};
