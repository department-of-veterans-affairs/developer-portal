import PropTypes from 'prop-types';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { isApiDeactivated } from '../../apiDefs/deprecated';
import { getAllOauthApis } from '../../apiDefs/query';
import { APIDescription } from '../../apiDefs/schema';
import { RootState } from '../../types';
import { APISelector } from '../index';

import DefaultScopes from '../../content/apiDocs/oauth/Scopes.mdx';

interface ScopesContentProps {
  apiDef: APIDescription | null;
}

/*
 * This is designed to be a single place of truth for the scopes descriptions.
 * In the future this may be prime for rework as the scopes list expands.
 * There are logical groups of scopes by API, at this point we decided to stay with
 * conditions based on the scope names themselves prior to getting a CMS.
 * Scopes are listed in each API's respective file in apiDefs folder.
 */
const ScopesContent = (props: ScopesContentProps): JSX.Element => {
  const scopes = props.apiDef?.oAuthInfo?.scopes ?? ['profile', 'openid', 'offline_access'];
  const selectedApi = useSelector((state: RootState) => state.apiSelection.selectedApi);
  const options = getAllOauthApis().filter((item: APIDescription) => !isApiDeactivated(item));
  const hasClaimScope = scopes.some(element => element.startsWith('claim.'));
  const hasPatientScope = scopes.some(element => element.startsWith('patient/'));

  return (
    <>
      <DefaultScopes />

      <APISelector
        options={options}
        selectedOption={selectedApi}
      />

      {scopes.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Scope</th>
              <th>Values and Description</th>
            </tr>
          </thead>
          <tbody>
            {scopes.includes('launch/patient') && (
              <tr>
                <td>
                  <code>launch/patient</code>
                </td>
                <td>
                  A permission setting to obtain the patient&apos;s identifier in the token response
                  when the app is launched from an EHR.
                </td>
              </tr>
            )}
            {hasClaimScope && (
              <tr>
                <td>
                  <code>claim.*</code>
                </td>
                <td>
                  <p>
                    To view a user&apos;s VA health claims information, use the scopes below.
                  </p>
                  <ul>
                    {scopes.filter(element => element.startsWith('claim.')).map((scope: string) => (
                      <li key={scope}><code>{scope}</code></li>
                    ))}
                  </ul>
                </td>
              </tr>
            )}
            {hasPatientScope && (
              <tr>
                <td>
                  <code>patient/*</code>
                </td>
                <td>
                  <p>
                    View a user&apos;s VA Health records and patient information, see specific read only
                    scopes below.
                  </p>
                  <ul>
                    {scopes.filter(element => element.startsWith('patient/')).map((scope: string) => (
                      <li key={scope}><code>{scope}</code></li>
                    ))}
                  </ul>
                </td>
              </tr>
            )}
            {scopes.includes('service_history.read') && (
              <tr>
                <td>
                  <code>service_history.read</code>
                </td>
                <td>
                  View a Veteran&apos;s service history including deployments and discharge status
                </td>
              </tr>
            )}
            {scopes.includes('disability_rating.read') && (
              <tr>
                <td>
                  <code>disability_rating.read</code>
                </td>
                <td>
                  View a Veteran&apos;s VA disability ratings and the effective date of the rating
                </td>
              </tr>
            )}
            {scopes.includes('veteran_status.read') && (
              <tr>
                <td>
                  <code>veteran_status.read</code>
                </td>
                <td>Confirm the Veteran status of an individual</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </>
  );
};

ScopesContent.propTypes = {
  apiDef: PropTypes.object,
};

export { ScopesContent };
