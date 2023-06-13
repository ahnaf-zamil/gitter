import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { userContext } from "./lib/context";
import { LandingPage } from "./pages/Landing";

import { LoginPage } from "./pages/Login";
import { ShowTweetPage } from "./pages/ShowTweet";
import { AppPage } from "./wrapper/AppPage";
import { LoginRequired } from "./wrapper/LoginRequired";
import { RegisterPage } from "./pages/RegisterPage";

export const Router: React.FC = () => {
  const { user } = useContext(userContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route
          path="/home"
          element={<AppPage page={<LandingPage />} loginRequired />}
        />
        <Route
          path="/compose/tweet"
          element={<AppPage page={<LandingPage compose />} loginRequired />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/:username/status/:tweet_id"
          element={<AppPage page={<ShowTweetPage />} />}
        />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
};
