import { createContext } from "react";
import { getCurrentUser } from "../api/users";
import { TUser } from "./types";

interface TUserContext {
  user: TUser | null;
  setUser: (user: TUser) => void;
}

export const userContext = createContext<TUserContext>({
  user: null,
  setUser: (user: TUser) => {},
});

export const tryAuth = async (ctx: TUserContext) => {
  // Tries to see if the user is authenticated, and hydrates context
  if (ctx.user) {
    return;
  }
  ctx.setUser((await getCurrentUser())!);
};
