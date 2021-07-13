import { NextApiRequest, NextApiResponse } from "next";
import { Post, fetchAllPosts } from "../../services/posts";

interface Response {
  posts: Post[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  try {
    const { posts } = await fetchAllPosts();
    return res.status(200).json({ posts });
  } catch (error) {
    res.status(404).json(error);
  }
}
