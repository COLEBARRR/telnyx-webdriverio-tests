const BasePage = require('./base.page');

class CompanyPage extends BasePage {
  #selectors = Object.freeze({
    heading: 'main h1',
    greenhouseLinks: 'a[href*="greenhouse.io"]',
  });

  get heading() { return $(this.#selectors.heading); }
  get greenhouseLinks() { return $$(this.#selectors.greenhouseLinks); }

  async openCareers() { await super.open('/careers'); }
  async openNetwork() { await super.open('/our-network'); }
  async openCoverage() { await super.open('/global-coverage'); }
  async openPrivacy() { await super.open('/privacy-policy'); }
}

module.exports = new CompanyPage();
