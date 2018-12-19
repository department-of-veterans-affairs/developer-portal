import { configureToMatchImageSnapshot } from 'jest-image-snapshot';

const toMatchImageSnapshot = configureToMatchImageSnapshot({
  failureThreshold: 1,
  failureThresholdType: 'percent', // Considers <=1% difference to be passing
});

expect.extend({ toMatchImageSnapshot });
