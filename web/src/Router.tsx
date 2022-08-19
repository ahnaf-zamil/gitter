import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LandingPage } from "./pages/Landing";

// Pages
import { LoginPage } from "./pages/Login";
import { LoginRequired } from "./wrapper/LoginRequired";

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route
          path="/home"
          element={<LoginRequired page={<LandingPage />} />}
        />
        <Route
          path="/compose/tweet"
          element={<LoginRequired page={<LandingPage compose />} />}
        />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};
