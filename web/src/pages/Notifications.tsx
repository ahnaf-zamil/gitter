import React from "react";
import { Sidebar } from "../components/Sidebar";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const notifications: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const Notifications = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-screen flex">
      <Sidebar />
      <div className="grow h-full max-w-[550px]"></div>
      <div
        id="main"
        className="border-x-2 border-[#35383B] bg-[#181B1A] max-w-[700px] w-full flex flex-col justify-start"
      >
        <div className="w-full gap-5 justify-start flex flex-row items-center ">
          <i
            onClick={() => {
              navigate("/");
            }}
          >
            <AiOutlineArrowLeft size={35} />
          </i>
          <div>
            <p className="text-3xl">Notifications</p>
          </div>
        </div>

        <div className="flex flex-row  mt-5 justify-between mx-10">
          <p className="text-xl font-bold">All</p>
          <p className="text-xl font-bold">Verified</p>
          <p className="text-xl font-bold">Mentions</p>
        </div>
        {notifications.map((notification) => (
          <div
            key={notification}
            className=" mt-3 flex flex-row justify-start items-center gap-5 border-y-2 border-gray-400 py-5 px-2 "
          >
            <MdOutlineWorkspacePremium size={55} className="text-pink-700" />
            <div className="flex flex-col gap-1">
              <p className="text-gray-500">
                Someone you follow subscribed to @imPenny2x
              </p>
              <div className="w-[50px]   rounded">
                <img
                  src="https://pbs.twimg.com/profile_images/1504473771973177350/dcX7s7V__200x200.jpg"
                  alt="profile"
                  className="shadow rounded-full  max-w-full h-auto align-middle border-none"
                />
              </div>
              <p>
                Subscribe to Penny2x and get access to their exclusive content
              </p>
            </div>
          </div>
        ))}
      </div>

      <section className="grow h-full">
        <div className="max-w-[450px] w-full h-full"></div>
      </section>
    </div>
  );
};

export default Notifications;
