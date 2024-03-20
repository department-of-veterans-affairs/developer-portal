import React from 'react';
import { CheckboxRadioField } from '../../../../components';
import { APIDescription } from '../../../../apiDefs/schema';
import './SandboxAttestation.scss';

interface SandboxAttestationProps {
  api: APIDescription;
}

export const SandboxAttestation = ({ api }: SandboxAttestationProps): JSX.Element => (
  <div className="sandbox-attestation-wrapper vads-u-margin-top--7 vads-u-padding--2 vads-u-background-color--gray-lightest">
    <span className="vads-u-margin-top--0 vads-u-font-weight--bold">
      Requirements for the {api.name}
    </span>
    <span className="form-required-span">(*Required)</span>
    <p>
      If you plan to request production access to the {api.name}, your application&apos;s end users
      must be:
    </p>
    <ol>
      <li>A VA benefits claimant;</li>
      <li>An individual accredited by VA to prepare, present, and prosecute VA benefits claims;</li>
      <li>
        An accredited representative of a Veteran Service Organization (VSO) recognized by VA to
        represent VA benefits claimants; or
      </li>
      <li>
        A person authorized by the VA Secretary to prepare, present, and prosecute VA benefits claim
        pursuant to 38 C.F.R. § 14.630.
      </li>
    </ol>
    <div>
      <CheckboxRadioField
        className="sandbox-attestation-checkbox"
        type="checkbox"
        label="I understand and acknowledge these requirements."
        name="attestationChecked"
        required
        showError
      />
    </div>
  </div>
);
