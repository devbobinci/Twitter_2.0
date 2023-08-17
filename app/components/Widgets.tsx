"use client";

import { BsSearch } from "react-icons/bs";
import { TwitterTimelineEmbed } from "react-twitter-embed";

export default function Widgets() {
  return (
    <div className="px-2 mt-2 col-span-2 hidden lg:block ">
      <div className="flex items-center space-x-2 bg-gray-100 p-3 rounded-full mt-2">
        <BsSearch className="h-5 w-5" />
        <input
          type="text"
          placeholder="Search Twitter"
          className="flex-1 outline-none bg-transparent"
        />
      </div>

      {/* Profil elona i jego posty */}
      <TwitterTimelineEmbed
        sourceType="profile"
        screenName="elonmusk"
        options={{ height: 1000 }}
      />
    </div>
  );
}
