export type User = {
  user: UserData;
};

export type UserData = {
  _id: string;
  username: string;
  email: string;
  avatar: string;
  password: string;
  collections: string;
  isBlocked: boolean;
  role: "Admin" | "User";
  createdAt: Date;
  updatedAt: Date;
};
