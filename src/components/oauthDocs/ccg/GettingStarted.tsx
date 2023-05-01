import * as React from 'react';
import { Link } from 'react-router-dom';
import { SectionHeaderWrapper, CodeBlock } from '../../index';
import { ApiRequiredProps } from '../../../containers/documentation/DocumentationRoot';

const GettingStarted = (props: ApiRequiredProps): JSX.Element => (
  <>
    <SectionHeaderWrapper heading="Getting Started" id="getting-started" />
    <p>
      You may find <a href="https://www.npmjs.com/package/pem-jwk">this pem-jwk tool</a> useful for
      doing the conversion. The tool shows a private key being converted, but the process is the
      same for a public key. What you generate will look similar to this:
    </p>
    <CodeBlock
      withCopyButton
      language="json"
      code={`\
{
  "kty": "RSA",
  "n": "mYi1wUpwkJ1QB8...",
  "e": "AQAB",
  "alg": "RS256",
  "use": "sig"
}`}
    />
    <p>
      Next, get sandbox access. On the{' '}
      <Link to={`/explore/api/${props.api.urlFragment}/sandbox-access`}>access form</Link>, provide
      your RSA public key. After you submit the form, we will send your client ID in an email.
    </p>
  </>
);

GettingStarted.propTypes = {};

export { GettingStarted };
