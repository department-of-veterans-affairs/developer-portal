import React, { FC, useState } from 'react';
import { Formik, Form } from 'formik';
import classNames from 'classnames';
import { PageHeader } from '../../components';
import Verification from './productionAccessFormSteps/Verification';

const headerText = 'Production access form';
// const steps = ['Verification', 'Basic information', 'Technical information', 'Policy governance'];

const initialValues = {
  apis: [],
  is508Compliant: false,
  isUSBasedCompany: false,
  termsOfService: false,
};

const renderStepContent = (step: number) => {
  switch (step) {
    case 0:
      return <Verification />;
    // case 1:
    //   return <PaymentForm formField={formField} />;
    // case 2:
    //   return <ReviewOrder />;
    default:
      return <div>Not Found</div>;
  }
};

const ProductionAccess: FC = () => {
  const [activeStep] = useState(0);
  // const isLastStep = activeStep === steps.length - 1;
  // const handleBack = () => {
  //   setActiveStep(activeStep - 1);
  // };
  const handleSubmit = () => {
    console.log('Submitied Form');
  };
  return (
    <div className={classNames('vads-l-grid-container', 'vads-u-padding--4')}>
      <PageHeader header={headerText} />
      <div className="vads-l-row">
        <div className={classNames('vads-l-col--12', 'vads-u-padding-x--2p5')}>
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form>{renderStepContent(activeStep)}</Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ProductionAccess;
