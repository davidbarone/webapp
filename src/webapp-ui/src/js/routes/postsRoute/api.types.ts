export type PostType = {
  id: number;
  slug: string;
  teaser: string;
  content: string;
  author: string;
  createdDt: Date;
};

export type CommentType = {
  id: number;
  postId: number | null;
  commenter: string;
  content: string | null;
  createdDt: Date;
};
