import React, { useEffect, useState } from "react";
import { userContext } from "./lib/context";
import { TCurrentUser } from "./lib/types";
import { Router } from "./Router";

export const App: React.FC = () => {
  const [user, setUser] = useState<TCurrentUser | null>(null);

  return (
    <userContext.Provider value={{ user, setUser }}>
      <Router />
    </userContext.Provider>
  );
};
