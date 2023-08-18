"use client";

import { useEffect, useState } from "react";

import { Tweet } from "@/typings";
import { fetchTweets } from "../lib/fetchTweets";

import Feed from "./components/Feed";
import Sidebar from "./components/Sidebar";
import Widgets from "./components/Widgets";
import { Toaster } from "react-hot-toast";

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
        <Toaster />
        <Sidebar />
        <Feed tweets={tweets} setTweets={setTweets} />
        <Widgets />
      </main>
    </div>
  );
}
