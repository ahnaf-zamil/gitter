export interface TUser {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface TTweet {
  id: string;
  content: string;
  createdAt: string;
  likes: number;
  author: TUser;
  isLiked: boolean;
}
export interface BTweet {
  Id: string;
  Content: string;
  CreatedAt: string;
  Likes: number;
  Author: TUser;
  IsLiked: boolean;
}
