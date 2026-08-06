const mainPage = require('../pageobjects/main.page');

describe('Telnyx interactive features', () => {
  it('TC-09: exposes the basic Chat to an Agent controls', async () => {
    await mainPage.open();
    const { input, sendButton } = await mainPage.openChat();
    await expect(input).toBeDisplayed();
    await expect(sendButton).toBeDisplayed();
  });

  it('TC-10: closes the cookie banner when it is shown', async () => {
    await browser.deleteCookies();
    await mainPage.open(false);
    const banner = await mainPage.cookieBanner;

    if ((await banner.isExisting()) && (await banner.isDisplayed())) {
      expect(await mainPage.closeCookieBannerIfPresent()).toBe(true);
      await expect(banner).not.toBeDisplayed();
    } else {
      await expect(mainPage.heading).toBeDisplayed();
    }
  });
});
