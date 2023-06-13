import { createContext } from "react";
import { getCurrentUser } from "../api/users";
import { TUser } from "./types";

export interface TUserContext {
  user: TUser | null;
  setUser: (user: TUser | null) => void;
}

export const userContext = createContext<TUserContext>({
  user: null,
  setUser: (user: TUser | null) => {},
});

export const tryAuth = async (ctx: TUserContext) => {
  // Tries to see if the user is authenticated, and hydrates context
  if (ctx.user) {
    return;
  }
  ctx.setUser((await getCurrentUser())!);
};

export const logout = (ctx: TUserContext) => {
  ctx.setUser(null); // Clear the user in the context
};
