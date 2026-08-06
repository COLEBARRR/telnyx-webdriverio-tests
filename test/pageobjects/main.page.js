const BasePage = require('./base.page');

class MainPage extends BasePage {
  #selectors = Object.freeze({
    homeLink: 'header a[href="/"]',
    heading: 'main h1',
    contactUsLinks: 'header a[href$="/contact-us"]',
    signUpLinks: 'header a[href="/sign-up"]',
    loginLinks: 'header a[href^="https://portal.telnyx.com"]',
    careersLink: 'footer a[href="/careers"]',
    chatInputs: 'input[aria-label="Type message here"]',
    chatSendButtons: 'form:has(input[aria-label="Type message here"]) button[type="submit"]',
    linkedInLink: 'footer a[href*="linkedin.com/company/telnyx"]',
    xLink: 'footer a[href*="x.com/telnyx"]',
    facebookLink: 'footer a[href*="facebook.com/Telnyx"]',
  });

  get homeLink() { return $(this.#selectors.homeLink); }
  get heading() { return $(this.#selectors.heading); }
  get contactUsLinks() { return $$(this.#selectors.contactUsLinks); }
  get signUpLinks() { return $$(this.#selectors.signUpLinks); }
  get loginLinks() { return $$(this.#selectors.loginLinks); }
  get careersLink() { return $(this.#selectors.careersLink); }
  get chatInputs() { return $$(this.#selectors.chatInputs); }
  get chatSendButtons() { return $$(this.#selectors.chatSendButtons); }
  get linkedInLink() { return $(this.#selectors.linkedInLink); }
  get xLink() { return $(this.#selectors.xLink); }
  get facebookLink() { return $(this.#selectors.facebookLink); }

  async open(closeCookies = true) { await super.open('/', closeCookies); }

  async getContactUsLink() {
    return this.getVisibleElement(() => this.contactUsLinks, 'Contact Us link');
  }

  async getSignUpLink() {
    return this.getVisibleElement(() => this.signUpLinks, 'Sign Up link');
  }

  async getLoginLink() {
    return this.getVisibleElement(() => this.loginLinks, 'Log In link');
  }

  async openContactUsFromHeader() {
    const link = await this.getContactUsLink();
    await link.waitForClickable();
    await link.click();
    await browser.waitUntil(async () => (await browser.getUrl()).includes('/contact-us'));
  }

  async openCareersFromFooter() {
    await this.careersLink.scrollIntoView();
    await this.careersLink.click();
    await browser.waitUntil(async () => (await browser.getUrl()).includes('/careers'));
  }

  async openChat() {
    await browser.execute(() => window.scrollTo({ top: 0 }));
    await browser.waitUntil(async () => {
      const inputs = await this.chatInputs;
      if (inputs.length > 0) {
        await inputs[0].scrollIntoView({ block: 'center' });
        return true;
      }

      return browser.execute(() => {
        const reachedBottom = window.scrollY + window.innerHeight >= document.body.scrollHeight - 1;
        if (!reachedBottom) window.scrollBy({ top: Math.floor(window.innerHeight * 0.75) });
        return false;
      });
    }, {
      timeout: 20000,
      interval: 250,
      timeoutMsg: 'Chat controls were not added to the page while scrolling',
    });

    const input = await this.getVisibleElement(() => this.chatInputs, 'chat input');
    const sendButton = await this.getVisibleElement(() => this.chatSendButtons, 'chat send button');
    return { input, sendButton };
  }
}

module.exports = new MainPage();
