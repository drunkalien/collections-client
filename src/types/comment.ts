export type Comment = {
  comments: CommentData[];
};

export type CommentData = {
  _id: string;
  author: string;
  commentedTo: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
};
