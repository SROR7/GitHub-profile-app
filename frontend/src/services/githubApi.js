import axios from "axios";

const api = axios.create({
  baseURL: "/api/github",
});
export const getGithubUser = async (username) => {
  const response = await api.get(`/${username}`);
  return response.data; 
};

export const getGithubRepos = async (username) => {
  const response = await api.get(`/${username}/repos`);
  return response.data;
};