import React from "react";

export const Sidebar: React.FC = () => {
  return (
    <section className="grow h-full max-w-[550px]">
      <div className="float-right h-full w-full max-w-[300px] flex flex-col py-4 px-8">
        <h1 className="ml-4 font-light text-2xl text-left">GITTER</h1>
        <ul className="px-4 flex flex-col gap-8 mt-8 text-xl text-[#D4D3CE]">
          {[
            ["Home", "fa-house-chimney-crack", "/"],
            ["Notifications", "fa-bell", "/notifications"],
            ["Profile", "fa-user", "/profile"],
            ["More", "fa-ellipsis", "/profile/settings"],
          ].map((val, i) => {
            return (
              <a href={val[2]} className="flex gap-4 items-center text-2xl">
                <i className={`w-4 fa-solid ${val[1]}`}></i>
                <span className="text-xl ml-4">{val[0]}</span>
              </a>
            );
          })}
        </ul>
        <button className="bg-[#3971B7] mt-12 rounded-full h-14 text-xl font-semibold">
          Tweet
        </button>
      </div>
    </section>
  );
};