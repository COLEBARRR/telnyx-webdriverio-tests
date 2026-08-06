const signUpPage = require('../pageobjects/signup.page');
const contactPage = require('../pageobjects/contact.page');
const testData = require('../data/test-data');

describe('Telnyx form validation', () => {
  it('TC-04: rejects an invalid email address on Sign Up', async () => {
    await signUpPage.open();
    await signUpPage.emailInput.setValue(testData.invalidSignUp.email);
    const validity = await browser.execute((input) => ({
      valid: input.checkValidity(),
      message: input.validationMessage,
    }), await signUpPage.emailInput);

    expect(validity.valid).toBe(false);
    expect(validity.message.length).toBeGreaterThan(0);
  });

  it('TC-05: displays validation errors for an empty Contact Us form', async () => {
    await contactPage.open();
    await contactPage.submitEmptyForm();
    const errors = await contactPage.validationErrors;
    expect(errors.length).toBeGreaterThan(0);
    await expect(errors[0]).toBeDisplayed();
  });

  it('TC-08: displays a validation error for a weak Sign Up password', async () => {
    await signUpPage.open();
    await signUpPage.fillBusinessForm({
      email: `qa-${Date.now()}@example.com`,
      ...testData.weakPasswordSignUp,
    });
    await signUpPage.termsCheckbox.click();
    await signUpPage.submitButton.click();

    await expect(signUpPage.passwordInput).toHaveAttribute('aria-invalid', 'true');
    await expect(signUpPage.passwordError).toBeDisplayed();
    expect(await signUpPage.getNormalizedText(signUpPage.passwordError)).toContain('Password must');
  });
});
