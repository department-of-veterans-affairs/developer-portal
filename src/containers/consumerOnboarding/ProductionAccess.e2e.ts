import 'jest';

import { getDocument, queries } from 'pptr-testing-library';
import { puppeteerHost } from '../../e2eHelpers';

describe('render modals', () => {
  it('renders US-based companies only modal', async () => {
    await page.goto(`${puppeteerHost}/onboarding/production-access-application`, { waitUntil: 'networkidle0' });

    const doc = await getDocument(page);
    const dialogHidden = await queries.queryByRole(doc, 'dialog');
    expect(dialogHidden).toEqual(null);

    await page.click('#isUSBasedCompanyFormFieldno');
    await page.click('#is508CompliantFormFieldyes');
    await page.click('#apisFormFieldappeals');
    await page.click('#termsOfServiceFormField');
    await page.click('button.usa-button[type=submit]');

    const dialogVisibleText = await queries.findByText(doc, /We currently only grant access to US-based companies./);
    expect(dialogVisibleText).not.toBeNull();
  });

  it('closes US-based companies only modal', async () => {
    await page.goto(`${puppeteerHost}/onboarding/production-access-application`, { waitUntil: 'networkidle0' });

    const doc = await getDocument(page);
    const dialogHidden = await queries.queryByRole(doc, 'dialog');
    expect(dialogHidden).toEqual(null);

    await page.click('#isUSBasedCompanyFormFieldno');
    await page.click('#is508CompliantFormFieldyes');
    await page.click('#apisFormFieldappeals');
    await page.click('#termsOfServiceFormField');
    await page.click('button.usa-button[type=submit]');

    const dialogVisibleText = await queries.findByText(doc, /We currently only grant access to US-based companies./);
    expect(dialogVisibleText).not.toBeNull();

    await page.click('button.va-modal-close[type=button]');

    const dialogHiddenAgain = await queries.queryByRole(doc, 'dialog');
    expect(dialogHiddenAgain).toEqual(null);
  });

  it('closes production request form', async () => {
    await page.goto(`${puppeteerHost}/onboarding/request-prod-access`, { waitUntil: 'networkidle0' });

    await page.click('.vads-c-action-link--green');

    const doc = await getDocument(page);
    const dialogHidden = await queries.queryByRole(doc, 'dialog');
    expect(dialogHidden).toEqual(null);

    await page.click('#isUSBasedCompanyFormFieldno');
    await page.click('#is508CompliantFormFieldyes');
    await page.click('#apisFormFieldappeals');
    await page.click('#termsOfServiceFormField');
    await page.click('button.usa-button[type=submit]');

    const dialogVisibleText = await queries.findByText(doc, /We currently only grant access to US-based companies./);
    expect(dialogVisibleText).not.toBeNull();

    await page.click('.va-modal-body button.usa-button');

    expect(page.url()).toEqual(`${puppeteerHost}/onboarding/request-prod-access`);
  });
});
