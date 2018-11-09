import { axeCheck } from '../e2eHelpers';

describe('/terms-of-service', () => {
    beforeAll(async () => {
        await page.goto('http://localhost:4444/#/terms-of-service');
        await page.addScriptTag({ path: require.resolve('axe-core') })
    });

    it('loads', async () => {
        const text = await page.evaluate(() => document.body.textContent);
        expect(text).toContain('VA Digital');
    });

    it('should not have any axe violations on the page', async () => {
        const result = await page.evaluate(axeCheck);
        expect(result).toHaveNoViolations();
    });
});

describe('/go-live', () => {
    beforeAll(async () => {
        await page.goto('http://localhost:4444/#/go-live');
        await page.addScriptTag({ path: require.resolve('axe-core') })
    });

    it('loads', async () => {
        const text = await page.evaluate(() => document.body.textContent);
        expect(text).toContain('VA Digital');
    });

    it('should not have any axe violations on the page', async () => {
        const result = await page.evaluate(axeCheck);
        expect(result).toHaveNoViolations();
    });
});
