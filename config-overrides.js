const { overrideDevServer } = require('customize-cra');

module.exports = {
  devServer: overrideDevServer((config) => {
    config.allowedHosts = ['localhost:9999']; // 원하는 호스트명으로 대체
    return config;
  }),
};