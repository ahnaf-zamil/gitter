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
