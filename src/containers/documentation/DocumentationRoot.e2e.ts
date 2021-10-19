/* eslint-disable no-console */
import 'jest';
import { getDocument, queries } from 'pptr-testing-library';

import { puppeteerHost } from '../../e2eHelpers';

describe('position sticky', () => {
  it('should keep nav element in place after scroll', async () => {
    await page.goto(`${puppeteerHost}/explore`, { waitUntil: 'networkidle0' });
    const originalDistanceFromTop = await page.evaluate(
      () => document.querySelectorAll('.va-api-side-nav')[0].getBoundingClientRect().top,
    );
    await page.evaluate(() => window.scrollBy(0, 585)); // scroll 585px
    const distanceFromTop = await page.evaluate(
      () => document.querySelectorAll('.va-api-side-nav')[0].getBoundingClientRect().top,
    );
    expect(distanceFromTop).toEqual(20);
    expect(distanceFromTop).not.toEqual(originalDistanceFromTop);
  });

  it('provides step-wise navigation via in-page cards', async () => {
    const clickCard = async (caption: string, regionName: string): Promise<void> => {
      const $document = await getDocument(page);
      // get the main content, i.e. not the side nav
      const mainContentRegion = await queries.getByRole($document, 'region', { name: regionName });
      const cardLink = await queries.getByRole(mainContentRegion, 'link', { name: caption });
      await cardLink.click();
    };

    await page.setViewport({ height: 800, width: 1200 });
    await page.goto(`${puppeteerHost}/explore`, {
      waitUntil: ['domcontentloaded', 'networkidle0'],
    });
    await clickCard('Health APIs', 'Documentation');
    await clickCard('Community Care Eligibility API', 'Health APIs');
    const haloText = await page.$eval('.header-halo', elem => elem.textContent);
    expect(haloText).toEqual('Health APIs');
  });
});

describe('auth docs route redirect', () => {
  it('should redirect to /explore/authorization from /explore/health/docs/authorization', async () => {
    await page.goto(`${puppeteerHost}/explore/health/docs/authorization`, {
      waitUntil: 'networkidle0',
    });
    expect(page.url()).toEqual(`${puppeteerHost}/explore/authorization`);
  });
  it('should redirect to /explore/authorization/docs/authorization-code?api=veteran_verification from /explore/verification/docs/authorization', async () => {
    await page.goto(`${puppeteerHost}/explore/verification/docs/authorization`, {
      waitUntil: 'networkidle0',
    });
    expect(page.url()).toEqual(`${puppeteerHost}/explore/authorization/docs/authorization-code?api=veteran_verification`);
  });
});
