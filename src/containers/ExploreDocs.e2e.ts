import 'jest';

import { puppeteerHost } from '../e2eHelpers';

describe('position sticky', () => {
  it('should keep nav element in place after scroll', async () => {
    await page.goto(`${puppeteerHost}/explore`, { waitUntil: 'networkidle0' });
    const originalDistanceFromTop = await page.evaluate(() => {
      return document.querySelectorAll('.sticky')[0].getBoundingClientRect().top;
    });
    await page.evaluate(() => window.scrollBy(0, 585)); // scroll 585px
    const distanceFromTop = await page.evaluate(() => {
      return document.querySelectorAll('.sticky')[0].getBoundingClientRect().top;
    });
    expect(distanceFromTop).toEqual(20);
    expect(distanceFromTop).not.toEqual(originalDistanceFromTop);
  });

  it('provides 3-level navigation via the sidenav', async () => {
    const waitScrollClick = async (selector: string) => {
      await page.waitForSelector(selector, { visible: true });
      await page.evaluate((sel) => {
        const elem = document.querySelector(sel);
        if (elem) {
          elem.scrollIntoView();
        }
      }, selector);
      await page.click(selector);
    };

    await page.setViewport({width: 1200, height: 800});
    await page.goto(`${puppeteerHost}/explore`, { waitUntil: ['domcontentloaded', 'networkidle0'] });

    const selSideNav = 'ul.usa-sidenav-list';
    const selHealthLink = `${selSideNav} a#side-nav-category-link-health`;
    await waitScrollClick(selHealthLink);

    const selAuthLink = `${selSideNav} a#side-nav-authorization-link-health`;
    await waitScrollClick(selAuthLink);

    const selSampleAppLink = `${selSideNav} a#hash-link-health-sample-application`;
    await waitScrollClick(selSampleAppLink);
  });

  it('provides step-wise navigation via in-page cards', async () => {
    const clickCard = async (caption: string) => {
      await page.evaluate((cap) => {
        const elems = Array.from(document.querySelectorAll('a.va-api-card'));
        for (const el of elems) {
          const hdr = el.querySelector('.va-api-name');
          if (hdr && (hdr.textContent === cap)) {
            el.scrollIntoView();
            (el as HTMLElement).click();
            return;
          }
        }
      }, caption);
    };

    await page.setViewport({width: 1200, height: 800});
    await page.goto(`${puppeteerHost}/explore`, { waitUntil: ['domcontentloaded', 'networkidle0'] });
    await clickCard('Health');
    await clickCard('Authorization');
    const haloText = await page.$eval('.header-halo', (elem) => {
      return elem.textContent;
    });
    expect(haloText).toEqual('Health');
  });
});
