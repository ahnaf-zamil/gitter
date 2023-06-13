import { Sidebar } from "../components/Sidebar";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useContext } from "react";
import { userContext } from "../lib/context";
const Profile = () => {
  const { user } = useContext(userContext);
  console.log(user);
  return (
    <div className="w-full h-screen flex">
      <Sidebar />
      <div
        id="main"
        className="border-x-2 border-[#35383B] bg-[#181B1A] max-w-[700px] w-full flex flex-col justify-start"
      >
        <div className="w-full gap-5 justify-start flex flex-row items-center ">
          <i>
            <AiOutlineArrowLeft size={35} />
          </i>
          <div>
            <p className="text-3xl">{user?.name}</p>
            <p className="text-gray-500">23 Tweets</p>
          </div>
        </div>
        <div>
          <img
            src="https://media.wired.com/photos/5a55b72db1cfb87f3206aa5b/master/w_2560%2Cc_limit/Twitter-Hole-featured.jpg"
            alt="bgimage"
            className="h-[200px] w-full object-cover"
          />
          <div className="flex  justify-between pr-6 ">
            <div className="w-[134px] -mt-20  rounded-full border-4 border-black">
              <img
                src="https://pbs.twimg.com/profile_images/1504473771973177350/dcX7s7V__200x200.jpg"
                alt="profile"
                className="shadow rounded-full  max-w-full h-auto align-middle border-none"
              />
            </div>
            <div className="flex items-center">
              <button className="rounded-full  px-5 py-2 border-2 border-gray-400">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col pl-5 mt-2">
          <p className="text-3xl font-bold">{user?.name}</p>
          <p className="text-gray-400">@{user?.username}</p>
        </div>
        <div className="flex flex-col pl-5 mt-2">
          <p className="text-xl font-bold">Here it would be your bio..</p>
        </div>
        <div className="flex flex-row  mt-5 justify-between mx-10">
          <p className="text-xl font-bold">Tweets</p>
          <p className="text-xl font-bold">Replies</p>
          <p className="text-xl font-bold">Media</p>
          <p className="text-xl font-bold">Likes</p>
        </div>
      </div>
      <section className="grow h-full">
        <div className="max-w-[450px] w-full h-full"></div>
      </section>
    </div>
  );
};

export default Profile;
