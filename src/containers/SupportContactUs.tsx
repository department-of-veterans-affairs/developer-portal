import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import PageHeader from "../components/PageHeader";

import SupportContactUsForm, { ISupportContactUsFormState } from './SupportContactUsForm';

interface ISupportContactUsState {
  sending: boolean;
}

const GithubSnippet = () => {
  return (
    <div className="va-github-snippet">
      <h2>Submit an Issue via Github</h2>
      <a className="usa-button" href="https://github.com/department-of-veterans-affairs/vets-api-clients/issues/new/choose"><FontAwesomeIcon icon={faGithub} /> Submit an Issue</a>
    </div>
  );
}

export default class SupportContactUs extends React.Component<{}, ISupportContactUsState> {

  constructor(props = {}) {
    super(props);
    this.state = {
      sending: false,
    }

    this.formSubmission = this.formSubmission.bind(this);
  }

  public render() {
    const headerProps = {
      description: "You can submit an issue on Github (requires an account) or contact us by using the form below. Please provide as much detail as possible. Your concerns and feedback are important to us, and you can expect a reply within one business day.",
      halo: "Support",
      header: "Contact Us",
    };

    return (
      <section role="region" aria-label="Support Overview" className="usa-section usa-grid">
        <PageHeader {...headerProps} />
        <GithubSnippet />
        <SupportContactUsForm onSubmit={this.formSubmission} sending={this.state.sending} />
      </section>
    );
  }

  private formSubmission(formData: ISupportContactUsFormState) {
    this.setState({ sending: true }, () => {
      console.log('Form data', formData);
      this.setState({ sending: false });
    })
  }
}