const pricingPage = require('../pageobjects/pricing.page');

describe('Telnyx pricing pages', () => {
  it('TC-03: displays the Download pricing section on SIP Trunking pricing', async () => {
    await pricingPage.openSipTrunking();
    await expect(pricingPage.heading).toBeDisplayed();
    expect(await pricingPage.getNormalizedText(pricingPage.heading)).toContain('SIP Trunking pricing');
    expect(await pricingPage.getSectionHeadingTexts()).toContain('Download pricing');
  });

  it('TC-06: loads the main Pricing page successfully', async () => {
    await pricingPage.open();
    const sipTrunkingLink = await pricingPage.getSipTrunkingLink();
    await expect(browser).toHaveUrl(expect.stringContaining('/pricing'));
    await expect(pricingPage.heading).toBeDisplayed();
    expect(await pricingPage.getNormalizedText(pricingPage.heading)).toBe('Pricing');
    expect(await pricingPage.getSectionHeadingTexts()).toContain('Communications');
    await expect(sipTrunkingLink).toBeDisplayed();
  });

  it('TC-14: displays key Communications pricing links', async () => {
    await pricingPage.open();
    const sipTrunkingLink = await pricingPage.getSipTrunkingLink();
    const messagingLink = await pricingPage.getMessagingLink();
    await expect(sipTrunkingLink).toBeDisplayed();
    await expect(messagingLink).toBeDisplayed();
  });

  it('TC-15: displays country and currency selectors on SIP pricing', async () => {
    await pricingPage.openSipTrunking();
    await expect(pricingPage.countrySelect).toBeDisplayed();
    await expect(pricingPage.currencySelect).toBeDisplayed();
  });
});
