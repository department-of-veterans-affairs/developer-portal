/* eslint-disable max-lines */
import React, { FC, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Formik, Form, FormikHelpers } from 'formik';
import classNames from 'classnames';
import { faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import Modal from '@department-of-veterans-affairs/component-library/Modal';
import SegmentedProgressBar from '@department-of-veterans-affairs/component-library/SegmentedProgressBar';
import { useHistory } from 'react-router-dom';
import { PageHeader } from '../../components';
import { useFlag } from '../../flags';
import { useModalController } from '../../hooks';
import { FLAG_LIST_AND_LOOP } from '../../types/constants';
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
  is508Compliant: string;
  isUSBasedCompany: string;
  termsOfService: boolean;
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
  applicationName?: string;
  statusUpdateEmails: string | string[];
  valueProvided: string;
  businessModel?: string;
  hasMonetized: string;
  monetizationExplination?: string;
  isVetFacing: string;
  website?: string;
  // statusUpdateEmails, signUpLink, supportLink, policyDocuments can be either a single value or
  // an array until the list and loop component is created
  signUpLink?: string | string[];
  supportLink?: string | string[];
  platforms?: string;
  appDescription?: string;
  vasiSystemName?: string;
  credentialStorage: string;
  storePIIOrPHI: string;
  piiStorageMethod?: string;
  multipleReqSafeguards?: string;
  breachManagementProcess?: string;
  vulnerabilityManagement?: string;
  exposesToThirdParties: string;
  thirdPartyInfoDescription?: string;
  scopesAccessRequested?: string;
  distributingAPIKeysToCustomers?: string;
  namingConvention?: string;
  centralizedBackendLog?: string;
  listedOnMyHealthApplication?: string;
  policyDocuments?: string | string[];
}

const initialValues: Values = {
  apis: [],
  applicationName: '',
  businessModel: '',
  credentialStorage: '',
  exposesToThirdParties: '',
  hasMonetized: '',
  is508Compliant: '',
  isUSBasedCompany: '',
  isVetFacing: '',
  organization: '',
  phoneNumber: '',
  policyDocuments: '',
  primaryContact: {
    email: '',
    firstName: '',
    lastName: '',
  },
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
  valueProvided: '',
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
  const [activeStep, setActiveStep] = useState(0);
  const [steps, setSteps] = useState(possibleSteps);
  const currentValidationSchema = validationSchema[activeStep];
  const isLastStep = activeStep === steps.length - 1;

  const { modalVisible: modal1Visible, setModalVisible: setModal1Visible } = useModalController();
  const { modalVisible: modal2Visible, setModalVisible: setModal2Visible } = useModalController();
  const { modalVisible: modal3Visible, setModalVisible: setModal3Visible } = useModalController();
  const history = useHistory();
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
  const handleSubmit = (values: Values, actions: FormikHelpers<Values>): void => {
    setTimeout(() => {
      const errorElements = document.querySelectorAll<HTMLElement>('[aria-invalid=true]');

      if (errorElements.length > 0) {
        errorElements[0].focus();
      }
    }, 0);
    if (isLastStep) {
      // TODO: In API-8236 the acutal submission of the form will be handled
      // eslint-disable-next-line no-console
      console.log('Submitied Form');
    } else {
      if (values.isUSBasedCompany === 'no') {
        setModal2Visible(true);
        return;
      }

      if (values.is508Compliant === 'no') {
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
              </div>
            </Form>
            {/* ); */}
            {/* }} */}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ProductionAccess;
