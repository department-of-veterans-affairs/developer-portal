import React from 'react';

export const createContextData = (obj: { [key: string]: string }): string[] => {
  const stringData = JSON.stringify(obj);
  const encodedData = btoa(stringData);
  return [stringData, encodedData];
};

export const getLaunchDescription = (urlSlug: string): JSX.Element => {
  switch (urlSlug) {
    case 'guaranty-remittance':
    case 'loan-review':
      const portalData = { portal_id: 'TEST1234567890SERVICE' };
      const [portalStringData, portalEncodedData] = createContextData(portalData);

      return (
        <td>
          <p>
            The launch scope and parameter limit the scope of an access token by indicating the
            token is for a specific lender ID.
          </p>
          <p>
            It must be a base64-encoded JSON object, the value of which is the lender portal ID that
            is associated to the specific lender ID. The format of the object will be:{' '}
            <code>{portalStringData}</code>
          </p>
          <p>
            When encoded using base64, the object will look like this:{' '}
            <code>{portalEncodedData}</code>
          </p>
        </td>
      );
    default:
      const patientData = { patient: '1000720100V271387' };
      const [patientStringData, patientEncodedData] = createContextData(patientData);

      return (
        <td>
          <p>
            The launch scope and parameter limit the scope of an access token by indicating the
            token is for a specific patient or encounter.
          </p>
          <p>
            It must be a base64-encoded JSON object, the value of which is the patient&apos;s ICN.
            The format of the object will be: <code>{patientStringData}</code>
          </p>
          <p>
            When encoded using base64, the object will look like this:{' '}
            <code>{patientEncodedData}</code>
          </p>
        </td>
      );
  }
};
