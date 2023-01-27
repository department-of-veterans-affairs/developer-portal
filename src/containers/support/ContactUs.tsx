import React from 'react';
import { useLocation } from 'react-router';
import { Helmet } from 'react-helmet';
import { FormType } from '../../types/forms/contactUsForm';
import { PageHeader, VeteranResources } from '../../components';
import ContactUsForm from './ContactUsForm';

const ContactUs = (): JSX.Element => {
  const [sent, setSent] = React.useState(false);
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  let type = FormType.CONSUMER;
  if (query.get('type') === 'publishing') {
    type = FormType.PUBLISHING;
  }

  const onSuccess = (): void => {
    setSent(true);
  };

  /**
   * RENDER
   */
  return (
    <>
      {sent && (
        <>
          <PageHeader header="Thank you for contacting us." />
          <p>
            You will receive an automated email confirmation containing the text of your support
            request. A human response with next steps will follow within one business day. If an
            answer is not readily available or your issue needs to be escalated to an engineering
            resource, we will provide an estimated time to resolution.
          </p>
        </>
      )}
      {!sent && (
        <>
          <Helmet>
            <title>Developer portal support</title>
          </Helmet>
          <PageHeader halo="Support" header="Developer portal support" />
          <p>
            <strong>
              You’ve reached our support form for software developers and API publishers.
            </strong>
          </p>
          <p>
            Open a ticket if you have any questions about APIs, development, or other related
            topics.
          </p>
          <VeteranResources />
          <ContactUsForm onSuccess={onSuccess} defaultType={type} />
        </>
      )}
    </>
  );
};

export default ContactUs;
