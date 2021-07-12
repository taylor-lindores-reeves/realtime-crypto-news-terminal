import { NextApiRequest, NextApiResponse } from "next";
import { Post, fetchPosts } from "../../services/posts";

interface Response {
  posts: {
    bearish: Post[];
    bullish: Post[];
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  try {
    const posts = await fetchPosts();

    return res.status(200).json({ posts });
  } catch (error) {
    res.status(404).json(error);
  }
}
