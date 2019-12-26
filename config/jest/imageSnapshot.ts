import * as path from 'path';

import { configureToMatchImageSnapshot } from 'jest-image-snapshot';

const imageSnapshotsDir = path.resolve(__dirname, '../../test/image_snapshots');

const toMatchImageSnapshot = configureToMatchImageSnapshot({
    customSnapshotsDir: imageSnapshotsDir,
    failureThreshold: 0.01,
    failureThresholdType: 'percent',
});

expect.extend({ toMatchImageSnapshot });
