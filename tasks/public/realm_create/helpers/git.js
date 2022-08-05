const {
  git
} = ateos;

export const init = async (info) => {
  // Initialize repository, add all files to git and create first commit.
  const timestamp = ateos.datetime.now() / 1000;
  const timezoneOffset = ateos.datetime().utcOffset();

  const repo = {
    fs: ateos.fs,
    dir: info.cwd
  };

  await git.init({
    ...repo,
    defaultBranch: "main" // TODO: should be configurable
  });

  if (info.gitName) {
    await git.setConfig({
      ...repo,
      path: "user.name",
      value: info.gitName
    });
  }
  if (info.gitEmail) {
    await git.setConfig({
      ...repo,
      path: "user.email",
      value: info.gitEmail
    });
  }

  const files = await ateos.glob([
    "**/*",
    "!node_modules/**/*",
    "!.git/**/*"
  ], {
    cwd: info.cwd,
    dot: true,
    nodir: true
  });

  for (const filepath of files) {
    // eslint-disable-next-line no-await-in-loop
    await git.add({
      ...repo,
      filepath
    });
  }

  const sha = await git.commit({
    ...repo,
    author: {
      name: "ATEOS",
      email: "info@ateos.tech",
      timestamp,
      timezoneOffset    
    },
    message: `Auto initial commit (Ateos v${ateos.package.version}):\n\n${ateos.LOGO}`
  });

  return sha;
};
