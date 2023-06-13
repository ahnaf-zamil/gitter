import React, { useState, useEffect } from "react";
import { FloatTweetBox } from "../components/FloatTweetBox";
import { Sidebar } from "../components/Sidebar";
import { userContext } from "../lib/context";
import { useNavigate } from "react-router-dom";
import { httpClient } from "../lib/http";
import { BTweet } from "../lib/types";
import { useContext } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { ErrorPage } from "../wrapper/ErrorPage";
interface Props {
  compose?: boolean;
}

export const LandingPage: React.FC<Props> = ({ compose }) => {
  const { user } = useContext(userContext);
  const navigate = useNavigate();
  const [tweets, setTweets] = useState<BTweet[] | null>([]);
  const [error, setError] = useState<number | null>();

  useEffect(() => {
    const fetchTweets = async () => {
      const { data }: any = await httpClient.get(
        `/users/${user?.username}/tweets`
      );

      if (typeof data === "number") {
        setError(data);
      } else {
        setTweets(data?.tweets);
      }
    };
    fetchTweets();
  }, []);
  console.log(tweets);
  if (error) {
    return <ErrorPage status={error} />;
  }
  return (
    <div className="relative w-full h-screen flex">
      {compose && <FloatTweetBox />}

      <Sidebar />
      <div className="grow h-full max-w-[550px]"></div>

      <div
        id="main"
        className=" bg-[#181B1A] max-w-[700px] w-full flex flex-col justify-start"
      >
        <div className=" justify-center w-full">
          <p className="text-3xl flex justify-center my-10">
            Welcome to home page
          </p>
        </div>
        <div
          id="main"
          className="flex  border-2 border-[#35383B] flex-col-reverse"
        >
          {tweets?.map((tweet) => (
            <div className="mx-6">
              <div className="flex gap-4 items-center mt-2">
                <img
                  src="https://pbs.twimg.com/profile_images/1504473771973177350/dcX7s7V__200x200.jpg"
                  alt=""
                  width="20"
                  className="rounded-full block"
                />
                <div>
                  <h3 className="font-semibold">{user?.name}</h3>
                  <p className="font-light">@{user?.username}</p>
                </div>
              </div>
              <h1 className="my-6 text-3xl">{tweet?.Content}</h1>
              <hr className="border-[#847F72]" />
              <h1 className=" text-[#847F72] my-4 text-lg hover:underline cursor-pointer">
                <span className="text-white font-semibold">{tweet?.Likes}</span>{" "}
                0 likes
              </h1>
              <hr className="border-[#847F72]" />
              <div className="flex text-[#847F72] my-4 text-xl mx-16 justify-between items-center">
                <span className="cursor-pointer hover:text-blue-400 transition">
                  <i className="fa-solid fa-comment"></i>
                </span>
                <span className="cursor-pointer hover:text-green-400 transition">
                  <i className="fa-solid fa-retweet"></i>
                </span>
                <span
                  className={`cursor-pointer hover:text-red-500 transition ${
                    tweet?.IsLiked ? "text-red-500" : ""
                  }`}
                >
                  <i className="fa-solid fa-heart"></i>
                </span>
                <span className="cursor-pointer hover:text-yellow-400 transition">
                  <i className="fa-solid fa-share"></i>
                </span>
              </div>
              <hr className="border-[#847F72]" />
            </div>
          ))}
        </div>
      </div>
      <section className="grow h-full">
        <div className="max-w-[450px] w-full h-full"></div>
      </section>
    </div>
  );
};
