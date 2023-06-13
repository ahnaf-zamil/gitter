import React, { useState, useEffect } from "react";
import { userContext } from "./lib/context";
import { TUser } from "./lib/types";
import { Router } from "./Router";
import { getCurrentUser } from "./api/users";

export const App: React.FC = () => {
  const [user, setUser] = useState<TUser | null>(null);
  useEffect(() => {
    const fetchCurrentUser = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    };

    fetchCurrentUser();
  }, []);

  return (
    <userContext.Provider value={{ user, setUser }}>
      <Router />
    </userContext.Provider>
  );
};
