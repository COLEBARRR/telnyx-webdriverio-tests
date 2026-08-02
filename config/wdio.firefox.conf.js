const { sharedConfig, isHeadless } = require('./wdio.shared.conf');

const args = ['--width=1920', '--height=1080'];
if (isHeadless()) args.push('-headless');

exports.config = {
  ...sharedConfig,
  capabilities: [{
    browserName: 'firefox',
    'moz:firefoxOptions': { args },
  }],
};
