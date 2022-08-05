const {
  package: pkg
} = ateos;

export default {
  tags: ["release", "tasks", "info", "share"],
  targets: {
    gitea: {
      url: "https://gitea.recalibrated.systems",
      owner: "metamorph",
      repo: "ateos",
      draft: false,
      name: `Release v${pkg.version}`,
      prerelease: false,
      tag_name: `v${pkg.version}`,
      // target_commitish	string
    }
  }
};
