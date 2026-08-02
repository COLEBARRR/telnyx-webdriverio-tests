class BasePage {
  async open(path = '/', closeCookies = true) {
    await browser.url(path);
    await browser.waitUntil(
      async () => (await browser.execute(() => document.readyState)) !== 'loading',
      { timeout: 30000, timeoutMsg: `Page ${path} did not finish loading` },
    );
    if (closeCookies) await this.closeCookieBannerIfPresent();
  }

  async getVisibleElement(selector) {
    let visibleElement;
    await browser.waitUntil(async () => {
      const elements = await $$(selector);
      for (const element of elements) {
        if (await element.isDisplayed()) {
          visibleElement = element;
          return true;
        }
      }
      return false;
    }, { timeout: 20000, timeoutMsg: `No visible element found for ${selector}` });
    return visibleElement;
  }

  async closeCookieBannerIfPresent() {
    const banner = await $('#onetrust-banner-sdk');
    if (!(await banner.isExisting()) || !(await banner.isDisplayed())) return false;
    const closeButton = await $('#onetrust-close-btn-container button');
    const acceptButton = await $('#onetrust-accept-btn-handler');
    const button = (await closeButton.isDisplayed()) ? closeButton : acceptButton;

    await button.click();
    await banner.waitForDisplayed({ reverse: true, timeout: 10000 });
    return true;
  }
}

module.exports = BasePage;
