const BasePage = require('./base.page');

class PricingPage extends BasePage {
  get heading() { return $('h1=Pricing'); }
  get communicationsHeading() { return $('h2=Communications'); }
  get sipTrunkingLinksSelector() { return 'a[href="/pricing/elastic-sip"]'; }
  get messagingLinksSelector() { return 'a[href="/pricing/messaging"]'; }
  get sipHeading() { return $('h1=SIP Trunking pricing'); }
  get downloadPricingHeading() { return $('h2=Download pricing'); }
  get countrySelect() { return $('button#country-filter[role="combobox"]'); }
  get currencySelect() { return $('button#currency-filter[role="combobox"]'); }

  async open() { await super.open('/pricing'); }
  async openSipTrunking() { await super.open('/pricing/elastic-sip'); }
  async getSipTrunkingLink() { return this.getVisibleElement(this.sipTrunkingLinksSelector); }
  async getMessagingLink() { return this.getVisibleElement(this.messagingLinksSelector); }
}

module.exports = new PricingPage();
