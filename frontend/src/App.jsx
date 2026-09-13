import { useState } from "react";
import {
  ArrowUpRight,
  MapPin,
  Building2,
  Search,
  Star,
  GitFork,
  Code2,
  ExternalLink,
  GitBranch,
} from "lucide-react";

import { getGithubUser, getGithubRepos } from "./services/githubApi";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (event) => {
    event.preventDefault();

    const value = username.trim();

    if (!value) {
      setError("Enter a GitHub username.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setUser(null);
      setRepos([]);

      const [userResult, reposResult] = await Promise.all([
        getGithubUser(value),
        getGithubRepos(value),
      ]);

      setUser(userResult.data);
      setRepos(reposResult.data || []);
    } catch (err) {
      console.error(err);

      if (err.response?.status === 404) {
        setError("GitHub user not found.");
      } else {
        setError("Unable to fetch GitHub profile.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="site">

      {/* NAVBAR */}

      <nav className="navbar">

        <a href="/" className="brand">
           Gitdevelopers<span>.</span>
        </a>

        <div className="nav-links">
          <a href="#profile">Profile</a>
          <a href="#repositories">Projects</a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
          >
            GitHub <ArrowUpRight size={15} />
          </a>
        </div>

      </nav>

      {/* HERO */}

      <section className="hero">

        <div className="hero-label">
          <span className="status-dot" />
          GITHUB PROFILE EXPLORER
        </div>

        <h1>
          Discover
          <br />Git
          <span>developers.</span>
        </h1>

        <p className="hero-description">
          Explore GitHub profiles, repositories and developer
          activity through a clean and modern interface.
        </p>

        <form
          className="hero-search"
          onSubmit={handleSearch}
        >

          <GitBranch size={21} />

          <input
            type="text"
            placeholder="Search GitHub username..."
            value={username}
            onChange={(event) =>
              setUsername(event.target.value)
            }
          />

          <button type="submit">
            <Search size={18} />
            Search
          </button>

        </form>

        {loading && (
          <div className="loading">
            <span />
            Fetching GitHub data...
          </div>
        )}

        {error && (
          <div className="error">
            {error}
          </div>
        )}

      </section>

      {/* PROFILE */}

      {user && (
        <section
          className="profile-section"
          id="profile"
        >

          <div className="section-header">
            <span>01</span>
            <p>PROFILE</p>
          </div>

          <div className="profile-grid">

            <div className="profile-intro">

              <img
                src={user.avatar_url}
                alt={user.login}
                className="profile-avatar"
              />

              <div>
                <div className="profile-name-row">
                  <h2>
                    {user.name || user.login}
                  </h2>

                  <a
                    href={user.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="icon-link"
                  >
                    <ExternalLink size={18} />
                  </a>
                </div>

                <p className="handle">
                  @{user.login}
                </p>
              </div>

            </div>

            <div className="profile-info">

              {user.bio && (
                <p className="bio">
                  {user.bio}
                </p>
              )}

              <div className="meta">

                {user.location && (
                  <span>
                    <MapPin size={16} />
                    {user.location}
                  </span>
                )}

                {user.company && (
                  <span>
                    <Building2 size={16} />
                    {user.company}
                  </span>
                )}

              </div>

            </div>

          </div>

          {/* STATS */}

          <div className="stats">

            <div className="stat">
              <span>REPOSITORIES</span>
              <strong>
                {user.public_repos}
              </strong>
            </div>

            <div className="stat">
              <span>FOLLOWERS</span>
              <strong>
                {user.followers}
              </strong>
            </div>

            <div className="stat">
              <span>FOLLOWING</span>
              <strong>
                {user.following}
              </strong>
            </div>

          </div>

        </section>
      )}

      {/* REPOSITORIES */}

      {user && (
        <section
          className="repositories"
          id="repositories"
        >

          <div className="section-header">
            <span>02</span>
            <p>SELECTED PROJECTS</p>
          </div>

          <div className="repo-grid">

            {repos.slice(0, 6).map((repo, index) => (

              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                className="repo-card"
              >

                <div className="repo-top">

                  <span className="repo-number">
                    0{index + 1}
                  </span>

                  <ArrowUpRight size={20} />

                </div>

                <div className="repo-content">

                  <h3>
                    {repo.name}
                  </h3>

                  <p>
                    {repo.description ||
                      "No description available."}
                  </p>

                </div>

                <div className="repo-footer">

                  {repo.language && (
                    <span className="language">
                      <Code2 size={15} />
                      {repo.language}
                    </span>
                  )}

                  <span>
                    <Star size={15} />
                    {repo.stargazers_count}
                  </span>

                  <span>
                    <GitFork size={15} />
                    {repo.forks_count}
                  </span>

                </div>

              </a>

            ))}

          </div>

        </section>
      )}

      {/* FOOTER */}

      <footer>

        <div>
          <GitBranch size={20} />
          <span>GitHub Profile Explorer</span>
        </div>

        <p>
          Built with React + Node.js
        </p>

      </footer>

    </main>
  );
}

export default App;