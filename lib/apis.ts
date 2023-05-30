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

export const fetchSubmissions = async (contestID) => {
  const { data: submissions } = await axios.get(`/api/contests/submissions/${contestID}`);
  return submissions;
};

export const submitContest = async (userID, contestID, url) => {
  const dataObj = {
    "userID": userID,
    "url": url,
    "author": "test_author",
    "title": "test_title",
    "concept": "test_concept"
  }

  const { data: contest_submissions } = await axios.post(
    `/api/contests/submissions/${contestID}`,
    dataObj,
  );
  console.log(contest_submissions)
  return contest_submissions[0];
}