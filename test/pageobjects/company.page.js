const BasePage = require('./base.page');

class CompanyPage extends BasePage {
  get careersHeading() { return $('h1=Shape your future at Telnyx'); }
  get greenhouseLinks() { return $$('a[href*="greenhouse.io"]'); }
  get networkHeading() { return $('h1=Our private, global network'); }
  get coverageHeading() { return $('h1=Global communications'); }
  get privacyHeading() { return $('h1=Privacy Policy'); }

  async openCareers() { await super.open('/careers'); }
  async openNetwork() { await super.open('/our-network'); }
  async openCoverage() { await super.open('/global-coverage'); }
  async openPrivacy() { await super.open('/privacy-policy'); }
}

module.exports = new CompanyPage();
