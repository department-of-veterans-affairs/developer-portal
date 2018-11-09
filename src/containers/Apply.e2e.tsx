import { axeCheck } from '../e2eHelpers';

describe('/apply', () => {
    beforeAll(async () => {
        await page.goto('http://localhost:4444/#/apply');
        await page.addScriptTag({ path: require.resolve('axe-core') })
    });

    it('loads', async () => {
        const text = await page.evaluate(() => document.body.textContent);
        expect(text).toContain('VA Digital');
    });

    it('should not have any axe violations on the application', async () => {
        const result = await page.evaluate(axeCheck);
        expect(result).toHaveNoViolations();
    });
});
