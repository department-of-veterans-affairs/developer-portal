import * as React from 'react';
import { Link } from 'react-router-dom';
import { SectionHeaderWrapper, CodeBlock } from '../../index';
import { ApiRequiredProps } from '../../../containers/documentation/DocumentationRoot';

const GettingStarted = (props: ApiRequiredProps): JSX.Element => (
  <>
    <SectionHeaderWrapper heading="Getting Started" id="getting-started" />
    <h3>Generating Public RSA Key and Converting to JWK Format</h3>
    <ol>
      <li>
        <span className="vads-u-font-weight--bold">Generate the private key:</span> Use the
        following command to generate a private key in PEM format.
        <div className="vads-u-margin-top--1">
          <code>openssl genrsa -out private.pem 2048</code>
        </div>
      </li>
      <li>
        <span className="vads-u-font-weight--bold">Generate the public key:</span> Once you have the
        private key, you can extract the corresponding public key using the following command.
        <div className="vads-u-margin-top--1">
          <code>openssl rsa -in private.pem -outform PEM -pubout -out public.pem</code>
        </div>
      </li>
      <li>
        <span className="vads-u-font-weight--bold">Convert the public key to JWK format:</span>{' '}
        After generating the public key in PEM format, you&apos;ll need to convert it to JWK format.
        If you use the{' '}
        <a href="https://www.npmjs.com/package/pem-jwk" target="_blank" rel="noopener noreferrer">
          pem-jwk tool
        </a>
        , use the following command.
        <div className="vads-u-margin-top--1">
          <code>pem-jwk public.pem &gt; public.jwk</code>
        </div>
      </li>
    </ol>
    <p>What you generate will look similar to this:</p>
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
      <Link to={`/explore/api/${props.api.urlSlug}/sandbox-access`}>access form</Link>, provide your
      RSA public key. After you submit the form, we will send your client ID in an email.
    </p>
  </>
);

GettingStarted.propTypes = {};

export { GettingStarted };
