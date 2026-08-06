const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
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
const specsDirectory = path.join(projectRoot, 'test', 'specs');
const matchingSpecs = fs.readdirSync(specsDirectory)
  .filter((fileName) => fileName.endsWith('.e2e.js'))
  .filter((fileName) => fs.readFileSync(path.join(specsDirectory, fileName), 'utf8')
    .toLowerCase()
    .includes(testName.toLowerCase()));

const wdioArguments = [wdioCliPath, 'run', configPath];
if (matchingSpecs.length === 1) {
  wdioArguments.push('--spec', path.join(specsDirectory, matchingSpecs[0]));
}
wdioArguments.push('--mochaOpts.grep', testName);

console.log(`Running test matching "${testName}" in ${browserName} (${modeName})...`);
if (matchingSpecs.length === 1) console.log(`Selected spec: ${matchingSpecs[0]}`);

const result = spawnSync(
  process.execPath,
  wdioArguments,
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
