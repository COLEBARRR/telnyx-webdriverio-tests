const BasePage = require('./base.page');

class ContactPage extends BasePage {
  #selectors = Object.freeze({
    heading: 'main h1',
    form: '#mktoForm_1987',
    submitButton: '#mktoForm_1987 button[type="submit"]',
    validationErrors: '#mktoForm_1987 .mktoError',
  });

  get heading() { return $(this.#selectors.heading); }
  get form() { return $(this.#selectors.form); }
  get submitButton() { return $(this.#selectors.submitButton); }
  get validationErrors() { return $$(this.#selectors.validationErrors); }

  async open() {
    await super.open('/contact-us');
    await this.submitButton.waitForDisplayed({ timeout: 30000 });
  }

  async submitEmptyForm() {
    await this.submitButton.click();
    await browser.waitUntil(async () => (await this.validationErrors).length > 0, {
      timeout: 10000,
      timeoutMsg: 'Expected validation errors after submitting the empty form',
    });
  }
}

module.exports = new ContactPage();
