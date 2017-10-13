import manifest from './manifest.json';
/**
 * Function that mutates original webpack config.
 * Supports asynchronous changes when promise is returned.
 *
 * @param {object} config - original webpack config.
 * @param {object} env - options passed to CLI.
 * @param {WebpackConfigHelpers} helpers - object with useful helpers when working with config.
 **/
export default function (config, env, helpers) {
  /** you can change config here **/
  const htmlWebpackPlugin = helpers.getPluginsByName(config, 'HtmlWebpackPlugin')[0];

  htmlWebpackPlugin.plugin.options.title = manifest.name;
}