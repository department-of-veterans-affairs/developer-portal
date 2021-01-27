import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import Helmet from 'react-helmet';
import { PageHeader } from '../../components';
import SupportConfirmation from '../../content/supportConfirmation.mdx';
import SupportContactUsForm from './SupportContactUsForm';

const GitHubSnippet = (): JSX.Element => (
  <div className="vads-u-margin-y--2">
    <h3>Submit an Issue via GitHub</h3>
    <a
      className="usa-button"
      href="https://github.com/department-of-veterans-affairs/vets-api-clients/issues/new/choose"
    >
      <FontAwesomeIcon icon={faGithub} /> Submit an Issue
    </a>
  </div>
);

const headerProps = {
  description:
    'You can submit an issue on GitHub (requires an account) or contact us by using the form below. Please provide as much detail as possible. Your concerns and feedback are important to us, and you can expect a reply within one business day.',
  halo: 'Support',
  header: 'Contact Us',
};

const SupportContactUs = (): JSX.Element => {
  const [sent, setSent] = React.useState(false);

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
          <PageHeader {...headerProps} />
          <GitHubSnippet />
          <SupportContactUsForm onSuccess={onSuccess} />
        </>
      )}
    </>
  );
};

export default SupportContactUs;
