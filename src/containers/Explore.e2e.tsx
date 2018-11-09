import { axeCheck, mockSwagger } from '../e2eHelpers';

describe('/explore/benefits', () => {
    beforeAll(async () => {
        await page.goto('http://localhost:4444/#/explore/benefits');
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

describe('/explore/health', () => {
    beforeAll(async () => {
        await page.goto('http://localhost:4444/#/explore/health');
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

describe('/explore/verification', () => {
    beforeAll(async () => {
        await page.goto('http://localhost:4444/#/explore/verification');
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

describe('/explore/benefits/getting-started', () => {
    beforeAll(async () => {
        await page.goto('http://localhost:4444/#/explore/benefits/getting-started');
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

describe('/explore/health/getting-started', () => {
    beforeAll(async () => {
        await page.goto('http://localhost:4444/#/explore/health/getting-started');
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

describe('/explore/verification/getting-started', () => {
    beforeAll(async () => {
        await page.goto('http://localhost:4444/#/explore/verification/getting-started');
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

describe('/explore/benefits/docs/benefits', () => {
    beforeAll(async () => {
        await page.setRequestInterception(true);
        page.removeAllListeners('request');
        page.on('request', mockSwagger);
        await page.goto('http://localhost:4444/#/explore/benefits/docs/benefits');
        await page.addScriptTag({ path: require.resolve('axe-core') })
    });

    it('loads', async () => {
        const text = await page.evaluate(() => document.body.textContent);
        expect(text).toContain('VA Digital');
    });

    it('should not have any axe violations on the page', async () => {
        await page.waitForSelector('.title');
        const result = await page.evaluate(axeCheck);
        expect(result).toHaveNoViolations();
    });
});

describe('/explore/benefits/docs/appeals', () => {
    beforeAll(async () => {
        await page.setRequestInterception(true);
        page.removeAllListeners('request');
        page.on('request', mockSwagger);
        await page.goto('http://localhost:4444/#/explore/benefits/docs/appeals');
        await page.addScriptTag({ path: require.resolve('axe-core') })
    });

    it('should not have any axe violations on the page', async () => {
        await page.waitForSelector('.title');
        const result = await page.evaluate(axeCheck);
        expect(result).toHaveNoViolations();
    });
});

describe('/explore/health/docs/argonaut', () => {
    beforeAll(async () => {
        await page.setRequestInterception(true);
        page.removeAllListeners('request');
        page.on('request', mockSwagger);
        await page.goto('http://localhost:4444/#/explore/health/docs/argonaut');
        await page.addScriptTag({ path: require.resolve('axe-core') })
    });

    it('loads', async () => {
        const text = await page.evaluate(() => document.body.textContent);
        expect(text).toContain('VA Digital');
    });

    it('should not have any axe violations on the page', async () => {
        await page.waitForSelector('.title');
        const result = await page.evaluate(axeCheck);
        expect(result).toHaveNoViolations();
    });
});
