export interface PostCommentInterface {
  id: number;

  postId: number | null;

  body: string;

  createdAt: Date;
}
