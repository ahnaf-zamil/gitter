import React, { useContext, useEffect } from "react";
import { getCurrentUser } from "../api/users";
import { Sidebar } from "../components/Sidebar";
import { userContext } from "../lib/context";

export const LandingPage: React.FC = () => {
  const { user } = useContext(userContext);

  useEffect(() => {
    console.log(user);
  }, []);

  return (
    <div className="w-full h-screen flex">
      <Sidebar />
      <div
        id="main"
        className="border-x-2 border-[#35383B] bg-[#181B1A] max-w-[700px] w-full flex items-center justify-center"
      >
        <h1 className="text-3xl">AMOGUS</h1>
      </div>
      <section className="grow h-full">
        <div className="max-w-[450px] w-full h-full"></div>
      </section>
    </div>
  );
};
