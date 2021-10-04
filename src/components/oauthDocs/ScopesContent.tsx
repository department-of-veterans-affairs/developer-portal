import * as React from 'react';
import { useSelector } from 'react-redux';
import { HashLink } from 'react-router-hash-link';
import { isApiDeactivated } from '../../apiDefs/deprecated';
import { getAllOauthApis, lookupApiByFragment } from '../../apiDefs/query';
import { APIDescription } from '../../apiDefs/schema';
import { RootState } from '../../types';
import { APISelector } from '../index';

import { SectionHeaderWrapper } from '../sectionHeaderWrapper/SectionHeaderWrapper';

/*
 * This is designed to be a single place of truth for the scopes descriptions.
 * In the future this may be prime for rework as the scopes list expands.
 * There are logical groups of scopes by API, at this point we decided to stay with
 * conditions based on the scope names themselves prior to getting a CMS.
 * Scopes are listed in each API's respective file in apiDefs folder.
 */
const ScopesContent = (): JSX.Element => {
  const selectedOAuthApi = useSelector(
    (state: RootState) => state.oAuthApiSelection.selectedOAuthApi,
  );
  const apiDef = lookupApiByFragment(selectedOAuthApi);
  const scopes = apiDef?.oAuthInfo?.scopes ?? ['profile', 'openid', 'offline_access'];
  const options = getAllOauthApis().filter((item: APIDescription) => !isApiDeactivated(item));
  const hasClaimScope = scopes.some(element => element.startsWith('claim.'));
  const hasPatientScope = scopes.some(element => element.startsWith('patient/'));

  return (
    <section className="scopes-content">
      <SectionHeaderWrapper heading="Scopes" id="scopes" />
      <p>
        Scopes define the API endpoint your application is allowed to access. We suggest requesting
        the fewest number of scopes for which you require a Veteran to provide consent. You can
        always request access to additional scopes if a Veteran or VSO needs the data while using
        your application.
      </p>
      <p>
        <strong>Existing Scopes are:</strong>
      </p>
      <table>
        <thead>
          <tr>
            <th>Scope</th>
            <th>Values and description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>profile</code>
            </td>
            <td>
              Granted by default, allows access to a user&apos;s first and last name and email.
            </td>
          </tr>
          <tr>
            <td>
              <code>offline_access</code>
            </td>
            <td>
              This scope causes the authorization server to provide a refresh token when the{' '}
              <HashLink to={{ ...location, hash: '#id-token' }}>access token</HashLink> is
              requested.
            </td>
          </tr>
          <tr>
            <td>
              <code>openid</code>
            </td>
            <td>
              An <code>id_token</code> is available in the authorization code flow (response_type =
              code) token response when the &apos;openid&apos; scope is used.
            </td>
          </tr>
          <tr>
            <td>
              <code>launch</code>
            </td>
            <td>
              This scope enables the SMART-on-FHIR launch context. This scope must be used with the
              <code>launch</code> parameter, as described in the table under&nbsp;
              <HashLink to={{ ...location, hash: '#requesting-authorization' }}>Requesting authorization</HashLink>.
            </td>
          </tr>
          <tr>
            <td>
              <code>fhirUser</code>
            </td>
            <td>
              This scope adds a <code>fhirUser</code> claim to the <code>id_token</code>. The value
              of the <code>fhirUser</code> claim is a URL of a FHIR resource representing the current user.
              <p>
                Learn more about the&nbsp;
                <a href="http://www.hl7.org/fhir/smart-app-launch/scopes-and-launch-context/index.html#scopes-for-requesting-identity-data">
                  fhirUser scope
                </a>.
              </p>
            </td>
          </tr>
        </tbody>
      </table>

      <APISelector
        options={options}
        selectedOption={selectedOAuthApi}
        selectLabel="Select an API to show and describe the related scopes"
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
                  <p>To view a user&apos;s VA health claims information, use the scopes below.</p>
                  <ul>
                    {scopes
                      .filter(element => element.startsWith('claim.'))
                      .map((scope: string) => (
                        <li key={scope}>
                          <code>{scope}</code>
                        </li>
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
                    View a user&apos;s VA Health records and patient information, see specific read
                    only scopes below.
                  </p>
                  <ul>
                    {scopes
                      .filter(element => element.startsWith('patient/'))
                      .map((scope: string) => (
                        <li key={scope}>
                          <code>{scope}</code>
                        </li>
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
    </section>
  );
};

ScopesContent.propTypes = {};

export { ScopesContent };
