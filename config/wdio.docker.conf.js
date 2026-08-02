const { sharedConfig } = require('./wdio.shared.conf');

exports.config = {
  ...sharedConfig,
  hostname: process.env.SELENIUM_HOST || 'selenium',
  port: Number(process.env.SELENIUM_PORT || 4444),
  protocol: 'http',
  path: '/',
  capabilities: [{
    browserName: 'chrome',
    'goog:chromeOptions': {
      args: [
        '--headless=new',
        '--window-size=1920,1080',
        '--disable-gpu',
      ],
    },
  }],
};
