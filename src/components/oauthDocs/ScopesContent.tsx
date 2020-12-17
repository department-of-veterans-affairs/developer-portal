/* eslint-disable complexity */
/* eslint-disable react/no-unused-prop-types */
import PropTypes from 'prop-types';
import * as React from 'react';
import { APIDescription } from '../../apiDefs/schema';

import DefaultScopes from '../../content/apiDocs/oauth/Scopes.mdx';

interface ScopesContentProps {
  apiDef: APIDescription | null;
  options: APIDescription[];
  selectedOption: string;
  onSelectionChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

// eslint-disable-next-line arrow-body-style
const ScopesContent = (props: ScopesContentProps): JSX.Element => {
  const scopes = props.apiDef?.scopes ?? [];
  const hasClaimScope = scopes.some(element => element.startsWith('claim.'));
  const hasPatientScope = scopes.some(element => element.startsWith('patient/'));

  return (
    <>
      <DefaultScopes />

      {props.selectedOption && (
        // eslint-disable-next-line jsx-a11y/no-onchange
        <select onChange={props.onSelectionChange} value={props.selectedOption} aria-label="Select an API">
          {props.options.map(item => (
            <option value={item.urlFragment} key={item.urlFragment}>
              {item.name}
            </option>
          ))}
        </select>
      )}

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
                    {scopes.includes('claim.read') && (
                      <li><code>claim.read</code></li>
                    )}
                    {scopes.includes('claim.write') && (
                      <li><code>claim.write</code></li>
                    )}
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
                    {scopes.includes('patient/AllergyIntolerance.read') && (
                      <li><code>patient/AllergyIntolerance.read</code></li>
                    )}
                    {scopes.includes('patient/Condition.read') && (
                      <li><code>patient/Condition.read</code></li>
                    )}
                    {scopes.includes('patient/CoverageEligibilityResponse.read') && (
                      <li><code>patient/CoverageEligibilityResponse.read</code></li>
                    )}
                    {scopes.includes('patient/CommunityCareEligibility.read') && (
                      <li><code>patient/CommunityCareEligibility.read</code></li>
                    )}
                    {scopes.includes('patient/DiagnosticReport.read') && (
                      <li><code>patient/DiagnosticReport.read</code></li>
                    )}
                    {scopes.includes('patient/Immunization.read') && (
                      <li><code>patient/Immunization.read</code></li>
                    )}
                    {scopes.includes('patient/Medication.read') && (
                      <li><code>patient/Medication.read</code></li>
                    )}
                    {scopes.includes('patient/MedicationOrder.read') && (
                      <li><code>patient/MedicationOrder.read</code></li>
                    )}
                    {scopes.includes('patient/MedicationRequest.read') && (
                      <li><code>patient/MedicationRequest.read</code></li>
                    )}
                    {scopes.includes('patient/MedicationStatement.read') && (
                      <li><code>patient/MedicationStatement.read</code></li>
                    )}
                    {scopes.includes('patient/Observation.read') && (
                      <li><code>patient/Observation.read</code></li>
                    )}
                    {scopes.includes('patient/Patient.read') && (
                      <li><code>patient/Patient.read</code></li>
                    )}
                    {scopes.includes('patient/Procedure.read') && (
                      <li><code>patient/Procedure.read</code></li>
                    )}
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
  onSelectionChange: PropTypes.func,
  options: PropTypes.array,
  selectedOption: PropTypes.string,
};

export { ScopesContent };
