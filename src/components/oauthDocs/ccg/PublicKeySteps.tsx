import * as React from 'react';
import { CodeBlock } from '../../index';

export const PublicKeySteps = (): JSX.Element => (
  <>
    <ol>
      <li>
        <span className="vads-u-font-weight--bold">Generate the private key:</span> Use the
        following command to generate a private key in PEM format.
        <div className="vads-u-margin-top--1">
          {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
          <pre className="vads-u-background-color--gray-lightest" tabIndex={0}>
            <code>openssl genrsa -out private.pem 2048</code>
          </pre>
        </div>
      </li>
      <li>
        <span className="vads-u-font-weight--bold">Generate the public key:</span> Once you have the
        private key, you can extract the corresponding public key using the following command.
        <div className="vads-u-margin-top--1">
          {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
          <pre className="vads-u-background-color--gray-lightest" tabIndex={0}>
            <code>openssl rsa -in private.pem -outform PEM -pubout -out public.pem</code>
          </pre>
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
          {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
          <pre className="vads-u-background-color--gray-lightest" tabIndex={0}>
            <code>pem-jwk public.pem &gt; public.jwk</code>
          </pre>
        </div>
      </li>
      <li>
        <span className="vads-u-font-weight--bold">Add &quot;kid&quot; (key ID) to JWK:</span> An
        additional field &quot;kid&quot; is optional, but encouraged to allow for graceful key
        rotations in the future.
      </li>
    </ol>
    <p className="vads-u-margin-top--4">What you generate will look similar to this:</p>
    <CodeBlock
      language="json"
      code={`\
{
  "kty": "RSA",
  "n": "mYi1wUpwkJ1QB8...",
  "e": "AQAB",
  "alg": "RS256",
  "use": "sig",
  "kid": "your-key-id-here"
}`}
    />
  </>
);
