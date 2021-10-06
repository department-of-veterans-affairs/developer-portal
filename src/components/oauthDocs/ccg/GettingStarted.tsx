import * as React from 'react';
import { Link } from 'react-router-dom';
import { SectionHeaderWrapper } from '../../index';
import { CodeWrapper } from '../../index';
import classNames from 'classnames';


const GettingStarted = (): JSX.Element => (
  <>
    <SectionHeaderWrapper heading="Getting Started" id="getting-started" />
    <p>
      After you <Link to="/apply">request sandbox access</Link>, you will need to generate your RSA key pair and convert 
      the public key into JWK format. What you generate will look similar to this: 
    </p>
    <CodeWrapper>
      <pre
        className={classNames(
          'vads-u-display--flex',
          'vads-u-justify-content--space-between',
        )}
      >
        <code>
        </code>
      </pre>
    </CodeWrapper>
    <p>
      Then, send this key to our support team at <a href="mailto:api.va.gov">api@va.gov</a>, 
      and we will send you a client ID.
    </p>
  </>
);

GettingStarted.propTypes = {};

export { GettingStarted };
