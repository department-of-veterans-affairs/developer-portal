import 'jest';

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
    const clickCard = async (caption: string): Promise<void> => {
      await page.evaluate(cap => {
        const elems = Array.from(document.querySelectorAll('a.va-api-card'));
        for (const el of elems) {
          const hdr = el.querySelector('.va-api-name');
          if (hdr && hdr.textContent === cap) {
            el.scrollIntoView();
            (el as HTMLElement).click();
            return;
          }
        }
      }, caption);
    };

    await page.setViewport({ height: 800, width: 1200 });
    await page.goto(`${puppeteerHost}/explore`, {
      waitUntil: ['domcontentloaded', 'networkidle0'],
    });
    await clickCard('Health APIs');
    await clickCard('Community Care Eligibility API');
    const haloText = await page.$eval('.header-halo', elem => elem.textContent);
    expect(haloText).toEqual('Health APIs');
  });
});

describe('invalid cagetories', () => {
  it.each(['', 'docs/quickstart'])(
    'should redirect to /404 from /explore/invalid/%s',
    async (path: string) => {
      await page.goto(`${puppeteerHost}/explore/invalid/${path}`, { waitUntil: 'networkidle0' });
      expect(page.url()).toEqual(`${puppeteerHost}/404`);
    },
  );
});

describe('auth docs route redirect', () => {
  it('should redirect to /explore/authorization from /explore/health/docs/authorization', async () => {
    await page.goto(`${puppeteerHost}/explore/health/docs/authorization`, {
      waitUntil: 'networkidle0',
    });
    expect(page.url()).toEqual(`${puppeteerHost}/explore/authorization?api=claims`);
  });
  it('should redirect to /explore/authorization?api=veteran_verification from /explore/verification/docs/authorization', async () => {
    await page.goto(`${puppeteerHost}/explore/verification/docs/authorization`, {
      waitUntil: 'networkidle0',
    });
    expect(page.url()).toEqual(`${puppeteerHost}/explore/authorization?api=veteran_verification`);
  });
});
