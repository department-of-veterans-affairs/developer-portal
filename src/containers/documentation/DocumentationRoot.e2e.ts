import 'jest';

import { puppeteerHost } from '../../e2eHelpers';

describe('position sticky', () => {
  it('should keep nav element in place after scroll', async () => {
    await page.goto(`${puppeteerHost}/explore`, { timeout: 60000, waitUntil: 'networkidle0' });
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

  it('provides 3-level navigation via the sidenav', async () => {
    const waitScrollClick = async (selector: string) => {
      await page.waitForSelector(selector, { visible: true });
      await page.evaluate(sel => {
        const elem = document.querySelector(sel) as HTMLElement;
        if (elem) {
          elem.scrollIntoView();
        }
      }, selector);
      await page.click(selector);
    };

    await page.setViewport({ height: 800, width: 1200 });
    await page.goto(`${puppeteerHost}/explore`, {
      waitUntil: ['domcontentloaded', 'networkidle0'],
    });

    const selSideNav = 'ul.usa-sidenav-list';
    const selHealthLink = `${selSideNav} a#side-nav-category-link-health`;
    await waitScrollClick(selHealthLink);

    const selAuthLink = `${selSideNav} a#side-nav-authorization-link-health`;
    await waitScrollClick(selAuthLink);

    const selSampleAppLink = `${selSideNav} a[href$="#sample-applications"]`;
    await waitScrollClick(selSampleAppLink);
  });

  it('provides step-wise navigation via in-page cards', async () => {
    const clickCard = async (caption: string) => {
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
    await clickCard('Health API');
    await clickCard('Authorization');
    const haloText = await page.$eval('.header-halo', elem => elem.textContent);
    expect(haloText).toEqual('Health API');
  });
});

describe('inavlid cagetories', () => {
  for (const path of ['', 'docs/quickstart']) {
    it(`should redirect "explore/invalid/${path}" to "explore"`, async () => {
      await page.goto(`${puppeteerHost}/explore/invalid/${path}`, { waitUntil: 'networkidle0' });
      expect(page.url()).toEqual(`${puppeteerHost}/explore`);
    });
  }
});
