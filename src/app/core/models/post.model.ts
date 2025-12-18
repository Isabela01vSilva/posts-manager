import { IComment } from "./comment.model";

export interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
  comments: IComment[];
}
