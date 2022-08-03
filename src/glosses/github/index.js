ateos.lazify({
  GitHub: "./github",
  Gist: "./gist",
  User: "./user",
  Issue: "./issue",
  Search: "./search",
  RateLimit: "./rate_limit",
  Repository: "./repository",
  Organization: "./organization",
  Team: "./team",
  Markdown: "./markdown",
  Project: "./project",
  GitHubReleaseManager: "./release_manager"
}, ateos.asNamespace(exports), require);

export const apiBase = "https://api.github.com";
