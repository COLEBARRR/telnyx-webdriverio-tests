const mainPage = require('../pageobjects/main.page');
const signUpPage = require('../pageobjects/signup.page');
const contactPage = require('../pageobjects/contact.page');
const pricingPage = require('../pageobjects/pricing.page');
const companyPage = require('../pageobjects/company.page');
const testData = require('../data/test-data');

describe('Telnyx WebdriverIO E2E tests', () => {
  it('TC-01: loads the Telnyx homepage successfully', async () => {
    await mainPage.open();
    await expect(mainPage.homeLink).toBeDisplayed();
  });

  it('TC-02: opens Contact Us from the header', async () => {
    await mainPage.open();
    await mainPage.openContactUsFromHeader();
    await expect(contactPage.heading).toBeDisplayed();
    await expect(contactPage.form).toBeDisplayed();
  });

  it('TC-03: displays the Download pricing section on SIP Trunking pricing', async () => {
    await pricingPage.openSipTrunking();
    await expect(pricingPage.sipHeading).toBeDisplayed();
    await expect(pricingPage.downloadPricingHeading).toBeDisplayed();
  });

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
    const errors = await $$('.mktoError');
    expect(errors.length).toBeGreaterThan(0);
    await expect(errors[0]).toBeDisplayed();
  });

  it('TC-06: loads the main Pricing page successfully', async () => {
    await pricingPage.open();
    const sipTrunkingLink = await pricingPage.getSipTrunkingLink();
    await expect(browser).toHaveUrl(expect.stringContaining('/pricing'));
    await expect(pricingPage.heading).toBeDisplayed();
    await expect(pricingPage.communicationsHeading).toBeDisplayed();
    await expect(sipTrunkingLink).toBeDisplayed();
  });

  it('TC-07: opens Careers from the footer', async () => {
    await mainPage.open();
    await mainPage.openCareersFromFooter();
    await expect(companyPage.careersHeading).toBeDisplayed();
    expect((await companyPage.greenhouseLinks).length).toBeGreaterThan(0);
  });

  it('TC-08: displays a validation error for a weak Sign Up password', async () => {
    await signUpPage.open();
    await signUpPage.fillBusinessForm({
      email: `qa-${Date.now()}@example.com`,
      ...testData.weakPasswordSignUp,
    });
    await signUpPage.termsCheckbox.click();
    await signUpPage.submitButton.click();
    await expect(signUpPage.passwordError).toBeDisplayed();
  });

  it('TC-09: exposes the basic Chat to an Agent controls', async () => {
    await mainPage.open();
    const { input, sendButton } = await mainPage.openChat();
    await expect(input).toBeDisplayed();
    await expect(sendButton).toBeDisplayed();
  });

  it('TC-10: closes the cookie banner when it is shown', async () => {
    await browser.deleteCookies();
    await mainPage.open(false);
    const banner = await $('#onetrust-banner-sdk');
    if ((await banner.isExisting()) && (await banner.isDisplayed())) {
      expect(await mainPage.closeCookieBannerIfPresent()).toBe(true);
      await expect(banner).not.toBeDisplayed();
    } else {
      await expect(mainPage.heading).toBeDisplayed();
    }
  });

  it('TC-11: has a Sign Up link in the header', async () => {
    await mainPage.open();
    const signUpLink = await mainPage.getSignUpLink();
    await expect(signUpLink).toBeDisplayed();
    await expect(signUpLink).toHaveAttribute('href', '/sign-up');
  });

  it('TC-12: points the Log In link to the Telnyx portal', async () => {
    await mainPage.open();
    const loginLink = await mainPage.getLoginLink();
    await expect(loginLink).toBeDisplayed();
    await expect(loginLink).toHaveAttribute('href', expect.stringContaining('portal.telnyx.com'));
  });

  it('TC-13: displays the real-time agents hero heading', async () => {
    await mainPage.open();
    const normalizedHeading = (await mainPage.heading.getText()).replace(/\s+/g, ' ').trim();
    expect(normalizedHeading).toContain('Infrastructure for real-time agents');
  });

  it('TC-14: displays key Communications pricing links', async () => {
    await pricingPage.open();
    const sipTrunkingLink = await pricingPage.getSipTrunkingLink();
    const messagingLink = await pricingPage.getMessagingLink();
    await expect(sipTrunkingLink).toBeDisplayed();
    await expect(messagingLink).toBeDisplayed();
  });

  it('TC-15: displays country and currency selectors on SIP pricing', async () => {
    await pricingPage.openSipTrunking();
    await expect(pricingPage.countrySelect).toBeDisplayed();
    await expect(pricingPage.currencySelect).toBeDisplayed();
  });

  it('TC-16: lists open Careers positions from Greenhouse', async () => {
    await companyPage.openCareers();
    const jobLinks = await companyPage.greenhouseLinks;
    expect(jobLinks.length).toBeGreaterThan(0);
    await expect(jobLinks[0]).toHaveAttribute('href', expect.stringContaining('greenhouse.io'));
  });

  it('TC-17: loads the Our Network page', async () => {
    await companyPage.openNetwork();
    await expect(companyPage.networkHeading).toBeDisplayed();
  });

  it('TC-18: loads the Global Coverage page', async () => {
    await companyPage.openCoverage();
    await expect(companyPage.coverageHeading).toBeDisplayed();
  });

  it('TC-19: loads the Privacy Policy page', async () => {
    await companyPage.openPrivacy();
    await expect(companyPage.privacyHeading).toBeDisplayed();
  });

  it('TC-20: displays Telnyx social media links in the footer', async () => {
    await mainPage.open();
    await mainPage.linkedInLink.scrollIntoView();
    await expect(mainPage.linkedInLink).toBeDisplayed();
    await expect(mainPage.xLink).toBeDisplayed();
    await expect(mainPage.facebookLink).toBeDisplayed();
  });
});
