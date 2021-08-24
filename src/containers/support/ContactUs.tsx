import React from 'react';
import { useLocation } from 'react-router';
import Helmet from 'react-helmet';
import SupportConfirmation from '../../content/supportConfirmation.mdx';
import { FormType } from '../../types/forms/contactUsForm';
import { PageHeader } from '../../components';
import { ContactUsAlertBox } from './ContactUsAlertBox';
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
      {sent && <SupportConfirmation />}
      {!sent && (
        <>
          <Helmet>
            <title>Contact Us</title>
          </Helmet>
          <PageHeader halo="Support" header="Contact Us" />
          <p>
            If you have questions about APIs, development, or related topics, use this form to send
            us a message.
          </p>
          <ContactUsAlertBox />
          <ContactUsForm onSuccess={onSuccess} defaultType={type} />
        </>
      )}
    </>
  );
};

export default ContactUs;
