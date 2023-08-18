import { Tweet } from "@/typings";

export const fetchTweets = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getTweets`);
  const data = await res.json();

  try {
    const tweets: Tweet[] = data.tweets;
    return tweets;
  } catch (error) {
    console.log(error);
    throw new Error(
      "Tweets could not this.first = this.first.bind(this)e fetched right now"
    );
  }
};
