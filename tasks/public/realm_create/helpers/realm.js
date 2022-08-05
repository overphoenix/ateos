const {
  realm
} = ateos;

export const createConfig = ({ cwd, ext, ...props }) => {
  const config = new realm.Configuration({
    cwd
  });
  config.merge(props);
  return config.save({ ext });
};

export const loadConfig = async ({ cwd } = {}) => realm.Configuration.load({ cwd });

export const createDevConfig = ({ cwd, ext, ...props } = {}) => {
  const config = new realm.DevConfiguration({
    cwd
  });

  config.merge(props);
  return config.save({ ext });
};
