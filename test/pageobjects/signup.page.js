const BasePage = require('./base.page');

class SignUpPage extends BasePage {
  #selectors = Object.freeze({
    heading: 'main h1',
    emailInput: '#sign-up-email',
    firstNameInput: '#sign-up-first-name',
    lastNameInput: '#sign-up-last-name',
    passwordInput: '#sign-up-password',
    passwordError: '#sign-up-password_message',
    termsCheckbox: '#sign-up-terms',
    submitButton: 'form[aria-label="signup-form"] button[type="submit"]',
  });

  get heading() { return $(this.#selectors.heading); }
  get emailInput() { return $(this.#selectors.emailInput); }
  get firstNameInput() { return $(this.#selectors.firstNameInput); }
  get lastNameInput() { return $(this.#selectors.lastNameInput); }
  get passwordInput() { return $(this.#selectors.passwordInput); }
  get passwordError() { return $(this.#selectors.passwordError); }
  get termsCheckbox() { return $(this.#selectors.termsCheckbox); }
  get submitButton() { return $(this.#selectors.submitButton); }

  async open() {
    await super.open('/sign-up');
    await this.emailInput.waitForDisplayed({ timeout: 30000 });
  }

  async fillBusinessForm({ email, firstName, lastName, password }) {
    await this.emailInput.setValue(email);
    await this.firstNameInput.setValue(firstName);
    await this.lastNameInput.setValue(lastName);
    await this.passwordInput.setValue(password);
  }
}

module.exports = new SignUpPage();
