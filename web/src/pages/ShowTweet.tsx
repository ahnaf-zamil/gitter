import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTweet } from "../api/tweets";
import { Sidebar } from "../components/Sidebar";
import { tryAuth, userContext } from "../lib/context";
import { TTweet } from "../lib/types";
import { ErrorPage } from "../wrapper/ErrorPage";

export const ShowTweetPage: React.FC = () => {
  const authCtx = useContext(userContext);
  const params = useParams();
  const navigate = useNavigate();
  const [tweet, setTweet] = useState<TTweet | null>();
  const [error, setError] = useState<number | null>();

  useEffect(() => {
    const fetchTweet = async () => {
      const { tweet_id, username } = params;
      const data = await getTweet(username!, tweet_id!);

      if (typeof data === "number") {
        setError(data);
      } else {
        setTweet(data);
      }
    };

    (async () => {
      await tryAuth(authCtx);
      await fetchTweet();
    })();
  }, []);

  if (error) {
    return <ErrorPage status={error} />;
  }

  return (
    <div className="w-full h-screen flex">
      <Sidebar />
      <div
        id="main"
        className="border-x-2 border-[#35383B] bg-[#181B1A] max-w-[700px] w-full"
      >
        {tweet && (
          <div className="mx-6">
            <div className="py-6 flex gap-6 text-xl items-center">
              <i
                onClick={() => navigate(-1)}
                className="block fa-solid fa-arrow-left"
              ></i>
              <h1 className="font-semibold">Tweet</h1>
            </div>
            <div className="flex gap-4 items-center mt-2">
              <img
                src="https://pbs.twimg.com/profile_images/1504473771973177350/dcX7s7V__200x200.jpg"
                alt=""
                width="50"
                className="rounded-full block"
              />
              <div>
                <h1 className="font-semibold">{tweet.author.name}</h1>
                <p className="font-light">@{tweet.author.username}</p>
              </div>
            </div>
            <h1 className="my-6 text-3xl">{tweet.content}</h1>
            <hr className="border-gray-600" />
          </div>
        )}
      </div>
      <section className="grow h-full">
        <div className="max-w-[450px] w-full h-full"></div>
      </section>
    </div>
  );
};
