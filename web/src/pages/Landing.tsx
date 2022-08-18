import React from "react";
import { Sidebar } from "../components/Sidebar";

export const LandingPage: React.FC = () => {
  return (
    <div className="w-full h-screen flex">
      <Sidebar />
      <div
        id="main"
        className="border border-[#35383B] bg-[#181B1A] max-w-[700px] w-full"
      >
        Tweet
      </div>
      <section className="grow h-full">
        <div className="max-w-[450px] w-full h-full"></div>
      </section>
    </div>
  );
};
