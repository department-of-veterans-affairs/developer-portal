import * as React from 'react';

export const Profile: React.FunctionComponent = (): JSX.Element => {
  const getToken = '123';

  return (
    <>
      <h2>Profile</h2>
      <p>Data: { getToken }</p>
    </>
  );
};
