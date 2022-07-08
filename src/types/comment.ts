export type Comment = {
  comment: CommentData;
};

export type CommentData = {
  author: string;
  commentedTo: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
};
