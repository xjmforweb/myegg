/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {}

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1659078139899_4770'

  // add your middleware config here
  config.middleware = []

  // add your user config here
  const userConfig = {
    myAppName: 'jira-help',
    cluster: {
      listen: {
        port: 8090
      }
    },
    security: {
      xframe: { enable: false },
      csrf: { enable: false },
    }
  }

  return {
    ...config,
    ...userConfig,
  }
}
