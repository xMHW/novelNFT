import axios from "axios";

export const fetchPosts = async () => {
  const { data: posts } = await axios.get("/api/posts");
  return posts;
};

export const fetchContests = async () => {
  const { data: contests } = await axios.get("/api/contests");
  return contests;
};