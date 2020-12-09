import * as React from 'react';

const dec2hex = (dec: number): string => `0${dec.toString(16)}`.substr(-2);

const generateRandomString = (): string => {
  const array = new Uint32Array(56 / 2);
  window.crypto.getRandomValues(array);
  return Array.from(array, dec2hex).join('');
};

const sha256 = async (plain: string): Promise<ArrayBuffer> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest('SHA-256', data);
};

const base64urlencode = (a: ArrayBuffer): string => {
  const bytes = new Uint8Array(a);
  const len = bytes.byteLength;
  let str = '';
  for (let i = 0; i < len; i += 1) {
    str += String.fromCharCode(bytes[i]);
  }

  return btoa(str)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/[=]+$/, '');
};

const challenge_from_verifier = async (verifier: string): Promise<string> => {
  const hashed = await sha256(verifier);
  const base64encoded = base64urlencode(hashed);
  return base64encoded;
};

export const Login: React.FunctionComponent = (): JSX.Element => {
  const [challenge, setChallenge] = React.useState('');

  React.useEffect(() => {
    const verifier = generateRandomString();
    void challenge_from_verifier(verifier).then(code => {
      localStorage.setItem('verifier', verifier);
      setChallenge(code);
    });
  }, []);

  const clientId = process.env.CLIENT_ID ?? 'default';
  const oktaUrl = process.env.OKTA_OIDC_URL ?? 'default';
  const frontendUrl = process.env.FRONTEND_URL ?? 'default';
  const idp = process.env.IDP ?? 'default';

  const idpLink = `${oktaUrl}/authorize?idp=${idp}&client_id=${clientId}&response_type=code&scope=openid profile&redirect_uri=${frontendUrl}/callback&state=WM6D&code_challenge_method=S256&code_challenge=${challenge}`;

  return (
    <>
      <h2>Login</h2>
      {challenge && <a href={idpLink}> Sign in with google accounts</a>}
      {!challenge && <p>loading...</p>}
    </>
  );
};
