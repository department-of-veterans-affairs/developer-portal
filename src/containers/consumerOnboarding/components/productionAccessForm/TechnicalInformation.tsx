/* eslint-disable id-length */
/* eslint-disable complexity */
import classNames from 'classnames';
import { useFormikContext } from 'formik';
import React, { FC, useEffect, useRef } from 'react';
import { TextField, FieldSet, CheckboxRadioField } from '../../../../components';
import { Values } from '../../ProductionAccess';
import { includesOAuthAPI } from '../../../../apiDefs/query';

const TechnicalInformation: FC = () => {
  const { values } = useFormikContext<Values>();
  const {
    storePIIOrPHI,
    apis,
    exposeVeteranInformationToThirdParties,
    distributingAPIKeysToCustomers,
  } = values;
  const storePIIOrPHIBorderClass = storePIIOrPHI === 'yes' ? 'vads-u-border-left--4px' : '';
  const storePIIOrPHIBorderColorClass =
    storePIIOrPHI === 'yes' ? 'vads-u-border-color--primary-alt-light' : '';
  const veteransInfoBorderClass =
    exposeVeteranInformationToThirdParties === 'yes' ? 'vads-u-border-left--4px' : '';
  const veteransInfoBorderColorClass =
    exposeVeteranInformationToThirdParties === 'yes'
      ? 'vads-u-border-color--primary-alt-light'
      : '';
  const keysToCustomersBorderClass =
    distributingAPIKeysToCustomers === 'yes' ? 'vads-u-border-left--4px' : '';
  const keysToCustomersBorderColorClass =
    distributingAPIKeysToCustomers === 'yes' ? 'vads-u-border-color--primary-alt-light' : '';
  const firstInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    firstInputRef.current?.focus();
  }, []);

  return (
    <>
      <h3>Technical information</h3>
      <TextField
        as="textarea"
        label="We require you to store your production key and/or OAuth credentials securely so as not to risk unauthorized exposure. How and where do you provide this?"
        name="productionOrOAuthKeyCredentialStorage"
        required
        className="vads-u-margin-top--4 medium-screen:vads-l-col--10"
        innerRef={firstInputRef}
      />
      <FieldSet
        className={classNames(
          'vads-u-margin-top--2',
          'vads-u-padding-x--1p5',
          'vads-u-padding-bottom--1p5',
          storePIIOrPHIBorderClass,
          storePIIOrPHIBorderColorClass,
        )}
        legend="Do you store PII/PHI?"
        legendClassName="vads-u-font-weight--normal vads-u-font-size--base"
        name="storePIIOrPHI"
        required
      >
        <CheckboxRadioField type="radio" label="Yes" name="storePIIOrPHI" value="yes" required />
        <CheckboxRadioField type="radio" label="No" name="storePIIOrPHI" value="no" required />
        {storePIIOrPHI === 'yes' && (
          <div className="vads-u-margin-left--4">
            <TextField
              as="textarea"
              label="Describe why this information is stored, and how it is securely stored/encrypted."
              name="piiStorageMethod"
              className="vads-u-margin-top--4"
              required
            />
            <TextField
              as="textarea"
              label="Describe the safeguards you have in place to prevent multiple, unnecessary requests."
              name="multipleReqSafeguards"
              className="vads-u-margin-top--4"
              required
            />
            <TextField
              as="textarea"
              label="Describe your breach management process."
              name="breachManagementProcess"
              className="vads-u-margin-top--4"
              required
            />
            <TextField
              as="textarea"
              label="Provide information about your vulnerability management and patch process."
              name="vulnerabilityManagement"
              className="vads-u-margin-top--4"
              required
            />
          </div>
        )}
      </FieldSet>
      {includesOAuthAPI(apis) && (
        <>
          <FieldSet
            className={classNames(
              'vads-u-margin-top--2',
              'vads-u-padding-x--1p5',
              'vads-u-padding-bottom--1p5',
              veteransInfoBorderClass,
              veteransInfoBorderColorClass,
            )}
            legend="Does your application expose Veterans’ health, claims, disabilities, or service history data to any third parties, through its own APIs or otherwise?"
            legendClassName="vads-u-font-weight--normal vads-u-font-size--base"
            name="exposeVeteranInformationToThirdParties"
            required
          >
            <CheckboxRadioField
              type="radio"
              label="Yes"
              name="exposeVeteranInformationToThirdParties"
              value="yes"
              required
            />
            <CheckboxRadioField
              type="radio"
              label="No"
              name="exposeVeteranInformationToThirdParties"
              value="no"
              required
            />
            {exposeVeteranInformationToThirdParties === 'yes' && (
              <TextField
                label="Enter a description."
                name="thirdPartyInfoDescription"
                className="vads-u-margin-top--4 vads-u-margin-left--4"
                required
              />
            )}
          </FieldSet>

          <TextField
            as="textarea"
            label="List the scopes for which you are requesting access."
            name="scopesAccessRequested"
            className="vads-u-margin-top--4"
            required
          />
        </>
      )}

      {values.apis.includes('benefits') && (
        <FieldSet
          className={classNames(
            'vads-u-margin-top--2',
            'vads-u-padding-x--1p5',
            'vads-u-padding-bottom--1p5',
            keysToCustomersBorderClass,
            keysToCustomersBorderColorClass,
          )}
          legend="Will you be distributing your production API key to any customers for them to run their own hosted instances of your application? "
          legendClassName="vads-u-font-weight--normal vads-u-font-size--base"
          name="distributingAPIKeysToCustomers"
          required
        >
          <CheckboxRadioField
            type="radio"
            label="Yes"
            name="distributingAPIKeysToCustomers"
            value="yes"
            required
          />
          <CheckboxRadioField
            type="radio"
            label="No"
            name="distributingAPIKeysToCustomers"
            value="no"
            required
          />
          {distributingAPIKeysToCustomers === 'yes' && (
            <div className="vads-u-margin-left--4">
              <TextField
                label={
                  <p>
                    Provide the naming convention you will have each customer use for the{' '}
                    <code>source</code> field to distinguish them in case there are issues after
                    upload.
                  </p>
                }
                name="namingConvention"
                className="vads-u-margin-top--4"
                required
              />
              <TextField
                label="Indicate whether and describe how you will maintain a centralized back-end to log each customer’s submissions."
                name="centralizedBackendLog"
                className="vads-u-margin-top--4"
                required
              />
            </div>
          )}
        </FieldSet>
      )}
      {values.apis.includes('health') && (
        <FieldSet
          className={classNames(
            'vads-u-margin-top--2',
            'vads-u-padding-x--1p5',
            'vads-u-padding-bottom--1p5',
          )}
          legend={
            <span>
              We strongly recommend you{' '}
              <a
                href="https://myhealthapplication.com/list-your-app"
                target="_blank"
                rel="noreferrer"
              >
                register and publish
              </a>{' '}
              your app on this website to show you attest to the{' '}
              <a
                href="https://www.carinalliance.com/our-work/trust-framework-and-code-of-conduct/"
                target="_blank"
                rel="noreferrer"
              >
                CARIN Alliance Code of Conduct.
              </a>{' '}
              Registration is free, and prior to your demo, we will check this website to see if
              your app is listed.
            </span>
          }
          name="listedOnMyHealthApplication"
          legendClassName="vads-u-font-weight--normal vads-u-font-size--base"
          required
        >
          <CheckboxRadioField
            type="radio"
            label="Yes"
            name="listedOnMyHealthApplication"
            value="yes"
            required
          />
          <CheckboxRadioField
            type="radio"
            label="No"
            name="listedOnMyHealthApplication"
            value="no"
            required
          />
        </FieldSet>
      )}
    </>
  );
};

export { TechnicalInformation };
