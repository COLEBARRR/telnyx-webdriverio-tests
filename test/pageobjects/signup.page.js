const BasePage = require('./base.page');

class SignUpPage extends BasePage {
  get heading() { return $('h1=Create your account'); }
  get emailInput() { return $('#sign-up-email'); }
  get firstNameInput() { return $('#sign-up-first-name'); }
  get lastNameInput() { return $('#sign-up-last-name'); }
  get passwordInput() { return $('#sign-up-password'); }
  get termsCheckbox() { return $('#sign-up-terms'); }
  get submitButton() { return $('form[aria-label="signup-form"] button[type="submit"]'); }
  get passwordError() { return $('//*[contains(normalize-space(), "Password must")]'); }

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
