"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import TimeAgo from "react-timeago";

import { Comment, CommentBody, Tweet } from "@/typings";

import { BiChat } from "react-icons/bi";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import { AiOutlineHeart, AiOutlineUpload } from "react-icons/ai";
import { fetchComments } from "@/lib/fetchComments";
import { toast, Toaster } from "react-hot-toast";
import { useSession } from "next-auth/react";

// Tutaj musze tworzyc interface, a nie przypisywac bezposrednio
interface Props {
  tweet: Tweet;
}

export default function TweetCard({ tweet }: Props) {
  const { data: session } = useSession();

  const [comments, setComments] = useState<Comment[]>([]);
  const [commentBoxVisible, setCommentBoxVisible] = useState<boolean>(false);
  const [readMore, setReadMore] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");

  const refreshComments = async () => {
    const comments: Comment[] = await fetchComments(tweet._id);

    setComments(comments);
  };

  useEffect(() => {
    refreshComments();
    console.log(session);
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const commentToast = toast.loading("Posting Comment...");

    // Comment logic
    const comment: CommentBody = {
      comment: input,
      tweetId: tweet._id,
      username: session?.user?.name || "Unkown user",
      profileImg: session?.user?.image || "../../public/images/user-128.png",
    };

    const result = await fetch("/api/addComment", {
      method: "POST",
      body: JSON.stringify(comment),
    });

    const json = await result.json();

    toast.success("Comment Posted!", {
      id: commentToast,
    });

    setInput("");
    setCommentBoxVisible(false);
    refreshComments();
  }

  return (
    <div
      className={`flex flex-col space-x-3 border-y p-5 border-gray-100 h-full scrollbar-hide ${
        readMore
          ? "max-h-full overflow-y-scroll "
          : "max-h-[510px] overflow-y-hidden "
      } relative`}
    >
      {comments.length > 1 && (
        <div
          className={`
          absolute w-full h-12 bg-gradient-to-b from-white to white/20 bottom-0 left-0 backdrop-blur-md z-[1]`}
        />
      )}
      <Toaster />

      <div className="flex space-x-3">
        <Image
          src={tweet.profileImg!}
          width={200}
          height={200}
          alt={tweet.username}
          className="h-10 w-10 rounded-full object-cover"
        />

        <div>
          <div className="flex items-center space-x-1">
            <p className="mr-1 font-bold">{tweet.username}</p>
            <p className="hidden text-sm text-gray-500 sm:inline">
              @{tweet.username.replace(/\s+/g, "").toLowerCase()}.
            </p>

            {/* Biblioteka react-timeago pozwalajaca na obliczenie czasu od podanej daty do teraz. Gdy wyskakuje blad react.useState is not a function, nalezy przypisac temu komponentowi "use client", poniewaz state moze byc tylko w use client */}
            <TimeAgo
              className="text-sm text-gray-500"
              date={tweet._createdAt}
            />
          </div>

          <p className="pt-1">{tweet.text}</p>

          {tweet.image && (
            <Image
              src={tweet.image}
              alt={tweet.text}
              width={400}
              height={400}
              className="m-5 ml-0 mb-1 max-h-60 rounded-lg object-cover shadow-sm"
            />
          )}
        </div>
      </div>

      <div className="mt-5 flex justify-between">
        <div
          onClick={() => session && setCommentBoxVisible((prev) => !prev)}
          className="flex cursor-pointer items-center space-x-3 text-gray-400"
        >
          <BiChat className="h-5 w-5" />
          <p>{comments.length > 0 && comments.length}</p>
        </div>
        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <HiOutlineSwitchHorizontal className="h-5 w-5" />
        </div>
        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <AiOutlineHeart className="h-5 w-5" />
        </div>
        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <AiOutlineUpload className="h-5 w-5" />
        </div>
      </div>

      {/* Comments box */}
      {commentBoxVisible && (
        <form onSubmit={handleSubmit} className="mt-3 flex space-x-3 ">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 rounded-lg bg-gray-100 p-2 outline-none"
            type="text"
            placeholder="Write a comment..."
          />
          <button
            disabled={!input}
            className="text-twitter disabled:text-gray-200"
            type="submit"
          >
            Post
          </button>
        </form>
      )}

      {comments?.length > 0 && (
        <div className="my-2 mt-5 max-h-44 space-y-5 overflow-y-scoll border-t border-gray-100 p-5">
          {comments.map((comment) => (
            <div key={comment._id} className="relative flex space-x-2">
              {comments.length > 1 && (
                <hr className="absolute left-5 top-10 h-8 border-x border-twitter/30" />
              )}
              <Image
                src={comment.profileImg!}
                alt={comment.username!}
                width={50}
                height={50}
                className="mt-2 h-7 w-7 object-cover rounded-full"
              />

              <div>
                <div className="flex items-center space-x-1">
                  <p className="mr-1 font-bold">{comment.username}</p>
                  <p className="hidden text-sm text-gray-500 lg:inline">
                    @{comment.username.replace(/\s+/g, "").toLowerCase()}.
                  </p>
                  <TimeAgo
                    className="text-sm text-gray-500"
                    date={comment._createdAt}
                  />
                </div>
                <p>{comment.comment}</p>
              </div>
            </div>
          ))}
          <button
            className="absolute right-5 bottom-12 text-white text-sm bg-twitter px-4 py-2 rounded-lg"
            onClick={() => setReadMore((prev) => !prev)}
          >
            {readMore ? "Read Less" : "Read More"}
          </button>
        </div>
      )}
    </div>
  );
}
