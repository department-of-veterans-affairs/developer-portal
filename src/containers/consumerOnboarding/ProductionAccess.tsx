/* eslint-disable @typescript-eslint/no-dynamic-delete, id-length, max-lines */

import React, { FC, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Formik, Form, FormikHelpers } from 'formik';
import classNames from 'classnames';
import { faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import Modal from '@department-of-veterans-affairs/component-library/Modal';
import SegmentedProgressBar from '@department-of-veterans-affairs/component-library/SegmentedProgressBar';
import AlertBox from '@department-of-veterans-affairs/component-library/AlertBox';
import { Link, useHistory } from 'react-router-dom';
import { PageHeader } from '../../components';
import { useFlag } from '../../flags';
import { useModalController } from '../../hooks';
import { ProductionAccessRequest } from '../../types/forms/productionAccess';
import { makeRequest, ResponseType } from '../../utils/makeRequest';
import {
  FLAG_LIST_AND_LOOP,
  PRODUCTION_ACCESS_URL,
  YES_OR_NO_RADIO_BUTTON_VALUES,
} from '../../types/constants';
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

export interface Values {
  apis: string[];
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
  phoneNumber: string;
  appName: string;
  monitizedVeteranInformation: string;
  monitizationExplanation?: string;
  veteranFacing: string;
  website: string;
  platforms: string;
  appDescription: string;
  vasiSystemName: string;
  applicationName?: string;
  // statusUpdateEmails, signUpLink, supportLink, policyDocuments can be either a single value or
  // an array until the list and loop component is created
  statusUpdateEmails: string | string[];
  valueProvided: string;
  businessModel?: string;
  signUpLink: string | string[];
  supportLink: string | string[];
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
  veteranFacingDescription: string;
  policyDocuments: string | string[];
}

const initialValues: Values = {
  apis: [],
  appDescription: '',
  appName: '',
  breachManagementProcess: '',
  businessModel: '',
  centralizedBackendLog: '',
  distributingAPIKeysToCustomers: '',
  exposeVeteranInformationToThirdParties: '',
  is508Compliant: '',
  isUSBasedCompany: '',
  listedOnMyHealthApplication: '',
  monitizationExplanation: '',
  monitizedVeteranInformation: '',
  multipleReqSafeguards: '',
  namingConvention: '',
  organization: '',
  phoneNumber: '',
  piiStorageMethod: '',
  platforms: '',
  policyDocuments: '',
  primaryContact: {
    email: '',
    firstName: '',
    lastName: '',
  },
  productionKeyCredentialStorage: '',
  productionOrOAuthKeyCredentialStorage: '',
  scopesAccessRequested: '',
  secondaryContact: {
    email: '',
    firstName: '',
    lastName: '',
  },
  signUpLink: '',
  statusUpdateEmails: '',
  storePIIOrPHI: '',
  supportLink: '',
  termsOfService: false,
  thirdPartyInfoDescription: '',
  valueProvided: '',
  vasiSystemName: '',
  veteranFacing: '',
  veteranFacingDescription: '',
  vulnerabilityManagement: '',
  website: '',
};

// temporary until the list and loop component is done
const getInitialValues = (isListAndLoopEnabled: boolean): Values => {
  if (isListAndLoopEnabled) {
    return {
      ...initialValues,
      policyDocuments: [''],
      signUpLink: [''],
      statusUpdateEmails: [''],
      supportLink: [''],
    };
  }

  return initialValues;
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

const ProductionAccess: FC = () => {
  const [submissionError, setSubmissionError] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [steps, setSteps] = useState(possibleSteps);
  const currentValidationSchema = validationSchema[activeStep];
  const isLastStep = activeStep === steps.length - 1;

  const { modalVisible: modal1Visible, setModalVisible: setModal1Visible } = useModalController();
  const { modalVisible: modal2Visible, setModalVisible: setModal2Visible } = useModalController();
  const { modalVisible: modal3Visible, setModalVisible: setModal3Visible } = useModalController();
  const { modalVisible: modal4Visible, setModalVisible: setModal4Visible } = useModalController();

  const history = useHistory();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const isListAndLoopEnabled = useFlag([FLAG_LIST_AND_LOOP]);

  const calculateSteps = (values: Values): void => {
    const { apis } = values;
    if (
      !apis.some((api: string) =>
        ['claims', 'communityCare', 'health', 'confirmation', 'verification'].includes(api),
      )
    ) {
      setSteps([...possibleSteps.slice(0, 3)]);
      if (
        !apis.some((api: string) =>
          [
            'appeals',
            'decision_reviews',
            'benefits',
            'loan_guaranty',
            'address_validation',
          ].includes(api),
        )
      ) {
        setSteps([...possibleSteps.slice(0, 2)]);
      }
    }
  };

  const handleBack = (): void => {
    if (activeStep === 0) {
      setModal1Visible(true);
    } else {
      setActiveStep(activeStep - 1);
    }
  };
  const handleSubmit = async (values: Values, actions: FormikHelpers<Values>): Promise<void> => {
    setTimeout(() => {
      const errorElements = document.querySelectorAll<HTMLElement>('[aria-invalid=true]');

      if (errorElements.length > 0) {
        errorElements[0].focus();
      }
    }, 0);
    if (isLastStep) {
      setSubmissionError(false);
      delete values.is508Compliant;
      delete values.isUSBasedCompany;
      delete values.termsOfService;
      const filteredValues = JSON.parse(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        JSON.stringify(values, (k, v) => (v === '' ? null : v)),
      ) as Values;
      Object.keys(filteredValues).forEach(
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        key => filteredValues[key] == null && delete filteredValues[key],
      );
      const applicationBody: ProductionAccessRequest = {
        ...filteredValues,
        apis: filteredValues.apis.join(','),
        distributingAPIKeysToCustomers:
          filteredValues.distributingAPIKeysToCustomers === YES_OR_NO_RADIO_BUTTON_VALUES.Yes,
        exposeVeteranInformationToThirdParties:
          filteredValues.exposeVeteranInformationToThirdParties ===
          YES_OR_NO_RADIO_BUTTON_VALUES.Yes,
        listedOnMyHealthApplication:
          filteredValues.listedOnMyHealthApplication === YES_OR_NO_RADIO_BUTTON_VALUES.Yes,
        monitizedVeteranInformation:
          filteredValues.monitizedVeteranInformation === YES_OR_NO_RADIO_BUTTON_VALUES.Yes,
        policyDocuments: Array.isArray(filteredValues.policyDocuments)
          ? filteredValues.policyDocuments
          : [filteredValues.policyDocuments],
        signUpLink: Array.isArray(filteredValues.signUpLink)
          ? filteredValues.signUpLink
          : [filteredValues.signUpLink],
        statusUpdateEmails: Array.isArray(filteredValues.statusUpdateEmails)
          ? filteredValues.statusUpdateEmails
          : [filteredValues.statusUpdateEmails],
        storePIIOrPHI: filteredValues.storePIIOrPHI === YES_OR_NO_RADIO_BUTTON_VALUES.Yes,
        supportLink: Array.isArray(filteredValues.supportLink)
          ? filteredValues.supportLink
          : [filteredValues.supportLink],
        veteranFacing: filteredValues.veteranFacing === YES_OR_NO_RADIO_BUTTON_VALUES.Yes,
      };
      Object.keys(applicationBody).forEach(key => {
        if (Array.isArray(applicationBody[key])) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          if (applicationBody[key][0] == null) {
            delete applicationBody[key];
          }
        }
      });
      try {
        const response = await makeRequest(
          PRODUCTION_ACCESS_URL,
          {
            body: JSON.stringify(applicationBody),
            headers: {
              accept: 'application/json',
              'content-type': 'application/json',
            },
            method: 'POST',
          },
          { responseType: ResponseType.TEXT },
        );
        if (!response.ok) {
          throw Error();
        }
        setModal4Visible(true);
      } catch (error: unknown) {
        setSubmissionError(true);
      }
    } else {
      if (values.isUSBasedCompany === YES_OR_NO_RADIO_BUTTON_VALUES.No) {
        setModal2Visible(true);
        return;
      }

      if (values.is508Compliant === YES_OR_NO_RADIO_BUTTON_VALUES.No) {
        setModal3Visible(true);
        return;
      }

      calculateSteps(values);
      setActiveStep(activeStep + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  };
  return (
    <div className={classNames('vads-l-grid-container', 'vads-u-padding--4')}>
      <PageHeader header="Production access form" />
      <div className="vads-l-row">
        <div className={classNames('vads-l-col--12', 'vads-u-padding-x--2p5')}>
          <Formik
            initialValues={getInitialValues(isListAndLoopEnabled)}
            onSubmit={handleSubmit}
            validationSchema={currentValidationSchema}
            validateOnBlur={false}
            validateOnChange={false}
          >
            <Form noValidate>
              {activeStep === 0 ? (
                <>
                  <SegmentedProgressBar current={1} total={4} />
                  <h2 className="vads-u-font-size--h4">Step 1: Verification</h2>
                </>
              ) : (
                <>
                  <SegmentedProgressBar current={activeStep + 1} total={steps.length} />
                  <h2 className="vads-u-font-size--h4">
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
                  <FontAwesomeIcon icon={faAngleDoubleLeft} /> Back
                </button>
                {isLastStep ? (
                  <button
                    type="submit"
                    className="usa-button-primary va-button-primary vads-u-width--auto"
                  >
                    Submit your application
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="usa-button vads-u-width--auto"
                    // onClick={handleSubmitButtonClick}
                  >
                    Continue <FontAwesomeIcon icon={faAngleDoubleRight} />
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
                <Modal
                  id="cancellation-modal"
                  title="Are you sure you want to leave?"
                  visible={modal1Visible}
                  onClose={(): void => setModal1Visible(false)}
                  primaryButton={{
                    action: (): void => history.goBack(),
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
                >
                  We currently only grant access to US-based companies. You may contact us if you
                  have any questions.
                </Modal>
                <Modal
                  id="warning-508-complicance-modal"
                  title="Must be Section 508 Compliant"
                  visible={modal3Visible}
                  onClose={(): void => setModal3Visible(false)}
                  primaryButton={{
                    action: (): void => setModal3Visible(false),
                    text: 'Continue',
                  }}
                >
                  Consumer websites and applications must be Section 508 compliant to get production
                  access. Learn about becoming{' '}
                  <a href="http://section508.gov" target="_blank" rel="noopener noreferrer">
                    Section 508 Compliant
                  </a>{' '}
                  or contact us with questions.
                </Modal>
                <Modal
                  id="submission-complete-modal"
                  title="Thanks for submitting!"
                  visible={modal4Visible}
                  onClose={(): void => setModal4Visible(false)}
                  primaryButton={{
                    action: (): void => history.goBack(),
                    text: 'Close',
                  }}
                >
                  <p>
                    We’ve received your production access request and have sent you an email
                    confirmation. We’ll be in touch with next steps or required changes within 1-2
                    weeks, depending on the API.
                  </p>
                  <p>
                    It’s good to remember that getting production access can take over a month. For
                    open data APIs, this takes a week or less. Learn more about the production
                    access timelines.
                  </p>
                  <p>
                    In the meantime, you may <Link to="/support/contact-us">contact us </Link>if you
                    have any questions or learn more about working with our APIs.
                  </p>
                </Modal>
              </div>
            </Form>
          </Formik>
          {submissionError && (
            <AlertBox
              status="error"
              headline="We encountered a server error while saving your form. Please try again later."
              content={
                <span>
                  Need assistance? Create an issue through our{' '}
                  <Link to="/support">Support page.</Link>
                </span>
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductionAccess;
