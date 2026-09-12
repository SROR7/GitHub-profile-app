const axios = require("axios");

const GITHUB_API = "https://api.github.com";

const githubApi = axios.create({
  baseURL: GITHUB_API,
  headers: {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28"
  }
});

if (process.env.GITHUB_TOKEN) {
  githubApi.defaults.headers.common.Authorization =
    `Bearer ${process.env.GITHUB_TOKEN}`;
}


// =========================
// Get GitHub User
// =========================

async function getGithubUser(username) {
  const response = await githubApi.get(`/users/${username}`);

  return response.data;
}


// =========================
// Get Repositories
// =========================

async function getGithubRepos(username, page = 1, perPage = 10) {
  const response = await githubApi.get(
    `/users/${username}/repos`,
    {
      params: {
        page,
        per_page: perPage,
        sort: "updated"
      }
    }
  );

  return response.data;
}


// =========================
// Get Followers
// =========================

async function getGithubFollowers(
  username,
  page = 1,
  perPage = 10
) {
  const response = await githubApi.get(
    `/users/${username}/followers`,
    {
      params: {
        page,
        per_page: perPage
      }
    }
  );

  return response.data;
}


// =========================
// Get Following
// =========================

async function getGithubFollowing(
  username,
  page = 1,
  perPage = 10
) {
  const response = await githubApi.get(
    `/users/${username}/following`,
    {
      params: {
        page,
        per_page: perPage
      }
    }
  );

  return response.data;
}


// =========================
// Get Stats
// =========================

async function getGithubStats(username) {
  const user = await getGithubUser(username);

  const repos = await getGithubRepos(
    username,
    1,
    100
  );

  const totalStars = repos.reduce(
    (total, repo) =>
      total + repo.stargazers_count,
    0
  );

  const totalForks = repos.reduce(
    (total, repo) =>
      total + repo.forks_count,
    0
  );

  const languages = {};

  repos.forEach((repo) => {
    if (repo.language) {
      languages[repo.language] =
        (languages[repo.language] || 0) + 1;
    }
  });

  return {
    username: user.login,
    name: user.name,

    public_repos: user.public_repos,

    followers: user.followers,

    following: user.following,

    total_stars: totalStars,

    total_forks: totalForks,

    languages
  };
}


module.exports = {
  getGithubUser,
  getGithubRepos,
  getGithubFollowers,
  getGithubFollowing,
  getGithubStats
};