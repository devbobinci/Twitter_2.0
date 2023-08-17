import { Dispatch, SetStateAction, useState } from "react";

import { fetchTweets } from "@/lib/fetchTweets";
import { Tweet } from "@/typings";

import { FiRefreshCcw } from "react-icons/fi";

import TweekBox from "./TweekBox";
import TweetCard from "./TweetCard";
import { toast } from "react-hot-toast";

interface Props {
  tweets: Tweet[];
  setTweets: Dispatch<SetStateAction<Tweet[]>>;
}

export default function Feed({ tweets, setTweets }: Props) {
  const handleRefresh = async () => {
    const refreshToast = toast.loading("Refreshing...");
    const tweets = await fetchTweets();
    setTweets(tweets);

    // id -> zastepuje poprzedni toast nowym
    toast.success("Feed updated!", {
      id: refreshToast,
    });
  };

  return (
    <div className="col-span-7 border-x lg:col-span-5 max-h-screen overflow-y-scroll scrollbar-hide">
      <div className="flex items-center justify-between p-5">
        <h1 className="pb-0 text-xl font-bold">Home</h1>
        <FiRefreshCcw
          onClick={handleRefresh}
          className="h-8 w-8 cursor-pointer text-twitter transition-all duration-500 ease-out hover:rotate-180 active:scale-125"
        />
      </div>

      <div>
        <TweekBox setTweets={setTweets} />
      </div>

      <div>
        {tweets.map((tweet) => (
          <TweetCard key={tweet._id} tweet={tweet} />
        ))}
      </div>
    </div>
  );
}
