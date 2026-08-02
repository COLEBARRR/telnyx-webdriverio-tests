const { spawnSync } = require('node:child_process');
const path = require('node:path');

function readOption(argumentsList, optionName) {
  const equalsPrefix = `${optionName}=`;
  const equalsArgument = argumentsList.find((argument) => argument.startsWith(equalsPrefix));
  if (equalsArgument) return equalsArgument.slice(equalsPrefix.length);

  const optionIndex = argumentsList.indexOf(optionName);
  return optionIndex >= 0 ? argumentsList[optionIndex + 1] : undefined;
}

const argumentsList = process.argv.slice(2);
const browserName = (readOption(argumentsList, '--browser') || 'chrome').toLowerCase();
const modeName = (readOption(argumentsList, '--mode') || 'headless').toLowerCase();
const testName = readOption(argumentsList, '--test');

const supportedBrowsers = new Set(['chrome', 'firefox', 'edge']);
const supportedModes = new Set(['headed', 'headless']);

if (!supportedBrowsers.has(browserName)) {
  console.error(`Unknown browser "${browserName}". Use chrome, firefox, or edge.`);
  process.exit(1);
}

if (!supportedModes.has(modeName)) {
  console.error(`Unknown mode "${modeName}". Use headed or headless.`);
  process.exit(1);
}

if (!testName) {
  console.error(
    'Test name is required. Example: npm run test:one -- --browser firefox --mode headed --test "TC-12"',
  );
  process.exit(1);
}

const projectRoot = path.resolve(__dirname, '..');
const configPath = path.join(projectRoot, 'config', `wdio.${browserName}.conf.js`);
const wdioCliPath = path.join(projectRoot, 'node_modules', '@wdio', 'cli', 'bin', 'wdio.js');

console.log(`Running test matching "${testName}" in ${browserName} (${modeName})...`);

const result = spawnSync(
  process.execPath,
  [wdioCliPath, 'run', configPath, '--mochaOpts.grep', testName],
  {
    cwd: projectRoot,
    stdio: 'inherit',
    env: {
      ...process.env,
      HEADLESS: String(modeName === 'headless'),
      TEST_ENV: process.env.TEST_ENV || 'production',
    },
  },
);

if (result.error) {
  console.error(result.error.message);
  process.exit(1);
}

process.exit(result.status ?? 1);
