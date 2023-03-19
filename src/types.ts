export type DeskType = {
  deskAuthor: string;
  deskName: string;
  deskDate: string;
  id: string;
};

export type TaskType = {
  taskName: string;
  id: string;
  perentid: string;
  taskAuthor: string;
  taskDate: string;
  taskDescription: string;
};

export type CommentType = {
  commentText: string;
  id: string;
  perentid: string;
  commentAuthor: string;
  commentDate: string;
};

export type UserType = {
  name: string;
};
