import React, { ReactNode } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import { FormType } from '../../types/contactUsForm';
import { FLAG_API_PUBLISHING_CONTACT_FORM } from '../../types/constants';
import { Flag } from '../../flags';
import { PageHeader } from '../../components';
import SupportConfirmation from '../../content/supportConfirmation.mdx';
import ContactUsFormLegacy from './ContactUsFormLegacy';
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
            From this page, you can ask us questions, get help or support, or get started with
            publishing your API. You can also find answers to many common questions on our&nbsp;
            <Link to="/support/faq">FAQ</Link> page.
          </p>
          <p>
            <strong>Note:</strong> If you are a Veteran seeking help with claims, health records, or
            other information, visit <a href="https://www.va.gov/">VA.gov</a> or contact your local
            VSO for assistance.
          </p>
          <Flag
            name={[FLAG_API_PUBLISHING_CONTACT_FORM]}
            fallbackRender={(): ReactNode => <ContactUsFormLegacy onSuccess={onSuccess} />}
          >
            <ContactUsForm onSuccess={onSuccess} defaultType={type} />
          </Flag>
        </>
      )}
    </>
  );
};

export default ContactUs;
