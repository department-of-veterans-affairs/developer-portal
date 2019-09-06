import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import PageHeader from "../../components/PageHeader";
import SupportConfirmation from '../../content/supportConfirmation.mdx';

import SupportContactUsForm from './SupportContactUsForm';

const GithubSnippet = () => {
  return (
    <div className="va-api-github-snippet">
      <h3>Submit an Issue via Github</h3>
      <a className="usa-button" href="https://github.com/department-of-veterans-affairs/vets-api-clients/issues/new/choose"><FontAwesomeIcon icon={faGithub} /> Submit an Issue</a>
    </div>
  );
};

interface ISupportContactUsState {
  sent: boolean;
}

export default class SupportContactUs extends React.Component<{}, ISupportContactUsState> {

  constructor(props: {}) {
    super(props);
    this.state = {
      sent: false,
    };

    this.onSuccess = this.onSuccess.bind(this);
  }

  public render() {
    const headerProps = {
      description: "You can submit an issue on Github (requires an account) or contact us by using the form below. Please provide as much detail as possible. Your concerns and feedback are important to us, and you can expect a reply within one business day.",
      halo: "Support",
      header: "Contact Us",
    };

    if (this.state.sent) {
      return <SupportConfirmation/>;
    } else {
      return (
        <section role="region" aria-label="Support Overview" className="usa-section usa-grid">
          <PageHeader {...headerProps} />
          <GithubSnippet />
          <SupportContactUsForm onSuccess={this.onSuccess}/>
        </section>
      );
    }
  }

  private onSuccess(): void {
    this.setState({sent: true});
  }
}