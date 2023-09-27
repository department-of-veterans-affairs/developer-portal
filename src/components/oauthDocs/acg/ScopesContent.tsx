/* eslint-disable max-lines */
import * as React from 'react';
import { Link } from 'react-router-dom';

import { SectionHeaderWrapper } from '../../sectionHeaderWrapper/SectionHeaderWrapper';
import { ApiRequiredProps } from '../../../containers/documentation/DocumentationRoot';

/*
 * This is designed to be a single place of truth for the scopes descriptions.
 * In the future this may be prime for rework as the scopes list expands.
 * There are logical groups of scopes by API, at this point we decided to stay with
 * conditions based on the scope names themselves prior to getting a CMS.
 * Scopes are listed in each API's respective file in apiDefs folder.
 */
// eslint-disable-next-line complexity
const ScopesContent = (props: ApiRequiredProps): JSX.Element => {
  const { api } = props;
  const scopes = api.oAuthInfo?.acgInfo?.scopes ?? ['profile', 'openid', 'offline_access'];
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
              <Link to="#id-token">access token</Link> is requested.
            </td>
          </tr>
          <tr>
            <td>
              <code>openid</code>
            </td>
            <td>
              An <code>id_token</code> is available in the authorization code grant (response_type =
              code) token response when the &apos;openid&apos; scope is used.
            </td>
          </tr>
        </tbody>
      </table>

      {scopes.length > 0 && (
        <>
          <p>
            <strong>API-specific scopes:</strong>
          </p>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Scope</th>
                  <th>Values and Description</th>
                </tr>
              </thead>
              <tbody>
                {scopes.includes('fhirUser') && (
                  <tr>
                    <td>
                      <code>fhirUser</code>
                    </td>
                    <td>
                      This scope adds a <code>fhirUser</code> claim to the <code>id_token</code>.
                      The value of the <code>fhirUser</code> claim is a URL of a FHIR resource
                      representing the current user.
                      <p>
                        Learn more about the&nbsp;
                        <a href="http://www.hl7.org/fhir/smart-app-launch/scopes-and-launch-context/index.html#scopes-for-requesting-identity-data">
                          fhirUser scope
                        </a>
                        .
                      </p>
                    </td>
                  </tr>
                )}
                {scopes.includes('launch') && (
                  <tr>
                    <td>
                      <code>launch</code>
                    </td>
                    <td>
                      This scope enables the SMART-on-FHIR launch context. This scope must be used
                      with the&nbsp;
                      <code>launch</code> parameter, as described in the table under&nbsp;
                      <Link to="#requesting-authorization">Requesting authorization</Link>.
                    </td>
                  </tr>
                )}
                {scopes.includes('launch/patient') && (
                  <tr>
                    <td>
                      <code>launch/patient</code>
                    </td>
                    <td>
                      A permission setting to obtain the patient&apos;s identifier in the token
                      response when the app is launched from an EHR.
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
                        View a user&apos;s VA Health records and patient information, see specific
                        read only scopes below.
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
                {scopes.includes('disability_rating.read') && (
                  <tr>
                    <td>
                      <code>disability_rating.read</code>
                    </td>
                    <td>
                      View a Veteran&apos;s VA disability ratings and the effective date of the
                      rating
                    </td>
                  </tr>
                )}
                {scopes.includes('enrolled_benefits.read') && (
                  <tr>
                    <td>
                      <code>enrolled_benefits.read</code>
                    </td>
                    <td>Gets enrolled benefits information</td>
                  </tr>
                )}
                {scopes.includes('flashes.read') && (
                  <tr>
                    <td>
                      <code>flashes.read</code>
                    </td>
                    <td>Retrieve certain benefit flashes associated with a Veteran</td>
                  </tr>
                )}
                {scopes.includes('service_history.read') && (
                  <tr>
                    <td>
                      <code>service_history.read</code>
                    </td>
                    <td>
                      View a Veteran&apos;s service history including deployments and discharge
                      status
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
                {scopes.includes('veteran/appeals.read') && (
                  <tr>
                    <td>
                      <code>veteran/appeals.read</code>
                    </td>
                    <td>
                      Lets the app see your:
                      <ul>
                        <li>Board Appeals</li>
                        <li>Supplemental Claims</li>
                        <li>Higher-Level Reviews</li>
                        <li>Legacy appeals</li>
                        <li>Appealable issues</li>
                      </ul>
                    </td>
                  </tr>
                )}
                {scopes.includes('veteran/appeals.write') && (
                  <tr>
                    <td>
                      <code>veteran/appeals.write</code>
                    </td>
                    <td>
                      Lets the app submit the following for you:
                      <ul>
                        <li>Board Appeals</li>
                        <li>Supplemental Claims</li>
                        <li>Higher-Level Reviews</li>
                      </ul>
                    </td>
                  </tr>
                )}
                {scopes.includes('representative/appeals.read') && (
                  <tr>
                    <td>
                      <code>representative/appeals.read</code>
                    </td>
                    <td>
                      Lets the program or app see a Veteran&apos;s:
                      <ul>
                        <li>Board Appeals</li>
                        <li>Supplemental Claims</li>
                        <li>Higher-Level Reviews</li>
                        <li>Legacy appeals</li>
                        <li>Appealable issues</li>
                      </ul>
                    </td>
                  </tr>
                )}
                {scopes.includes('representative/appeals.write') && (
                  <tr>
                    <td>
                      <code>representative/appeals.write</code>
                    </td>
                    <td>
                      Lets the program or app submit the following for a Veteran:
                      <ul>
                        <li>Board Appeals</li>
                        <li>Supplemental Claims</li>
                        <li>Higher-Level Reviews</li>
                      </ul>
                    </td>
                  </tr>
                )}
                {scopes.includes('veteran/AppealableIssues.read') && (
                  <tr>
                    <td>
                      <code>veteran/AppealableIssues.read</code>
                    </td>
                    <td>
                      Lets the app see info from your appealable issues, which are issues from your
                      claims that may be eligible for appeal.
                    </td>
                  </tr>
                )}
                {scopes.includes('representative/AppealableIssues.read') && (
                  <tr>
                    <td>
                      <code>representative/AppealableIssues.read</code>
                    </td>
                    <td>
                      Lets the program or app see info about a Veteran’s Appealable issues, which
                      are issues from a Veteran’s claims that may be eligible for appeal.
                    </td>
                  </tr>
                )}
                {scopes.includes('veteran/AppealsStatus.read') && (
                  <tr>
                    <td>
                      <code>veteran/AppealsStatus.read</code>
                    </td>
                    <td>Lets the app see the status of your VA decision reviews and appeals.</td>
                  </tr>
                )}
                {scopes.includes('representative/AppealsStatus.read') && (
                  <tr>
                    <td>
                      <code>representative/AppealsStatus.read</code>
                    </td>
                    <td>
                      Lets the program or app see the status of a Veteran’s decision reviews and
                      appeals, including both AMA and legacy benefit appeals.
                    </td>
                  </tr>
                )}
                {scopes.includes('veteran/HigherLevelReviews.read') && (
                  <tr>
                    <td>
                      <code>veteran/HigherLevelReviews.read</code>
                    </td>
                    <td>
                      Lets the app see info from your Higher-Level Reviews, which are appeals used
                      when you disagree with a VA decision and want a senior reviewer to look at
                      your case.
                    </td>
                  </tr>
                )}
                {scopes.includes('representative/HigherLevelReviews.read') && (
                  <tr>
                    <td>
                      <code>representative/HigherLevelReviews.read</code>
                    </td>
                    <td>
                      Lets the program or app see info about a Veteran’s Higher-Level Reviews, which
                      can be submitted when a Veteran disagrees with a VA decision and wants a
                      senior reviewer to look at the case.
                    </td>
                  </tr>
                )}
                {scopes.includes('veteran/HigherLevelReviews.write') && (
                  <tr>
                    <td>
                      <code>veteran/HigherLevelReviews.write</code>
                    </td>
                    <td>
                      Lets the app submit Higher-Level Reviews for you. Higher-Level Reviews are
                      appeals used when you disagree with a VA decision and want a senior reviewer
                      to look at your case.
                    </td>
                  </tr>
                )}
                {scopes.includes('representative/HigherLevelReviews.write') && (
                  <tr>
                    <td>
                      <code>representative/HigherLevelReviews.write</code>
                    </td>
                    <td>
                      Lets the program or app submit Higher-Level reviews for a Veteran on your
                      behalf. Higher-Level Reviews are used when a Veteran disagrees with a VA
                      decision and wants a senior reviewer to look at their case.
                    </td>
                  </tr>
                )}
                {scopes.includes('veteran/LegacyAppeals.read') && (
                  <tr>
                    <td>
                      <code>veteran/LegacyAppeals.read</code>
                    </td>
                    <td>
                      Lets the app see info from your legacy appeals, which are appeals submitted
                      before February 19, 2019.
                    </td>
                  </tr>
                )}
                {scopes.includes('representative/LegacyAppeals.read') && (
                  <tr>
                    <td>
                      <code>representative/LegacyAppeals.read</code>
                    </td>
                    <td>
                      Lets the program or app see info about a Veteran’s legacy appeals, which are
                      appeals submitted before February 19, 2019.
                    </td>
                  </tr>
                )}
                {scopes.includes('veteran/NoticeOfDisagreements.read') && (
                  <tr>
                    <td>
                      <code>veteran/NoticeOfDisagreements.read</code>
                    </td>
                    <td>
                      Lets the app see info from your Board Appeals, which are used when you appeal
                      a VA decision to a Veterans Law Judge at the Board of Veterans’ Appeals.
                    </td>
                  </tr>
                )}
                {scopes.includes('representative/NoticeOfDisagreements.read') && (
                  <tr>
                    <td>
                      <code>representative/NoticeOfDisagreements.read</code>
                    </td>
                    <td>
                      Lets the program or app see info from a Veteran’s Board Appeals, which are
                      used to appeal a VA decision to a Veterans Law Judge at the Board of Veterans’
                      Appeals.
                    </td>
                  </tr>
                )}
                {scopes.includes('veteran/NoticeOfDisagreements.write') && (
                  <tr>
                    <td>
                      <code>veteran/NoticeOfDisagreements.write</code>
                    </td>
                    <td>
                      Lets the app submit Board Appeals for you. Board Appeals are used when you
                      appeal a VA decision to a Veterans Law Judge at the Board of Veterans’
                      Appeals.
                    </td>
                  </tr>
                )}
                {scopes.includes('representative/NoticeOfDisagreements.write') && (
                  <tr>
                    <td>
                      <code>representative/NoticeOfDisagreements.write</code>
                    </td>
                    <td>
                      Lets the program or app submit Board Appeals for a Veteran on your behalf.
                      Board Appeals are used to appeal a VA decision to a Veterans Law Judge at the
                      Board of Veterans’ Appeals.
                    </td>
                  </tr>
                )}
                {scopes.includes('veteran/SupplementalClaims.read') && (
                  <tr>
                    <td>
                      <code>veteran/SupplementalClaims.read</code>
                    </td>
                    <td>
                      Lets the app see info from your Supplemental Claims, which are used to add or
                      identify new evidence to support your claim.
                    </td>
                  </tr>
                )}
                {scopes.includes('representative/SupplementalClaims.read') && (
                  <tr>
                    <td>
                      <code>representative/SupplementalClaims.read</code>
                    </td>
                    <td>
                      Lets the program or app see info from a Veteran’s Supplemental Claims, which
                      are used to add or identify new evidence to support a Veteran’s claim.
                    </td>
                  </tr>
                )}
                {scopes.includes('veteran/SupplementalClaims.write') && (
                  <tr>
                    <td>
                      <code>veteran/SupplementalClaims.write</code>
                    </td>
                    <td>
                      Lets the app submit Supplemental Claims for you. Supplemental Claims are used
                      to add or identify new evidence to support your claim.
                    </td>
                  </tr>
                )}
                {scopes.includes('representative/SupplementalClaims.write') && (
                  <tr>
                    <td>
                      <code>representative/SupplementalClaims.write</code>
                    </td>
                    <td>
                      Lets the program or app submit Supplemental Claims for a Veteran on your
                      behalf. Supplemental Claims are used to add or identify new evidence to
                      support a Veteran’s claim.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  );
};

ScopesContent.propTypes = {};

export { ScopesContent };
