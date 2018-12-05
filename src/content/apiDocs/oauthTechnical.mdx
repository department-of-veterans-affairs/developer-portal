# OAuth

## About OpenID Connect

The VA API Platform uses the [OpenID Connect](https://openid.net/specs/openid-connect-core-1_0.html) standard to allow Veterans to authorize third-party applications to access data on their behalf.

## Getting Started

While we test our OpenID Connect flow to ensure the best experience for Veterans and developers, we're approving teams to work with our OpenID Connect and associated APIs on a case-by-case basis. If you would like to help us build these services out, please submit an [application](/apply) to request access.

In order to get approval of your application, you'll need to supply the following information:

* A Redirect URL - that will receive your OpenID Connect token
* Application name - The name and/or URL of your application that identifies it on authorization screens.
* Type of Application - Mobile app, Single page web application, or a Server-based application
* Scopes - Data you'd like to be access with your app (see [#scopes](#scopes))

## Building OpenID Connect Applications

After being approved to use VA OpenID Connect, you'll receive a *client id* and, if you're building a Server-based application, a *client secret*.

We use separate authorization servers for our development and production environments. You'll be provided with the production authorization server URL when you are approved for production access.

### Initiating Authorization

Initiate the OpenID Connect authorization by directing Veterans using your application to `https://deptva-eval.okta.com/oauth2/default/v1/authorize` with the following query parameters:

* client\_id - required - The client_id issued by the VA API Platform team
* nonce - optional - Used with `id_token` to verify token integrity. Ensure the nonce in your `id_token` is the same as this value. See [security](#security-considerations).
* redirect_uri - required - the URL you supplied that the Veteran will be redirected to after authorizing your application
* response_mode - optional - Either `fragment` or `query`, recommended not to use unless you have a specific reason. Defaults to fragment.
* response\_type - required - one or two of, id\_token, token, or code. Using `code` will require your application to complete the [Authorization Code Flow](#authorization-code-flow). Using `id_token` or `token` allows you to use the [Implicit flow](#implicit-flow). See [Token Types](#id-token) for further explanation.
* scope - optional - Will use your application's default scopes unless you specify a smaller subset of scopes separated by a space
* state - optional - Ensures authorization flow integrity. See [security](#security-considerations).

Example Authorization URL: `https://deptva-eval.okta.com/oauth2/default/v1/authorize?client_id=0oa1c01m77heEXUZt2p7&redirect_uri=http://localhost:8080/implicit/callback&response_type=id_token token&response_mode=fragment&state=1AOQK33KIfH2g0ADHvU1oWAb7xQY7p6qWnUFiG1ffcUdrbCY1DBAZ3NffrjaoBGQ&nonce=o5jYpLSe29RBHBsn5iAnMKYpYw2Iw9XRBweacc001hRo5xxJEbHuniEbhuxHfVZy&scope=openid profile email veteran_status.read`

The Veteran will be taken through a flow where they are authenticated by VA.gov and then asked to consent to allowing your application access to the data it is requesting (as defined by your scopes). After authorizing, your application will receive slightly different responses based on the `response_type` you requested.

### Implicit Flow

This flow works for applications that aren't able to keep a *client secret* protected &mdash; such as single-page webapps or mobile applications. This flow is selected by using either the `id_token` or `token` `response_type`.

The Veteran authorizing your application will be redirected to your application's `redirect_uri` and will receive tokens in the URL's query or fragment depending on the value of `response_mode` (default is fragment). If you requested an `id_token` it will be returned as a parameter called `id_token`. If you requested a `token`, it will be returned as a parameter called `access_token`.

The Veteran's client will receive
```
HTTP/1.1 302 Found
Location: {your redirect uri}#
  scope=openid%20profile%20email
  &id_token=asdjkfa...
  &state=af0ifjsldkj
  &expires_in=3500
```

and your application will then receive

```
GET {your redirect uri path}#
  scope=openid%20profile%20email
  &id_token=asdjkfa...
  &state=af0ifjsldkj
  &expires_in=3500
Host: {your redirect uri host}
```

The `access_token` can used to authorize requests to the VA API Platform by including them in HTTP requests to the Platform by including it in the `Authorization` header as `Authorization: Bearer {token}`. When using the `id_token` to identify a user, you should validate that the token is properly signed and has the expected `audience` and `nonce`, see [id_token](#id-token) for more information.

### Authorization Code Flow

This flow is used by applications that are able to safely store a *client secret* such as a server-based applications and is selected by specifying the `response_type` as `code`.

The Veteran authorizing your application will be redirect to your application's `redirect_uri` and will receive a `code` parameter either in the URL's query or fragment depending on the value of `response_mode`, defaulting to fragment.

The Veteran's client will receive
```
HTTP/1.1 302 Found
Location: {your redirect uri}#
  response_type=code
  &scope=openid%20profile%20email
  &client_id=s6BhdRkqt3
  &state=af0ifjsldkj
  &redirect_uri=https%3A%2F%2Fclient.example.org%2Fcb
```

and your application will then receive

```
GET {your redirect uri path}#
  response_type=code
  &scope=openid%20profile%20email
  &client_id=s6BhdRkqt3
  &state=af0ifjsldkj
  &redirect_uri=https%3A%2F%2Fclient.example.org%2Fcb HTTP/1.1
Host: {your redirect uri host}
```

Your application then makes a request to the token endpoint at `https://deptva-eval.okta.com/oauth2/default/v1/token` using the returned code and your *client id* and *client secret* as HTTP Basic authorization. Your token request should look like:

```
POST /oauth2/default/v1/token HTTP/1.1
Host: deptva-eval.okta.com
Content-Type: application/x-www-form-urlencoded
Authorization: Basic {base64 encoded *client id* + ':' + *client secret*}

grant_type=authorization_code&code={your code}&redirect_uri={your redirect_uri}
```

The token server will respond with:

```
HTTP/1.1 200 OK
Content-Type: application/json
Cache-Control: no-store
Pragma: no-cache

{
  "access_token": "SlAV32hkKG",
  "token_type": "Bearer",
  "refresh_token": "8xLOxBtZp8",
  "expires_in": 3600
}
```

or if an error occurs:

```
HTTP/1.1 400 Bad Request
Content-Type: application/json
Cache-Control: no-store
Pragma: no-cache

{
  "error": "invalid_request"
}
```

The resulting `access_token` can used to authorize requests to the VA API Platform by including it in HTTP requests to the Platform by included it in the `Authorization` header as `Authorization: Bearer {token}`.

The `refresh_token` can be used to obtain a new `access_token` after its expiry by sending the following request

```
POST /oauth2/default/v1/token HTTP/1.1
Host: deptva-eval.okta.com
Content-Type: application/x-www-form-urlencoded
Authorization: Basic {base64 encoded *client id* + ':' + *client secret*}

grant_type=refresh_token&refresh_token={your refresh_token}&scope={space separated scopes}
```

You will receive the same kind of response as above and be able to use your new `access_token` normally.

### Hybrid Flow

By specifying more than one value in the `response_type` when initiating your authorization request, your application can receive multiple response types meaning if you request `response_type=code token` or `response=code id_token`, your application is essentially doing both an implicit and authorization code flow.

If you request `response=code id_token`, the Veteran's client will be issued a redirect like

```
HTTP/1.1 302 Found
Location: {your redirect uri}#
  response_type=code
  &scope=openid%20profile%20email
  &client_id=s6BhdRkqt3
  &state=af0ifjsldkj
  &redirect_uri=https%3A%2F%2Fclient.example.org%2Fcb
  &id_token=asdjkfa...
  &expires_in=3600
```

and your application will receive

```
GET {your redirect uri path}#
  response_type=code
  &scope=openid%20profile%20email
  &client_id=s6BhdRkqt3
  &state=af0ifjsldkj
  &redirect_uri=https%3A%2F%2Fclient.example.org%2Fcb HTTP/1.1
  &id_token=asdjkfa...
  &expires_in=3600
Host: {your redirect uri host}
```

You can then use the `id_token` immediately to make requests and also issue a authorization code token through the processes outlined in [authorization code flow](#authorization-code-flow).

## Scopes

Scopes define the API endpoint your application is allowed to access. The VA API Platform team will define a maximum set of scopes your application is allowed to request. You can always begin an authorization flow by requesting fewer permissions that your application is allowed to access, which may result in more pleasant experience for Veterans unsure if they should grant your application access to their data. You can then always request additional access to additional data when your application needs additional data for a Veteran using your application.

Existing Scopes are:

* `profile` - granted by default allows access to a Veteran's first and last name and email.
* `launch/patient` - a permission setting to obtain launch context when app is launched from an EHR.
* `patient/*` - view a Veteran's VA Health records and patient information, see specific read only scopes below.
  * `patient/Patient.read`
  * `patient/AllergyIntolerance.read`
  * `patient/Condition.read`
  * `patient/DiagnosticReport.read`
  * `patient/Immunization.read`
  * `patient/Medication.read`
  * `patient/MedicationOrder.read`
  * `patient/MedicationStatement.read`
  * `patient/Observation.read`
  * `patient/Procedure.read`
* `service_history.read` - view a Veteran's service history including deployments and discharge status
* `disability_rating.read` - view a Veteran's VA disability ratings and the effective date of the rating
* `veteran_status.read` - confirm the Veteran status of an individual

These are subject to change while the VA API Platform OpenID Connect feature is under development.

## `id token`
Unlike the token returned by an authorization_code grant or an implicit token grant, which is simply a random value, an `id_token` is a [JSON Web Token](https://jwt.io) or JWT. A JWT consists of a three parts, a header, a payload, and a signature. This provides an extremely brief overview of a JWT.

### Header

The JWT's header has two fields `alg` and `kid`. `alg` indicates the algorithm that was used the sign the JWT, and `kid` identifies the key that was used to sign the JWT. Signing keys and associated metadata are accessible from `https://deptva-eval.okta.com/oauth2/default/.well-known/oauth-authorization-server`.

### Payload

The payload is a JSON object containing `claims`.

There are a couple claims in the JWT that are important for your application to consider:

* `nonce` - should match the `nonce` you initiated authorization with.
* `exp` - the expiration time of the JWT. The token cannot be accepted by the VA API Platform after this time, and your application should not use an expired token to identify a user.

The payload also contains claims about the user. Our JWTs will have the following fields:

* `uid` - A unique identifier for the Veteran in UUIDv4 format.

### Signature

The signature is a cryptographically generated signature of the JWT's header and payload used to confirm the JWT's authenticity. Your application must validate this signature using the `alg` and the `kid` from the JWT's header. You may want use one of the JWT libraries listed at [jwt.io](https://jwt.io) to help make this process easier.

## Test Users

While developing and testing your application, you'll need to be able to login. Since most of the data provided from the VA API Platform comes from internal VA systems, you can't sign up for an account and find useful data in it. We will provide test accounts for you to use while developing your VA API Platform-based application.

Test user data is reset regularly.

## Security Considerations

While some security concerns have been noted in this document, there are a few things application developers should take extra care to pay attention to when using VA OAuth.

### HTTPS

Outside of local development environments, all authorization callbacks must use the `https` protocol for communication. The `https` protocol provides a secure encrypted connection between the Veteran's client, your application, and the VA API Platform and authorization servers. This mitigates the risk of some types of man-in-the-middle attacks and prevents third-parties from intercepting Veteran's authorization credentials.

Additionally, the VA API Platform team requires your application to use secure ciphers and versions of the underlying SSL/TLS protocol.

### state

Specifying a `state` param helps protect against some classes of Cross Site Request Forgery (CSRF) attacks, and applications should include it. The `state` param will be passed back from the authorization server to your redirect uri unchanged, and your application should verify that it has the expected value. This helps assure that the client receiving the authorization response is the same as the client that initiated the authorization process.

### nonce

Using a `nonce` with JWTs prevents some kinds of replay attacks where a malicious party can attempt to resend an `id_token` request in order to impersonate a user of your application.

A nonce should be generated on a per-session basis and stored on the user's client.

The [OpenID Connect documentation](https://openid.net/specs/openid-connect-core-1_0.html#NonceNotes) offers the following suggestion for generating nonces:

> The nonce parameter value needs to include per-session state and be unguessable to attackers. One method to achieve this for Web Server Clients is to store a cryptographically random value as an HttpOnly session cookie and use a cryptographic hash of the value as the nonce parameter. In that case, the nonce in the returned ID Token is compared to the hash of the session cookie to detect ID Token replay by third parties. A related method applicable to JavaScript Clients is to store the cryptographically random value in HTML5 local storage and use a cryptographic hash of this value.

### JWT Signature validation

Your application must validate JWT signatures. This allows your application to verify that the provided JWT originates from our authorization servers and prevents your application from accepting a JWT with claims that are attempting to impersonate one of your users.

## Support

If you have any questions please feel free to reach out to the VA API Platform team at [api@va.gov](mailto:api@va.gov). If you would like to report a bug or make a feature request, please open an issue on our [GitHub page](https://github.com/department-of-veterans-affairs/vets-api-clients/issues/new).
