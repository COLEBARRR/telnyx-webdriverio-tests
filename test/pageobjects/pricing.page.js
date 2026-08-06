const BasePage = require('./base.page');

class PricingPage extends BasePage {
  #selectors = Object.freeze({
    heading: 'main h1',
    sectionHeadings: 'main h2',
    sipTrunkingLinks: 'a[href="/pricing/elastic-sip"]',
    messagingLinks: 'a[href="/pricing/messaging"]',
    countrySelect: 'button#country-filter[role="combobox"]',
    currencySelect: 'button#currency-filter[role="combobox"]',
  });

  get heading() { return $(this.#selectors.heading); }
  get sectionHeadings() { return $$(this.#selectors.sectionHeadings); }
  get sipTrunkingLinks() { return $$(this.#selectors.sipTrunkingLinks); }
  get messagingLinks() { return $$(this.#selectors.messagingLinks); }
  get countrySelect() { return $(this.#selectors.countrySelect); }
  get currencySelect() { return $(this.#selectors.currencySelect); }

  async open() { await super.open('/pricing'); }
  async openSipTrunking() { await super.open('/pricing/elastic-sip'); }
  async getSipTrunkingLink() {
    return this.getVisibleElement(() => this.sipTrunkingLinks, 'SIP Trunking link');
  }

  async getMessagingLink() {
    return this.getVisibleElement(() => this.messagingLinks, 'Messaging link');
  }

  async getSectionHeadingTexts() {
    const headings = await this.sectionHeadings;
    const texts = [];
    for (let index = 0; index < headings.length; index += 1) {
      texts.push(await this.getNormalizedText(headings[index]));
    }
    return texts;
  }
}

module.exports = new PricingPage();
