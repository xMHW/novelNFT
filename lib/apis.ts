import axios from "axios";

export const fetchPosts = async () => {
  const { data: posts } = await axios.get("/api/posts");
  return posts;
};

export const fetchContests = async () => {
  const { data: contests } = await axios.get("/api/contests");
  return contests;
};

export const fetchContest = async (contestID) => {
  const { data: contest } = await axios.get(`/api/contests/${contestID}`);
  return contest;
};