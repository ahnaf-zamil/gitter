import { createContext } from "react";
import { TCurrentUser } from "./types";

interface TUserContext {
  user: TCurrentUser | null;
  setUser: (user: TCurrentUser) => void;
}

export const userContext = createContext<TUserContext>({
  user: null,
  setUser: (user: TCurrentUser) => {},
});
