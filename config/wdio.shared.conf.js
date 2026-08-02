const { getEnvironment } = require('./environments');

const environment = getEnvironment();

function isHeadless() {
  return process.env.HEADLESS !== 'false';
}

const sharedConfig = {
  runner: 'local',
  specs: ['../test/specs/**/*.e2e.js'],
  exclude: [],
  maxInstances: 1,
  logLevel: 'error',
  bail: 0,
  baseUrl: environment.baseUrl,
  waitforTimeout: 20000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 2,
  framework: 'mocha',
  reporters: [
    'spec',
    ['allure', {
      outputDir: 'allure-results',
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: false,
      reportedEnvironmentVars: {
        TEST_ENV: environment.name,
        BASE_URL: environment.baseUrl,
      },
    }],
  ],
  mochaOpts: {
    ui: 'bdd',
    timeout: 120000,
  },
  afterTest: async function afterTest(test, context, { error }) {
    if (error) await browser.takeScreenshot();
  },
};

module.exports = { sharedConfig, isHeadless };
