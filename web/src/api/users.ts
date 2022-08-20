import { httpClient } from "../lib/http";
import { TUser } from "../lib/types";

export const getCurrentUser = async (): Promise<TUser | null> => {
  try {
    const resp = await httpClient.get("/users/@me");
    return resp.data;
  } catch (e) {
    return null;
  }
};
