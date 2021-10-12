import * as React from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import highlight from 'rehype-highlight';
import { SectionHeaderWrapper, CodeWrapper } from '../../index';

const GettingStarted = (): JSX.Element => (
  <>
    <SectionHeaderWrapper heading="Getting Started" id="getting-started" />
    <p>
      After you <Link to="/apply">request sandbox access</Link>, you will need to generate your RSA key pair and convert
      the public key into JWK format. What you generate will look similar to this:
    </p>
    <CodeWrapper>
      <ReactMarkdown rehypePlugins={[highlight]}>
        {`~~~json
{
  "kty": "RSA",
  "n": "mYi1wUpwkJ1QB8...",
  "e": "AQAB",
  "alg": "RS256",
  "use": "sig"
}
`         }
      </ReactMarkdown>
    </CodeWrapper>
    <p>
      Then, send this key to our support team at <a href="mailto:api.va.gov">api@va.gov</a>,
      and we will send you a client ID.
    </p>
  </>
);

GettingStarted.propTypes = {};

export { GettingStarted };
