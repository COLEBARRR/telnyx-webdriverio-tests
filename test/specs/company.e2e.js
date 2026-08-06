const companyPage = require('../pageobjects/company.page');

describe('Telnyx company pages', () => {
  it('TC-16: lists open Careers positions from Greenhouse', async () => {
    await companyPage.openCareers();
    const jobLinks = await companyPage.greenhouseLinks;
    expect(jobLinks.length).toBeGreaterThan(0);
    await expect(jobLinks[0]).toHaveAttribute('href', expect.stringContaining('greenhouse.io'));
  });

  it('TC-17: loads the Our Network page', async () => {
    await companyPage.openNetwork();
    await expect(companyPage.heading).toBeDisplayed();
    expect(await companyPage.getNormalizedText(companyPage.heading)).toContain('Our private, global network');
  });

  it('TC-18: loads the Global Coverage page', async () => {
    await companyPage.openCoverage();
    await expect(companyPage.heading).toBeDisplayed();
    expect(await companyPage.getNormalizedText(companyPage.heading)).toContain('Global communications');
  });

  it('TC-19: loads the Privacy Policy page', async () => {
    await companyPage.openPrivacy();
    await expect(companyPage.heading).toBeDisplayed();
    expect(await companyPage.getNormalizedText(companyPage.heading)).toContain('Privacy Policy');
  });
});
