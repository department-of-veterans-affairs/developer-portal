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

  it('provides 3-level navigation via the sidenav', async () => {
    const waitScrollClick = async (selector: string): Promise<void> => {
      await page.waitForSelector(selector, { visible: true });
      await page.evaluate(sel => {
        const elem = document.querySelector(sel) as HTMLElement | null;
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
    await clickCard('Health API');
    await clickCard('Authorization');
    const haloText = await page.$eval('.header-halo', elem => elem.textContent);
    expect(haloText).toEqual('Health API');
  });
});

describe('invalid cagetories', () => {
  it.each(['', 'docs/quickstart'])(
    'should redirect to /explore from /explore/invalid/%s',
    async (path: string) => {
      await page.goto(`${puppeteerHost}/explore/invalid/${path}`, { waitUntil: 'networkidle0' });
      expect(page.url()).toEqual(`${puppeteerHost}/explore`);
    },
  );
});

/**
 * test to make sure the route does not redirect when the environment variable is set to false
 */

describe('auth docs route does not redirect', () => {
  it.each(['health', 'verification'])(
    'should not redirect to /explore/authorization from /explore/:apiCategoryKey/docs/authorization',
    async (path: string) => {
      await page.goto(`${puppeteerHost}/explore/${path}/docs/authorization`, {
        waitUntil: 'networkidle0',
      });
      expect(page.url()).toEqual(`${puppeteerHost}/explore/${path}/docs/authorization`);
    },
  );
});

/**
 * have to skip because the new auth docs are off by default, including in the Jest Puppeteer
 * server. to run this test, remove the .skip and add the correct environment variable in
 * jest-puppeteer.config.js.
 */

describe.skip('auth docs route redirect', () => {
  it('should redirect to /explore/authorization from /explore/health/docs/authorization',
    async () => {
      await page.goto(`${puppeteerHost}/explore/health/docs/authorization`, {
        waitUntil: 'networkidle0',
      });
      expect(page.url()).toEqual(`${puppeteerHost}/explore/authorization?api=claims`);
    },
  );
  it('should redirect to /explore/authorization?api=veteran_verification from /explore/verification/docs/authorization',
    async () => {
      await page.goto(`${puppeteerHost}/explore/verification/docs/authorization`, {
        waitUntil: 'networkidle0',
      });
      expect(page.url()).toEqual(`${puppeteerHost}/explore/authorization?api=veteran_verification`);
    },
  );
});
