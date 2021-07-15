import React, { FC, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Formik, Form } from 'formik';
import classNames from 'classnames';
import { PageHeader } from '../../components';
import Verification from './productionAccessFormSteps/Verification';
import BasicInformation from './productionAccessFormSteps/BasicInformation';
import { faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

const headerText = 'Production access form';
// const steps = ['Verification', 'Basic information', 'Technical information', 'Policy governance'];

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
  companyName: string;
  phoneNumber: string;
  applicationName: string;
  notificationEmail: string[];
  termsOfServiceEmail: string[];
}

const initialValues = {
  apis: [],
  applicationName: '',
  companyName: '',
  is508Compliant: '',
  isUSBasedCompany: '',
  notificationEmail: [''],
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
  // const isLastStep = activeStep === steps.length - 1;
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  const handleSubmit = () => {
    console.log('Submitied Form');
  };
  return (
    <div className={classNames('vads-l-grid-container', 'vads-u-padding--4')}>
      <PageHeader header={headerText} />
      <div className="vads-l-row">
        <div className={classNames('vads-l-col--12', 'vads-u-padding-x--2p5')}>
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
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
                <button type="button" onClick={handleNext}>
                  Continue <FontAwesomeIcon icon={faAngleDoubleRight} />
                </button>
              </div>
              <div>
                <button className="vads-u-display--block" type="button">
                  Cancel
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ProductionAccess;
