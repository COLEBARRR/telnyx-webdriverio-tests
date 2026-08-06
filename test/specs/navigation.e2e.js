const mainPage = require('../pageobjects/main.page');
const contactPage = require('../pageobjects/contact.page');
const companyPage = require('../pageobjects/company.page');

describe('Telnyx navigation and common content', () => {
  it('TC-01: loads the Telnyx homepage successfully', async () => {
    await mainPage.open();
    await expect(mainPage.homeLink).toBeDisplayed();
  });

  it('TC-02: opens Contact Us from the header', async () => {
    await mainPage.open();
    await mainPage.openContactUsFromHeader();
    await expect(contactPage.heading).toBeDisplayed();
    expect(await contactPage.getNormalizedText(contactPage.heading)).toContain('Talk to an expert');
    await expect(contactPage.form).toBeDisplayed();
  });

  it('TC-07: opens Careers from the footer', async () => {
    await mainPage.open();
    await mainPage.openCareersFromFooter();
    await expect(companyPage.heading).toBeDisplayed();
    expect(await companyPage.getNormalizedText(companyPage.heading)).toContain('Shape your future at Telnyx');
    expect((await companyPage.greenhouseLinks).length).toBeGreaterThan(0);
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
    expect(await mainPage.getNormalizedText(mainPage.heading))
      .toContain('Infrastructure for real-time agents');
  });

  it('TC-20: displays Telnyx social media links in the footer', async () => {
    await mainPage.open();
    await mainPage.linkedInLink.scrollIntoView();
    await expect(mainPage.linkedInLink).toBeDisplayed();
    await expect(mainPage.xLink).toBeDisplayed();
    await expect(mainPage.facebookLink).toBeDisplayed();
  });
});
