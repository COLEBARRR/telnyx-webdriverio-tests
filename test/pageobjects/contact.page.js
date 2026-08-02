const BasePage = require('./base.page');

class ContactPage extends BasePage {
  get heading() { return $('h1=Talk to an expert'); }
  get form() { return $('#mktoForm_1987'); }
  get submitButton() { return $('#mktoForm_1987 button[type="submit"]'); }

  async open() {
    await super.open('/contact-us');
    await this.submitButton.waitForDisplayed({ timeout: 30000 });
  }

  async submitEmptyForm() {
    await this.submitButton.click();
    await browser.waitUntil(async () => (await $$('.mktoError')).length > 0, {
      timeout: 10000,
      timeoutMsg: 'Expected validation errors after submitting the empty form',
    });
  }
}

module.exports = new ContactPage();
