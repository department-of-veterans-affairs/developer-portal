import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import highlight from 'rehype-highlight';
import { SectionHeaderWrapper, CodeWrapper } from '../../index';

const GettingStarted = (): JSX.Element => (
  <>
    <SectionHeaderWrapper heading="Getting Started" id="getting-started" />
    <p>
      You may find <a href="https://www.npmjs.com/package/pem-jwk">this pem-jwk tool</a> useful for
      doing the conversion. The tool shows a private key being converted, but the process is the
      same for a public key. What you generate will look similar to this:
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
`}
      </ReactMarkdown>
    </CodeWrapper>
    <p>
      Next, request sandbox access for your desired client credentials grant API. On the access
      form, provide your RSA public key. After you submit the form, we will send your client ID in
      an email.
    </p>
  </>
);

GettingStarted.propTypes = {};

export { GettingStarted };
