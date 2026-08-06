class BasePage {
  #selectors = Object.freeze({
    cookieBanner: '#onetrust-banner-sdk',
    cookieCloseButton: '#onetrust-close-btn-container button',
    cookieAcceptButton: '#onetrust-accept-btn-handler',
  });

  get cookieBanner() { return $(this.#selectors.cookieBanner); }
  get cookieCloseButton() { return $(this.#selectors.cookieCloseButton); }
  get cookieAcceptButton() { return $(this.#selectors.cookieAcceptButton); }

  async open(path = '/', closeCookies = true) {
    await browser.url(path);
    await browser.waitUntil(
      async () => (await browser.execute(() => document.readyState)) !== 'loading',
      { timeout: 30000, timeoutMsg: `Page ${path} did not finish loading` },
    );
    if (closeCookies) await this.closeCookieBannerIfPresent();
  }

  async getVisibleElement(elementsProvider, description = 'element') {
    let visibleElement;
    await browser.waitUntil(async () => {
      const elements = await elementsProvider();
      for (const element of elements) {
        if (await element.isDisplayed()) {
          visibleElement = element;
          return true;
        }
      }
      return false;
    }, { timeout: 20000, timeoutMsg: `No visible ${description} found` });
    return visibleElement;
  }

  async getNormalizedText(element) {
    return (await element.getText()).replace(/\s+/g, ' ').trim();
  }

  async closeCookieBannerIfPresent() {
    const banner = await this.cookieBanner;
    if (!(await banner.isExisting()) || !(await banner.isDisplayed())) return false;

    const closeButton = await this.cookieCloseButton;
    const acceptButton = await this.cookieAcceptButton;
    const closeButtonIsVisible = (await closeButton.isExisting()) && (await closeButton.isDisplayed());
    const acceptButtonIsVisible = (await acceptButton.isExisting()) && (await acceptButton.isDisplayed());
    const button = closeButtonIsVisible ? closeButton : (acceptButtonIsVisible ? acceptButton : null);

    if (!button) return false;

    await button.click();
    await banner.waitForDisplayed({ reverse: true, timeout: 10000 });
    return true;
  }
}

module.exports = BasePage;
