"use client";

import { useEffect, useState } from "react";

import { Tweet } from "@/typings";
import { fetchTweets } from "../lib/fetchTweets";

import Feed from "./components/Feed";
import Sidebar from "./components/Sidebar";
import Widgets from "./components/Widgets";

export default function Home() {
  const [tweets, setTweets] = useState<Tweet[]>([]);

  const refreshTweets = async () => {
    const newTweets: Tweet[] = await fetchTweets();
    setTweets(newTweets);
  };

  useEffect(() => {
    refreshTweets();
  }, []);

  return (
    <div className="lg:max-w-6xl mx-auto max-h-screen overflow-y-hidden">
      <main className="grid grid-cols-9 py-2">
        {/* Sidebar */}
        <Sidebar />

        {/* Feed */}
        <Feed tweets={tweets} setTweets={setTweets} />
        {/* Widgets */}
        <Widgets />
      </main>
    </div>
  );
}
