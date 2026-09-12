const express = require("express");

const {
  getGithubUser,
  getGithubRepos,
  getGithubFollowers,
  getGithubFollowing,
  getGithubStats
} = require("../services/githubService");

const router = express.Router();


function handleGithubError(error, res) {

  if (error.response) {

    const status = error.response.status;

    if (status === 404) {
      return res.status(404).json({
        success: false,
        error: "GitHub user not found"
      });
    }

    if (status === 403) {
      return res.status(403).json({
        success: false,
        error: "GitHub API rate limit exceeded"
      });
    }
  }

  console.error(error);

  return res.status(500).json({
    success: false,
    error: "Internal server error"
  });
}



router.get("/:username", async (req, res) => {

  try {

    const { username } = req.params;

    const user = await getGithubUser(username);

    res.json({
      success: true,
      data: user
    });

  } catch (error) {

    handleGithubError(error, res);

  }

});


router.get("/:username/repos", async (req, res) => {

  try {

    const { username } = req.params;

    const page =
      Number(req.query.page) || 1;

    const perPage =
      Number(req.query.per_page) || 10;

    const repos = await getGithubRepos(
      username,
      page,
      perPage
    );

    res.json({
      success: true,

      page,

      per_page: perPage,

      count: repos.length,

      data: repos
    });

  } catch (error) {

    handleGithubError(error, res);

  }

});


router.get("/:username/followers", async (req, res) => {

  try {

    const { username } = req.params;

    const page =
      Number(req.query.page) || 1;

    const perPage =
      Number(req.query.per_page) || 10;

    const followers =
      await getGithubFollowers(
        username,
        page,
        perPage
      );

    res.json({
      success: true,

      page,

      per_page: perPage,

      count: followers.length,

      data: followers
    });

  } catch (error) {

    handleGithubError(error, res);

  }

});

router.get("/:username/following", async (req, res) => {

  try {

    const { username } = req.params;

    const page =
      Number(req.query.page) || 1;

    const perPage =
      Number(req.query.per_page) || 10;

    const following =
      await getGithubFollowing(
        username,
        page,
        perPage
      );

    res.json({
      success: true,

      page,

      per_page: perPage,

      count: following.length,

      data: following
    });

  } catch (error) {

    handleGithubError(error, res);

  }

});


router.get("/:username/stats", async (req, res) => {

  try {

    const { username } = req.params;

    const stats =
      await getGithubStats(username);

    res.json({
      success: true,
      data: stats
    });

  } catch (error) {

    handleGithubError(error, res);

  }

});


module.exports = router;