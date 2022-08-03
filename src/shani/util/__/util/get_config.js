const { shani: { util: { __ } } } = ateos;

export default function getConfig(custom) {
  return Object.assign({}, __.util.defaultConfig, custom);
}
