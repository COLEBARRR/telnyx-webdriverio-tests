const BasePage = require('./base.page');

class MainPage extends BasePage {
  get homeLink() { return $('header a[href="/"]'); }
  get heading() { return $('main h1'); }
  get contactUsLinksSelector() { return 'header a[href$="/contact-us"]'; }
  get signUpLinksSelector() { return 'header a[href="/sign-up"]'; }
  get loginLinksSelector() { return 'header a[href^="https://portal.telnyx.com"]'; }
  get careersLink() { return $('footer a[href="/careers"]'); }
  get chatInputSelector() { return 'input[placeholder="Type message here"]'; }
  get chatSendButtonSelector() { return '//button[contains(normalize-space(), "SEND MESSAGE")]'; }
  get linkedInLink() { return $('footer a[href*="linkedin.com/company/telnyx"]'); }
  get xLink() { return $('footer a[href*="x.com/telnyx"]'); }
  get facebookLink() { return $('footer a[href*="facebook.com/Telnyx"]'); }

  async open(closeCookies = true) { await super.open('/', closeCookies); }

  async getContactUsLink() { return this.getVisibleElement(this.contactUsLinksSelector); }
  async getSignUpLink() { return this.getVisibleElement(this.signUpLinksSelector); }
  async getLoginLink() { return this.getVisibleElement(this.loginLinksSelector); }

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
    await browser.execute(() => {
      const heading = [...document.querySelectorAll('h2')]
        .find((element) => element.textContent.includes('Infrastructure for AI agents'));
      heading?.scrollIntoView({ block: 'center' });
    });
    const input = await this.getVisibleElement(this.chatInputSelector);
    const sendButton = await this.getVisibleElement(this.chatSendButtonSelector);
    return { input, sendButton };
  }
}

module.exports = new MainPage();
