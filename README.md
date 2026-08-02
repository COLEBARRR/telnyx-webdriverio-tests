# Telnyx WebdriverIO E2E Tests

This repository contains an end-to-end test suite for the **Telnyx** website, built with **WebdriverIO**, **Mocha**, and the **Page Object Model (POM)** design pattern.

The project includes 20 automated tests covering homepage content, navigation, pricing pages, Sign Up and Contact Us validation, Careers, company pages, chat controls, cookie handling, and footer links. The same tests can run in Chrome, Firefox, and Microsoft Edge, against production or staging environments.

## Quick Links

- **GitHub Repository:** [View Repository](https://github.com/COLEBARRR/telnyx-webdriverio-tests)
- **CI/CD Pipeline:** [View GitHub Actions Runs](https://github.com/COLEBARRR/telnyx-webdriverio-tests/actions)
- **Test Reports:** [View Test Reports](https://colebarrr.github.io/telnyx-webdriverio-tests/)

## Prerequisites

Install the following software:

- Node.js and npm
- Google Chrome
- Mozilla Firefox for Firefox runs
- Microsoft Edge for Edge runs
- Java 8 or newer for generating and opening Allure reports
- Docker Desktop for containerized local runs

Check Node.js, npm, and Java:

```bash
node -v
npm -v
java -version
docker --version
docker compose version
```

WebdriverIO automatically obtains compatible browser drivers when a run starts.

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/COLEBARRR/telnyx-webdriverio-tests.git
cd telnyx-webdriverio-tests
npm install
```

## Running Tests

### Default headless run

```bash
npm test
```

The default command runs all tests in headless Chrome against production.

The explicit command required for running all test files is:

```bash
npm run test:all
```

### Headless and headed Chrome

```bash
npm run test:headless
npm run test:headed
```

### Run a single spec file

```bash
npm run test:file -- --spec ./test/specs/telnyx.e2e.js
```

### Run one test by its title

Choose the browser, headed or headless mode, and any unique part of the test title:

```bash
npm run test:one -- --browser firefox --mode headed --test "TC-12"
```

Supported browser values are `chrome`, `firefox`, and `edge`. Supported mode values are `headed` and `headless`. Chrome and headless mode are used by default, so the shortest form is:

```bash
npm run test:one -- --test "TC-12"
```

### Browser-specific runs

```bash
npm run test:chrome
npm run test:firefox
npm run test:edge
```

Run the complete suite sequentially in all three browsers:

```bash
npm run test:all:browsers
```

## Docker

The project supports the same two-container test environment locally and in GitHub Actions:

```text
tests container (Node.js + WebdriverIO + Allure)
    -> Selenium container (Selenium Server + ChromeDriver + Chrome)
```

The `tests` image is built from `Dockerfile`. The browser uses the pinned official `selenium/standalone-chrome` image. Docker Compose waits until Selenium is healthy before starting WebdriverIO.

Run the complete Docker test suite locally:

```bash
npm run docker:test
```

This command builds the project image, starts both containers, runs all 20 tests, generates the Allure HTML report, and returns the WebdriverIO exit code.

Temporarily stop the existing containers without deleting them:

```bash
npm run docker:stop
```

Start the same containers again without rebuilding their images:

```bash
npm run docker:start
```

The `tests` container runs its existing test command again and exits when the test run finishes. If the project code or dependencies have changed, rebuild and recreate the containers instead:

```bash
docker compose up --build
```

Stop and remove the Compose containers and volumes:

```bash
npm run docker:down
```

In short: use `docker:stop` for a temporary shutdown, `docker:start` to restart unchanged containers, `docker compose up --build` after project changes, and `docker:down` to delete the Compose environment completely.

Build the project image without running tests:

```bash
npm run docker:build
```

Select staging for a Docker run in PowerShell:

```powershell
$env:TEST_ENV='staging'
npm run docker:test
```

Docker writes the generated files back to the host through bind mounts:

```text
allure-results/
allure-report/
```

These generated directories are ignored by Git.

## Environments

The supported environment names and URLs are stored in `config/environments.js`.

- `production` uses `https://telnyx.com`.
- `staging` temporarily uses `https://telnyx.com` until a dedicated staging URL is supplied.

Run headless Chrome against staging:

```bash
npm run test:staging
```

Run staging in another browser:

```bash
npm run test:staging:firefox
npm run test:staging:edge
```

The scripts set `TEST_ENV` through `cross-env`, so they work on Windows, Linux, macOS, and in CI.

## Allure Reports

Every test run writes Allure result files to `allure-results/`.

Generate the HTML report:

```bash
npm run allure:generate
```

Open an already generated report:

```bash
npm run allure:open
```

Generate and open it with one command:

```bash
npm run allure:report
```

Alternatively, build and serve a temporary report directly from the results:

```bash
npm run allure:serve
```

Failed tests automatically add a browser screenshot to the Allure results.

## Project Structure

```text
config/
  environments.js          Environment names and base URLs
  wdio.shared.conf.js      Shared WebdriverIO and Allure settings
  wdio.chrome.conf.js      Chrome capabilities
  wdio.firefox.conf.js     Firefox capabilities
  wdio.edge.conf.js        Microsoft Edge capabilities
  wdio.docker.conf.js      Remote Selenium connection used by Docker
test/
  data/                    Test data
  pageobjects/             Page Object classes and selectors
  specs/                   WebdriverIO test specs
package.json               npm commands and dependencies
Dockerfile                 WebdriverIO test-runner image
compose.yaml               Test runner and Selenium Chrome services
.dockerignore              Files excluded from the Docker build context
```

## Architecture

Page-specific selectors and actions are kept in `test/pageobjects/`. The spec file contains readable test behavior and assertions without duplicating page implementation details.

The shared WebdriverIO configuration contains the base URL selection, timeouts, Mocha settings, the spec reporter, Allure integration, and failure screenshots. Each local browser configuration extends these shared settings with its own capabilities and command-line arguments. The Docker configuration extends the same settings but sends commands to the remote Selenium service at `selenium:4444`.

## Test Coverage

The 20 tests cover:

- Homepage loading, hero content, and primary header links
- Contact Us navigation and empty-form validation
- Sign Up invalid-email and weak-password validation
- Pricing and SIP Trunking pages
- Careers navigation and Greenhouse vacancies
- AI chat controls and cookie-banner behavior
- Our Network, Global Coverage, and Privacy Policy pages
- Telnyx social-media links

## CI/CD

The workflow is stored in `.github/workflows/webdriverio-pages.yml` and runs automatically for:

- Pushes to `main`
- Pull requests targeting `main`
- Manual runs from the Actions tab

The pipeline uses Docker Compose as its default and only test execution path. It performs these steps:

1. Checks out the repository.
2. Builds the `tests` Docker image.
3. Starts the WebdriverIO and Selenium Chrome containers.
4. Runs all WebdriverIO tests through the remote Selenium browser.
5. Generates the Allure HTML report inside the test container even when a test fails.
6. Stops and removes the temporary containers.
7. Uploads the report as a downloadable GitHub Actions artifact.
8. On `main`, deploys the same report to GitHub Pages.
9. Preserves the failed Docker test status through a final quality-gate job.

### Enable GitHub Pages

After the first push:

1. Open the repository on GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment → Source**, select **GitHub Actions**.
4. Open **Actions** and run **WebdriverIO Tests and Allure Report**, or push another commit to `main`.
5. Open the `deploy-report` job to find the published Pages URL.

The expected report address normally has this format:

```text
https://OWNER.github.io/REPOSITORY/
```

No repository secrets are required for this workflow. GitHub supplies the short-lived `GITHUB_TOKEN` and Pages identity token automatically.
