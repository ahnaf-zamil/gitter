import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { httpClient } from "../lib/http";

export const RegisterPage: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [searchParams, _] = useSearchParams();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const targetForm = e.target as typeof e.target & {
      name: { value: string };
      email: { value: string };
      password: { value: string };
      username: { value: string };
    };

    const name = targetForm.name.value;
    const email = targetForm.email.value;
    const password = targetForm.password.value;
    const username = targetForm.username.value;
    console.log("Data___", name, email, password, username);

    try {
      await httpClient.post("/users/create", {
        name,
        username,
        email,
        password,
      });
    } catch (err) {
      const resp = (err as any).response;
      setError(`Error: ${resp.status} ${resp.data.message}`);
      return;
    }

    window.location.href = searchParams.get("redirect") || "/";
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      {error && (
        <div className="py-4 px-6 bg-red-400 w-full md:w-7/12 2xl:w-4/12 mx-4 text-center mb-6">
          {error}
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="shadow-xl bg-[#171c1c] p-8 w-full md:w-7/12 2xl:w-4/12 mx-4"
      >
        <h1 className="font-light text-2xl text-center mb-6">
          Twitter - Register
        </h1>

        <input
          name="name"
          placeholder="Name"
          type="text"
          className="transition focus:ring-2 px-4 first-letter:text-white my-2 bg-[#171c1c] h-10 w-full border border-[#3b4252] focus:outline-none"
          required
        />
        <input
          name="email"
          placeholder="Email"
          type="email"
          className="transition focus:ring-2 px-4 first-letter:text-white my-2 bg-[#171c1c] h-10 w-full border border-[#3b4252] focus:outline-none"
          required
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          className="transition focus:ring-2 px-4 text-white bg-[#171c1c] h-10 w-full mb-3 border border-[#3b4252] focus:outline-none"
          required
        />
        <input
          name="username"
          placeholder="Username"
          type="text"
          className="transition focus:ring-2 px-4 text-white bg-[#171c1c] h-10 w-full mb-3 border border-[#3b4252] focus:outline-none"
          required
        />
        <button
          type="submit"
          className="w-full bg-[#5e81ac] rounded-sm py-2 my-3"
        >
          Register
        </button>

        <hr className="bg-[#434c5e] border-none" />
        <p className="text-center">or</p>

        <button
          onClick={() => {
            window.location.href = "/login";
          }}
          className="w-full bg-[#434c52] rounded-sm py-2 my-3"
        >
          Login
        </button>
      </form>
    </div>
  );
};
