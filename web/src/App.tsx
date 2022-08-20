import React, { useState } from "react";
import { userContext } from "./lib/context";
import { TUser } from "./lib/types";
import { Router } from "./Router";

export const App: React.FC = () => {
  const [user, setUser] = useState<TUser | null>(null);

  return (
    <userContext.Provider value={{ user, setUser }}>
      <Router />
    </userContext.Provider>
  );
};
