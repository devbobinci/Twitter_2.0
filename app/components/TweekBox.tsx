// "use client";

import { useState, useRef, Dispatch, SetStateAction } from "react";
import Image from "next/image";
import {
  IoSearchCircleOutline,
  IoHappyOutline,
  IoCalendarNumberOutline,
  IoLocationOutline,
} from "react-icons/io5";
import { HiOutlinePhoto } from "react-icons/hi2";
import { useSession } from "next-auth/react";
import { Tweet, TweetBody } from "@/typings";
import { fetchTweets } from "@/lib/fetchTweets";
import { toast } from "react-hot-toast";

interface Props {
  setTweets: Dispatch<SetStateAction<Tweet[]>>;
}

export default function TweekBox({ setTweets }: Props) {
  const { data: session } = useSession();

  const [input, setInput] = useState<string>("");
  const [image, setImage] = useState<string>("");

  const imageInputRef = useRef<HTMLInputElement>(null);

  const [imageUrlBoxIsOpen, setImageUrlBoxIsOpen] = useState<boolean>(false);

  function addImageToTweet(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();

    if (!imageInputRef?.current?.value) return;

    setImage(imageInputRef.current.value);
    imageInputRef.current.value = "";
    setImageUrlBoxIsOpen(false);
  }

  const postTweet = async () => {
    const tweetInfo: TweetBody = {
      text: input,
      username: session?.user?.name || "Unkown User",
      profileImg: session?.user?.image || "../../public/images/user-128.png",
      image: image,
    };

    const result = await fetch(`/api/addTweet`, {
      body: JSON.stringify(tweetInfo),
      method: "POST",
    });

    const json = await result.json();

    const newTweets = await fetchTweets();
    setTweets(newTweets);

    toast("Tweet posted!", {
      icon: "🚀",
    });
  };

  const handleSubmit = (
    e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();

    postTweet();

    setInput("");
    setImage("");
    setImageUrlBoxIsOpen(false);
  };

  return (
    <div className="flex space-x-2 p-5">
      <div className="flex flex-1 pl-2">
        <Image
          src={session?.user?.image || "/images/user-128.png"}
          width={200}
          height={200}
          alt="User"
          className="h-14 w-14 rounded-full object-cover mt-5 mr-4"
        />
        <form className="flex flex-1 flex-col">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="What's happening?"
            className="h-24 w-full text-xl outline-none placeholder:text-xl"
          />

          <div className="flex items-center">
            <div className="flex flex-1 space-x-2 text-twitter">
              <HiOutlinePhoto
                onClick={() => setImageUrlBoxIsOpen((prev) => !prev)}
                className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150"
              />
              <IoSearchCircleOutline className="h-5 w-5" />
              <IoHappyOutline className="h-5 w-5" />
              <IoCalendarNumberOutline className="h-5 w-5" />
              <IoLocationOutline className="h-5 w-5" />
            </div>

            <button
              onClick={handleSubmit}
              // Nie moge go kliknac gdy input jest pusty
              disabled={!input || !session}
              className="bg-twitter text-white px-5 py-2 font-bold rounded-full disabled:opacity-40"
            >
              Tweet
            </button>
          </div>

          {imageUrlBoxIsOpen && (
            <form className="mt-5 flex bg-twitter/80 py-2 px-4 rounded-lg">
              <input
                ref={imageInputRef}
                className="flex-1 bg-transparent p-2 text-white outline-none placeholder:text-white"
                type="text"
                placeholder="Enter Image URL..."
              />
              <button
                type="submit"
                onClick={addImageToTweet}
                className="font-bold text-white"
              >
                Add image
              </button>
            </form>
          )}

          {image && (
            <Image
              src={image}
              width={400}
              height={400}
              alt="Image"
              className="mt-10 h-40 w-full rounded-xl object-contain shadow-lg"
            />
          )}
        </form>
      </div>
    </div>
  );
}
