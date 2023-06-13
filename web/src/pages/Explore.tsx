import { LuMoreHorizontal } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { AiOutlineArrowLeft } from "react-icons/ai";
const trending: number[] = [1, 2, 3, 4, 5];
const Explore = () => {
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
            <p className="text-3xl">Explore</p>
          </div>
        </div>
        <form className="mx-5 my-10">
          <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Twitter"
              required
            />
            <button
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>
        <div className="border-b-2 border-[#35383B]">
          <div className="my-5  flex flex-col ml-5">
            <h1 className="text-2xl">Trending in Poland</h1>
            {trending.map((trend) => (
              <div className="my-3" key={trend}>
                <div className="flex justify-between flex-row items-center mr-3">
                  <p className="text-gray-500">Technology-Trending</p>
                  <LuMoreHorizontal />
                </div>
                <p className="font-bold">#SoftwareDeveloping</p>
                <p className="text-gray-500">1,327 Tweets</p>
              </div>
            ))}
            <p className="text-blue-400">Show more...</p>
          </div>
        </div>
      </div>

      <section className="grow h-full">
        <div className="max-w-[450px] w-full h-full"></div>
      </section>
    </div>
  );
};

export default Explore;
