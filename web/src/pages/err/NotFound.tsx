import React from "react";

interface Props {
  status: number;
}

export const NotFoundPage: React.FC<Props> = ({ status }) => {
  return (
    <div className="h-screen w-full flex justify-center items-center flex-col gap-6">
      <h1 className="font-bold text-8xl">{status}</h1>
      <h1 className="text-3xl">Oops, this page doesnt exist {":>"}</h1>
    </div>
  );
};
