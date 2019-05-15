import { configureToMatchImageSnapshot } from 'jest-image-snapshot';

const toMatchImageSnapshot = configureToMatchImageSnapshot({
    customDiffConfig: { threshold: 0.03 },
});

expect.extend({ toMatchImageSnapshot });
