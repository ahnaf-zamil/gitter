import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../lib/context";

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useContext(userContext);

  return (
    <section className="grow h-full max-w-[550px]">
      <div className="float-right h-full w-full max-w-[300px] flex justify-between flex-col py-6 px-8">
        <div className="w-full h-full flex flex-col">
          <h1 className="ml-4 font-light text-2xl text-left">GITTER</h1>
          <ul className="px-4 flex flex-col gap-8 mt-8 text-xl text-[#D4D3CE]">
            {[
              ["Home", "fa-house-chimney-crack", "/", true], // Title, icon, link, auth required
              ["Notifications", "fa-bell", "/notifications", true],
              ["Explore", "fa-hashtag", "/explore", false],
              ["Profile", "fa-user", "/profile", true],
              ["More", "fa-ellipsis", "/profile/settings", false],
            ].map((val, i) => {
              if (val[3] && !user) {
                return null;
              }
              return (
                <a
                  href={val[2].toString()}
                  className="flex gap-4 items-center text-2xl"
                >
                  <i className={`w-4 fa-solid ${val[1]}`}></i>
                  <span className="text-xl ml-4">{val[0]}</span>
                </a>
              );
            })}
          </ul>
          {user ? (
            <button
              onClick={() => navigate("/compose/tweet")}
              className="bg-[#3971B7] mt-6 rounded-full h-14 text-xl font-semibold"
            >
              Tweet
            </button>
          ) : null}
        </div>
        {user && (
          <div className="flex gap-4 items-center mt-6">
            <img
              src="https://pbs.twimg.com/profile_images/1504473771973177350/dcX7s7V__200x200.jpg"
              alt=""
              width="50"
              className="rounded-full block"
            />
            <div>
              <h1 className="font-semibold">{user.name}</h1>
              <p className="font-light">@{user.username}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
