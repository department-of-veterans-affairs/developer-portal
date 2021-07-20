import React, { FC, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Formik, Form, FormikValues } from 'formik';
import classNames from 'classnames';
import { PageHeader } from '../../components';
import Verification from './productionAccessFormSteps/Verification';
import BasicInformation from './productionAccessFormSteps/BasicInformation';
// import { validateProductionAccessForm } from './validateProductionAccessForm';
import validationSchema from './validationSchema';
import { faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import { useModalController } from '../../hooks';
import Modal from '@department-of-veterans-affairs/component-library/Modal';
import { Redirect } from 'react-router';

const headerText = 'Production access form';
const steps = ['Verification', 'Basic information', 'Technical information', 'Policy governance'];

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
  statusUpdateEmails: string[];
  termsOfServiceEmail: string[];
  valueProvided: string;
  businessModel?: string;
  hasMonetized: string;
  monetizationExplination?: string;
}

const initialValues = {
  apis: [],
  valueProvided: '',
  applicationName: '',
  businessModel: '',
  organization: '',
  hasMonetized: '',
  is508Compliant: '',
  isUSBasedCompany: '',
  statusUpdateEmails: [''],
  phoneNumber: '',
  primaryContact: null,
  secondaryContact: null,
  termsOfService: false,
  termsOfServiceEmail: [],
};

const renderStepContent = (step: number) => {
  switch (step) {
    case 0:
      return <Verification />;
    case 1:
      return <BasicInformation />;
    // case 2:
    //   return <ReviewOrder />;
    default:
      return <div>Not Found</div>;
  }
};

const ProductionAccess: FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const currentValidationSchema = validationSchema[activeStep];
  const { modalVisible, setModalVisible } = useModalController();
  // const { setTouched, setSubmitting } = useFormikContext();
  const isLastStep = activeStep === steps.length - 1;
  // const handleNext = () => {
  //   console.log('Next Pls!!!!');
  //   // setTouched({});
  //   // setSubmitting(false);
  //   setActiveStep(activeStep + 1);
  // };
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  const handleSubmit = (values: any, actions: FormikValues) => {
    if (isLastStep) {
      console.log('Submitied Form');
    } else {
      setActiveStep(activeStep + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  };
  return (
    <div className={classNames('vads-l-grid-container', 'vads-u-padding--4')}>
      <PageHeader header={headerText} />
      <div className="vads-l-row">
        <div className={classNames('vads-l-col--12', 'vads-u-padding-x--2p5')}>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={currentValidationSchema}
            validateOnBlur={false}
            validateOnChange={false}
          >
            {({ submitForm }): React.ReactNode => {
              const handleSubmitButtonClick = async (): Promise<void> => {
                await submitForm();
                setTimeout(() => {
                  const errorElements =
                    document.querySelectorAll<HTMLElement>('[aria-invalid=true]');

                  if (errorElements.length > 0) {
                    errorElements[0].focus();
                  }
                }, 0);
              };
              return (
                <Form>
                  {renderStepContent(activeStep)}
                  <div>
                    <button
                      className="usa-button va-api-button-default vads-u-border--2px vads-u-border-color--primary"
                      type="button"
                      onClick={handleBack}
                    >
                      <FontAwesomeIcon icon={faAngleDoubleLeft} /> Back
                    </button>
                    <button
                      type="submit"
                      className="usa-button vads-u-width--auto"
                      onClick={handleSubmitButtonClick}
                    >
                      Continue <FontAwesomeIcon icon={faAngleDoubleRight} />
                    </button>
                  </div>
                  <div>
                    <button
                      className="vads-u-display--block"
                      type="button"
                      data-show="#cancellation-modal"
                      onClick={(): void => setModalVisible(true)}
                    >
                      Cancel
                    </button>
                    <Modal
                      id="cancellation-modal"
                      title="Are you sure you want to leave?"
                      visible={modalVisible}
                      onClose={(): void => setModalVisible(false)}
                      primaryButton={{
                        action: (): JSX.Element => <Redirect push to="/" />,
                        text: 'Yes Leave',
                      }}
                      secondaryButton={{
                        action: (): void => setModalVisible(false),
                        text: 'No stay on form',
                      }}
                    >
                      The information you entered will not be saved.
                    </Modal>
                    <Modal
                      id="no-us-based-modal"
                      title="Thank you for your interest!"
                      visible={modalVisible}
                      onClose={(): void => setModalVisible(false)}
                    >
                      We currently only grant access to US-based companies. You may contact us if
                      you have any questions.
                    </Modal>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ProductionAccess;
