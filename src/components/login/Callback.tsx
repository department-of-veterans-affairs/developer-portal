import * as React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { makeRequest } from 'src/utils/makeRequest';

interface TokenResponseBody {
  id_token: string;
  access_token: string;
}

export const Callback: React.FunctionComponent = (): JSX.Element => {
  const history = useHistory();
  const params = useParams<{
    error?: string;
    code?: string;
  }>();

  React.useEffect(() => {
    if (params.error) {
      history.push('/logout');
    } else {
      const oktaUrl = process.env.OKTA_OIDC_URL;
      const clientId = process.env.CLIENT_ID;
      const { code } = params;
      const verifier = localStorage.getItem('verifier');
      const frontendUrl = process.env.FRONTEND_URL;

      if (!oktaUrl || !clientId || !code || !verifier || !frontendUrl) {
        history.push('login');
        return;
      }

      const exchangeCodeForTokens = async (): Promise<void> => {
        try {
          const response = await makeRequest<TokenResponseBody>(
            `${oktaUrl}/token`,
            {
              body: `grant_type=authorization_code&client_id=${clientId}&redirect_uri=${frontendUrl}/callback&code=${code}&code_verifier=${verifier}`,
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'cache-control': 'no-cache',
              },
            },
          );

          if (response.ok) {
            const {
              id_token,
              access_token,
            } = response.body;

            localStorage.setItem('idToken', id_token);
            localStorage.setItem('token', access_token);
            localStorage.removeItem('verifier');
            history.push('profile');
          } else {
            history.push('login');
          }
        } catch (error: unknown) {
          history.push('login');
        }
      };
      void exchangeCodeForTokens();
    }
  }, [history, params]);

  return (
    <p>Loading...</p>
  );
};
