import React from 'react';

export const createContextData = (obj: { [key: string]: string }): string[] => {
  const stringData = JSON.stringify(obj);
  const encodedData = btoa(stringData);
  return [stringData, encodedData];
};

export const getLaunchDescription = (urlSlug: string): JSX.Element => {
  const hasLenderID = ['guaranty-remittance', 'loan-review'].includes(urlSlug);

  // Data for GR and LR APIs
  const lenderData = { portal_id: 'TEST1234567890SERVICE' };
  const [lenderStringData, lenderEncodedData] = createContextData(lenderData);

  // Default data for now
  const patientData = { patient: '1000720100V271387' };
  const [patientStringData, patientEncodedData] = createContextData(patientData);

  return (
    <>
      <p>
        The launch scope and parameter limit the scope of an access token by indicating the token is
        for a specific {hasLenderID ? 'lender ID.' : 'patient or encounter.'}
      </p>
      <p>
        It must be a base64-encoded JSON object, the value of which is the{' '}
        {hasLenderID
          ? 'lender portal ID that is associated to the specific lender ID.'
          : "patient's ICN."}{' '}
        The format of the object will be:{' '}
        <code>{hasLenderID ? lenderStringData : patientStringData}</code>
      </p>
      <p>
        When encoded using base64, the object will look like this:{' '}
        <code>{hasLenderID ? lenderEncodedData : patientEncodedData}</code>
      </p>
    </>
  );
};
