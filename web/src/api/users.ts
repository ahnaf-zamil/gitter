import { httpClient } from "../lib/http";
import { TCurrentUser } from "../lib/types";

export const getCurrentUser = async (): Promise<TCurrentUser | null> => {
  try {
    const resp = await httpClient.get("/users/@me");
    return resp.data;
  } catch (e) {
    return null;
  }
};
