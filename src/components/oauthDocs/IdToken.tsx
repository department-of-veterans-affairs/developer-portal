import * as React from 'react';
import { SectionHeaderWrapper } from '../sectionHeaderWrapper/SectionHeaderWrapper';

const IdToken = (): JSX.Element => (
  <>
    <SectionHeaderWrapper heading="ID Token" id="id-token" />
    <p>
      Access tokens and <code>id_tokens</code> are <a href="https://jwt.io/">JSON Web Tokens</a> or
      JWTs. A JWT consists of three parts: a header, a payload, and a signature.
    </p>
    <p>
      An <code>id_token</code> is available in the authorization code flow (response_type = code)
      token response when the openid scope is used.
    </p>
    <p>
      Your application must validate JWT signatures. This allows your application to verify that the
      provided JWT originates from our authorization servers and prevents your application from
      accepting a JWT with claims that are attempting to impersonate one of your users.
    </p>
    <h3>Header</h3>
    <p>
      The JWT&apos;s header has two fields, <code>alg</code> and <code>kid</code>. <code>alg</code>{' '}
      indicates the algorithm that was used to sign the JWT, and <code>kid</code> identifies the key
      that was used to sign the JWT. Signing keys and associated metadata are accessible from{' '}
      <a href="https://sandbox-api.va.gov/oauth2/.well-known/openid-configuration">
        https://sandbox-api.va.gov/oauth2/.well-known/openid-configuration
      </a>
      .
    </p>
    <h3>Signature</h3>
    <p>
      The signature is a cryptographically generated signature of the JWT&apos;s header and payload
      used to confirm the JWT&apos;s authenticity. Your application must validate this signature
      using the <code>alg</code> and the <code>kid</code> from the JWT&apos;s header. You may want
      use one of the JWT libraries listed at <a href="https://jwt.io">jwt.io</a> to help make this
      process easier.
    </p>
    <h3 tabIndex={-1}>Payload</h3>
    <p>
      The payload is a JSON object containing identity and authentication-related{' '}
      <code>claims</code>. There are a couple claims in the JWT that are important for your
      application to consider:
    </p>
    <ul>
      <li>
        <code>nonce</code> - should match the <code>nonce</code> you initiated authorization with.
      </li>
      <li>
        <code>exp</code> - the expiration time of the JWT. The token cannot be accepted by the
        Lighthouse platform after this time, and your application should not use an expired token to
        identify a user.
      </li>
    </ul>
  </>
);

IdToken.propTypes = {};

export { IdToken };
