import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingBar, { LoadingBarRef } from "react-top-loading-bar";
import { userContext } from "../lib/context";
import { httpClient } from "../lib/http";

const MAX_TWEET_LENGTH = 300;

export const FloatTweetBox: React.FC = () => {
  const ref = useRef<LoadingBarRef>(null);

  const navigate = useNavigate();
  const { user } = useContext(userContext);
  const [content, setContent] = useState<string>("");

  const handleSubmit = async () => {
    if (content.length === 0) {
      return;
    }

    ref.current!.continuousStart(10, 10);
    const resp = await httpClient.post("/tweets/create", { content });
    ref.current!.complete();
    navigate(`/@${user?.username}/status/${resp.data.id}`);
  };

  return (
    <>
      <LoadingBar className="z-10" color="#3971B7" ref={ref} />
      <div className="relative">
        <div
          onClick={() => navigate("/home")}
          className="fixed w-full h-full bg-blue-300/10 flex items-center justify-center"
        ></div>
        <div className="fixed transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bg-[#131717] rounded-lg p-5 shadow-lg w-4/12 flex flex-col">
          <div className="flex justify-between">
            <span
              onClick={() => navigate("/home")}
              className="text-xl cursor-pointer"
            >
              <i className="fa-solid fa-xmark"></i>
            </span>
          </div>
          <div className="flex mt-6 gap-6">
            <div className="w-[70px]">
              <img
                src="https://pbs.twimg.com/profile_images/1504473771973177350/dcX7s7V__200x200.jpg"
                className="rounded-full block"
              />
            </div>
            <div className="w-full">
              <div className="relative">
                <textarea
                  value={content}
                  onChange={(e) =>
                    setContent(e.target.value.substring(0, MAX_TWEET_LENGTH))
                  }
                  placeholder="What's up?"
                  className="w-full h-[150px] hide-scroll focus:outline-none bg-transparent resize-none text-xl"
                />
                <span className="absolute right-2 bottom-2 text-right">
                  {MAX_TWEET_LENGTH - content.length}
                </span>
              </div>
              <hr className="border-[#35383B]" />
              <div className="w-full mt-4">
                <button
                  onClick={handleSubmit}
                  disabled={content.length === 0}
                  className={`float-right bg-[#3971B7]${
                    content.length === 0 ? "/0" : ""
                  } py-2 px-4 rounded-full font-semibold`}
                >
                  Tweet
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
