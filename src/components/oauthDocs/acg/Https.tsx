import * as React from 'react';
import { SectionHeaderWrapper } from '../../sectionHeaderWrapper/SectionHeaderWrapper';

const Https = (): JSX.Element => (
  <>
    <SectionHeaderWrapper heading="HTTPS" id="https" />
    <p>
      Outside of local development environments, all redirect endpoints must use the{' '}
      <code>https</code> protocol for communication. The <code>https</code> protocol provides a
      secure encrypted connection between the user&apos;s client, your application, and the
      Lighthouse platform and authorization servers. This mitigates the risk of some types of
      man-in-the-middle attacks and prevents third-parties from intercepting user&apos;s
      authorization credentials.
    </p>
  </>
);

Https.propTypes = {};

export { Https };
