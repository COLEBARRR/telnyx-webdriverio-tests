const { sharedConfig, isHeadless } = require('./wdio.shared.conf');

const args = ['--window-size=1920,1080', '--disable-gpu'];
if (isHeadless()) args.push('--headless=new');

exports.config = {
  ...sharedConfig,
  capabilities: [{
    browserName: 'chrome',
    'goog:chromeOptions': { args },
    'wdio:enforceWebDriverClassic': true,
  }],
};
