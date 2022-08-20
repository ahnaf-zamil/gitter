import { AxiosError } from "axios";
import { httpClient } from "../lib/http";
import { TTweet } from "../lib/types";

export const getTweet = async (
  username: string,
  tweetId: string
): Promise<TTweet | number> => {
  try {
    const resp = await httpClient.get(`/tweets/get/${username}/${tweetId}`);
    return resp.data;
  } catch (e) {
    return (e as AxiosError).response?.status!;
  }
};
