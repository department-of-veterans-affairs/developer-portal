/* eslint-disable @typescript-eslint/no-dynamic-delete, id-length, max-lines */
import React, { FC, useState } from 'react';
import { Helmet } from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useCookies } from 'react-cookie';
import { Formik, Form, FormikHelpers } from 'formik';
import classNames from 'classnames';
import { faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import Modal from 'component-library-legacy/Modal';
import { VaSegmentedProgressBar } from '@department-of-veterans-affairs/component-library/dist/react-bindings';
import { Link, NavLink, useNavigate } from 'react-router-dom';
// import Icon508 from '../../assets/508-compliant.svg';
import { apisFor } from '../../apiDefs/query';
import { ProdAccessFormSteps } from '../../apiDefs/schema';
import { PageHeader } from '../../components';
import { useModalController } from '../../hooks';
import { ProductionAccessRequest } from '../../types/forms/productionAccess';
import { makeRequest, ResponseType } from '../../utils/makeRequest';
import vaLogo from '../../assets/VaSeal.png';
import hiFive from '../../assets/high-five.svg';
import { LPB_FORGERY_TOKEN, LPB_PRODUCTION_ACCESS_URL, yesOrNoValues } from '../../types/constants';
import { CONSUMER_PROD_PATH, SUPPORT_CONTACT_PATH } from '../../types/constants/paths';
import {
  BasicInformation,
  PolicyGovernance,
  TechnicalInformation,
  Verification,
} from './components/productionAccessForm';
import validationSchema from './validationSchema';
import './ProductionAccess.scss';

const possibleSteps = [
  'Verification',
  'Basic information',
  'Technical information',
  'Policy governance',
];

const STEP_HEADING_ID = 'form-step-heading';

export interface Values {
  apis: string[];
  oAuthApplicationType?: string;
  oAuthPublicKey?: string;
  oAuthRedirectURI?: string;
  is508Compliant?: string;
  isUSBasedCompany?: string;
  termsOfService?: boolean;
  primaryContact: {
    firstName: string;
    lastName: string;
    email: string;
  };
  secondaryContact: {
    firstName: string;
    lastName: string;
    email: string;
  };
  organization: string;
  phoneNumber?: string;
  appName: string;
  monitizedVeteranInformation: string;
  monitizationExplanation?: string;
  veteranFacing: string;
  website: string;
  platforms: string;
  appDescription: string;
  vasiSystemName: string;
  applicationName?: string;
  statusUpdateEmails: string[];
  valueProvided: string;
  businessModel?: string;
  signUpLink: string;
  supportLink: string;
  storePIIOrPHI: string;
  piiStorageMethod: string;
  multipleReqSafeguards: string;
  breachManagementProcess: string;
  vulnerabilityManagement: string;
  exposeVeteranInformationToThirdParties: string;
  thirdPartyInfoDescription: string;
  scopesAccessRequested?: string;
  distributingAPIKeysToCustomers: string;
  namingConvention: string;
  centralizedBackendLog: string;
  listedOnMyHealthApplication: string;
  productionKeyCredentialStorage: string;
  productionOrOAuthKeyCredentialStorage: string;
  privacyPolicyURL?: string;
  termsOfServiceURL?: string;
  country: string;
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  state: string;
  zipCode5: string;
}

const initialValues: Values = {
  addressLine1: '',
  addressLine2: '',
  addressLine3: '',
  apis: [],
  appDescription: '',
  appName: '',
  breachManagementProcess: '',
  businessModel: '',
  centralizedBackendLog: '',
  city: '',
  country: '',
  distributingAPIKeysToCustomers: '',
  exposeVeteranInformationToThirdParties: '',
  is508Compliant: '',
  isUSBasedCompany: '',
  listedOnMyHealthApplication: '',
  monitizationExplanation: '',
  monitizedVeteranInformation: '',
  multipleReqSafeguards: '',
  namingConvention: '',
  oAuthApplicationType: '',
  oAuthPublicKey: '',
  oAuthRedirectURI: '',
  organization: '',
  phoneNumber: '',
  piiStorageMethod: '',
  platforms: '',
  primaryContact: {
    email: '',
    firstName: '',
    lastName: '',
  },
  privacyPolicyURL: '',
  productionKeyCredentialStorage: '',
  productionOrOAuthKeyCredentialStorage: '',
  scopesAccessRequested: '',
  secondaryContact: {
    email: '',
    firstName: '',
    lastName: '',
  },
  signUpLink: '',
  state: '',
  statusUpdateEmails: [''],
  storePIIOrPHI: '',
  supportLink: '',
  termsOfService: false,
  termsOfServiceURL: '',
  thirdPartyInfoDescription: '',
  valueProvided: '',
  vasiSystemName: '',
  veteranFacing: '',
  vulnerabilityManagement: '',
  website: '',
  zipCode5: '',
};

const renderStepContent = (step: number): JSX.Element => {
  switch (step) {
    case 0:
      return <Verification />;
    case 1:
      return <BasicInformation />;
    case 2:
      return <TechnicalInformation />;
    case 3:
      return <PolicyGovernance />;
    default:
      return <div>Not Found</div>;
  }
};

const handleSubmitButtonClick = (): void => {
  setTimeout(() => {
    const errorElements = document.querySelectorAll<HTMLElement>('[aria-invalid=true]');

    if (errorElements.length > 0) {
      errorElements[0].focus();
    }
  }, 0);
};

const ProductionAccess: FC = () => {
  const [submissionError, setSubmissionError] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [steps, setSteps] = useState(possibleSteps);
  const currentValidationSchema = validationSchema[activeStep];
  const isLastStep = activeStep === steps.length - 1;
  const setCookie = useCookies(['CSRF-TOKEN'])[1];

  const { modalVisible: modal1Visible, setModalVisible: setModal1Visible } = useModalController();
  const { modalVisible: modal2Visible, setModalVisible: setModal2Visible } = useModalController();
  const { modalVisible: modal4Visible, setModalVisible: setModal4Visible } = useModalController();
  const navigate = useNavigate();

  const calculateSteps = (values: Values): void => {
    const { apis } = values;
    const selectedAPIs = apisFor(apis);
    if (selectedAPIs.some(api => api.lastProdAccessStep === ProdAccessFormSteps.Four)) {
      setSteps([...possibleSteps.slice(0, 4)]);
    } else if (selectedAPIs.some(api => api.lastProdAccessStep === ProdAccessFormSteps.Three)) {
      setSteps([...possibleSteps.slice(0, 3)]);
    } else {
      setSteps([...possibleSteps.slice(0, 2)]);
    }
  };

  /**
   * 508 COMPLIANT MODAL
   */

  // commented out in API-9906 modal and the 508 question are going to be researched by UX

  // const { modalVisible: modal508Visible, setModalVisible: setModal508Visible } =
  //   useModalController();
  // // const [acknowledge508, setAcknowledge508] = useState(false);

  // const Modal508Compliant = (): JSX.Element => (
  //   <Modal
  //     id="warning-508-complicance-modal"
  //     title="Must be Section 508 Compliant!"
  //     visible={modal508Visible}
  //     clickToClose
  //     onClose={(): void => setModal508Visible(false)}
  //     primaryButton={{
  //       action: (): void => {
  //         setModal508Visible(false);
  //         setAcknowledge508(true);
  //       },
  //       text: 'I acknowledge',
  //     }}
  //   >
  //     <>
  //       <img src={Icon508} aria-hidden="true" alt="" className={classNames('va-modal-icon')} />
  //       <p>
  //         Consumer websites and applications must be Section 508 compliant to get production access.
  //       </p>
  //       <p>
  //         Learn about becoming{' '}
  //         <a href="http://section508.gov" target="_blank" rel="noopener noreferrer">
  //           Section 508 Compliant
  //         </a>{' '}
  //         or contact us with questions.
  //       </p>
  //     </>
  //   </Modal>
  // );

  /**
   * FORM HANDLERS
   */
  const handleBack = (): void => {
    if (activeStep === 0) {
      setModal1Visible(true);
    } else {
      setActiveStep(activeStep - 1);
      setTimeout(() => {
        // focus on h2 after moving to previous step
        const stepHeading = document.getElementById(STEP_HEADING_ID);
        stepHeading?.focus();
      }, 0);
    }
  };

  const handleSubmit = async (values: Values, actions: FormikHelpers<Values>): Promise<void> => {
    if (isLastStep) {
      setSubmissionError(false);
      delete values.isUSBasedCompany;
      delete values.termsOfService;
      // Removing the blank optional values from the request body
      const filteredValues = JSON.parse(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        JSON.stringify(values, (k, v) => (v === '' ? null : v)),
      ) as Values;
      Object.keys(filteredValues).forEach(
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        key => filteredValues[key] == null && delete filteredValues[key],
      );

      const policyDocuments =
        filteredValues.termsOfServiceURL && filteredValues.privacyPolicyURL
          ? [filteredValues.termsOfServiceURL, filteredValues.privacyPolicyURL]
          : undefined;

      // delete privacyPolicyURL and termsOfServiceURL because the backend doesn't accept them,
      // instead it uses the policyDocuments array.
      delete filteredValues.privacyPolicyURL;
      delete filteredValues.termsOfServiceURL;

      const applicationBody: ProductionAccessRequest = {
        ...filteredValues,
        apis: filteredValues.apis.join(','),
        distributingAPIKeysToCustomers:
          filteredValues.distributingAPIKeysToCustomers === yesOrNoValues.Yes,
        exposeVeteranInformationToThirdParties:
          filteredValues.exposeVeteranInformationToThirdParties === yesOrNoValues.Yes,
        is508Compliant: filteredValues.is508Compliant === yesOrNoValues.Yes,
        listedOnMyHealthApplication:
          filteredValues.listedOnMyHealthApplication === yesOrNoValues.Yes,
        monitizedVeteranInformation:
          filteredValues.monitizedVeteranInformation === yesOrNoValues.Yes,
        policyDocuments,
        signUpLink: [filteredValues.signUpLink],
        statusUpdateEmails: filteredValues.statusUpdateEmails,
        storePIIOrPHI: filteredValues.storePIIOrPHI === yesOrNoValues.Yes,
        supportLink: [filteredValues.supportLink],
        veteranFacing: filteredValues.veteranFacing === yesOrNoValues.Yes,
      };
      // The backend cannont accept null values, so this is to remove blank optional fields that are null because of the filtering above
      Object.keys(applicationBody).forEach(key => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (Array.isArray(applicationBody[key]) && applicationBody[key][0] == null) {
          delete applicationBody[key];
        }
      });
      try {
        setCookie('CSRF-TOKEN', LPB_FORGERY_TOKEN, {
          path: LPB_PRODUCTION_ACCESS_URL,
          sameSite: 'strict',
          secure: true,
        });

        await makeRequest(
          LPB_PRODUCTION_ACCESS_URL,
          {
            body: JSON.stringify(applicationBody),
            headers: {
              'X-Csrf-Token': LPB_FORGERY_TOKEN,
              accept: 'application/json',
              'content-type': 'application/json',
            },
            method: 'POST',
          },
          { responseType: ResponseType.TEXT },
        );
        setModal4Visible(true);
      } catch (error: unknown) {
        setSubmissionError(true);
      }
    } else {
      if (values.isUSBasedCompany === yesOrNoValues.No) {
        setModal2Visible(true);
        return;
      }

      // commented out in API-9906 modal and the 508 question are going to be researched by UX

      // if (values.is508Compliant === yesOrNoValues.No && !acknowledge508) {
      //   setModal508Visible(true);
      //   return;
      // }

      calculateSteps(values);
      setActiveStep(activeStep + 1);
      await actions.setTouched({});
      actions.setSubmitting(false);
      setTimeout(() => {
        // focus on h2 after moving to next step
        const stepHeading = document.getElementById(STEP_HEADING_ID);
        stepHeading?.focus();
      }, 0);
    }
  };

  /**
   * COMPONENT
   */
  return (
    <div className={classNames('vads-l-grid-container', 'vads-u-padding--4', 'prod-access-form')}>
      <Helmet>
        <title>Production access form</title>
      </Helmet>
      <PageHeader header="Production access form" />
      <div className="vads-l-row">
        <div className={classNames('vads-l-col--12', 'vads-u-padding-x--2p5')}>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={currentValidationSchema}
            validateOnBlur={false}
            validateOnChange={false}
          >
            <Form noValidate name="production-access">
              {activeStep === 0 ? (
                <>
                  <VaSegmentedProgressBar
                    current={1}
                    total={4}
                    ariaLabel="Step 1. There will be 1 to 3 more steps depending on the APIs you select."
                  />
                  <h2
                    id={STEP_HEADING_ID}
                    className={classNames(
                      'vads-u-font-size--h4',
                      'vads-u-display--inline-block',
                      'vads-u-margin-bottom--0',
                    )}
                    tabIndex={-1}
                  >
                    Step 1: Verification
                  </h2>
                </>
              ) : (
                <>
                  <VaSegmentedProgressBar current={activeStep + 1} total={steps.length} />
                  <h2
                    id={STEP_HEADING_ID}
                    className={classNames(
                      'vads-u-font-size--h4',
                      'vads-u-display--inline-block',
                      'vads-u-margin-bottom--0',
                    )}
                    tabIndex={-1}
                  >
                    {`Step ${activeStep + 1} of ${steps.length}: ${steps[activeStep]}`}
                  </h2>
                </>
              )}
              {renderStepContent(activeStep)}
              <div className="vads-u-margin-y--5">
                <button
                  className={classNames(
                    'usa-button',
                    'va-api-button-default',
                    'vads-u-border--2px',
                    'vads-u-color--primary',
                    'vads-u-margin-right--3',
                  )}
                  type="button"
                  onClick={handleBack}
                >
                  <FontAwesomeIcon icon={faAngleDoubleLeft as IconProp} /> Back
                </button>
                {isLastStep ? (
                  <button
                    type="submit"
                    className="usa-button-primary va-button-primary vads-u-width--auto"
                    onClick={handleSubmitButtonClick}
                  >
                    Submit your application
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="usa-button vads-u-width--auto"
                    onClick={handleSubmitButtonClick}
                  >
                    Continue <FontAwesomeIcon icon={faAngleDoubleRight as IconProp} />
                  </button>
                )}
              </div>
              <div>
                {activeStep > 0 && (
                  <button
                    className="vads-u-display--block"
                    type="button"
                    data-show="#cancellation-modal"
                    onClick={(): void => setModal1Visible(true)}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </Form>
          </Formik>
          <Modal
            id="cancellation-modal"
            title="Are you sure you want to leave?"
            visible={modal1Visible}
            onClose={(): void => setModal1Visible(false)}
            primaryButton={{
              action: (): void => navigate(CONSUMER_PROD_PATH),
              text: 'Yes, leave',
            }}
            secondaryButton={{
              action: (): void => setModal1Visible(false),
              text: 'No, stay on form',
            }}
          >
            The information you entered will not be saved.
          </Modal>
          <Modal
            id="non-us-based-modal"
            title="Thank you for your interest!"
            visible={modal2Visible}
            onClose={(): void => setModal2Visible(false)}
            primaryButton={{
              action: (): void => navigate(-1),
              text: 'Close form',
            }}
            classNames={['vads-u-text-align--center']}
          >
            <img
              src={vaLogo}
              width={220}
              alt="Department of Veterans Affairs logo"
              aria-label="Department of Veterans Affairs logo"
            />
            <p>
              We currently only grant access to US-based companies. You may{' '}
              <NavLink to={SUPPORT_CONTACT_PATH}>contact us</NavLink> if you have any questions.
            </p>
          </Modal>
          {/* <Modal508Compliant /> */}
          <Modal
            id="submission-complete-modal"
            title="Thanks for submitting!"
            visible={modal4Visible}
            onClose={(): void => {
              setModal4Visible(false);
              navigate(-1);
            }}
            primaryButton={{
              action: (): void => navigate(-1),
              text: 'Close',
            }}
          >
            <img
              src={hiFive}
              width={220}
              alt="High five clip art"
              aria-label="High five clip art"
            />
            <p>
              <strong>
                We’ve received your production access request and have sent you an email
                confirmation.
              </strong>
              <br />
              We’ll be in touch with the next steps or required changes.
            </p>
          </Modal>
          {submissionError && (
            <va-alert background-only show-icon status="error" visible>
              <p className="vads-u-margin-y--0">
                We encountered a server error while saving your form. Please try again later.
              </p>
              <p className="vads-u-margin-top--1">
                Need assistance? Create an issue through our <Link to="/support">Support page</Link>
                .
              </p>
            </va-alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductionAccess;
