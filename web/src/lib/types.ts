export interface TUser {
  id: number;
  name: string;
  username: string;
}

export interface TCurrentUser extends TUser {
  email: string;
}
