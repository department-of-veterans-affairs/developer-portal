import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { RouteComponentProps } from 'react-router';
import PageHeader from "../components/PageHeader";

import SupportContactUsForm, { ISupportContactUsFormState } from './SupportContactUsForm';

interface ISupportContactUsState {
  error: boolean;
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

export default class SupportContactUs extends React.Component<RouteComponentProps, ISupportContactUsState> {

  constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      error: false,
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
        <SupportContactUsForm onSubmit={this.formSubmission} sending={this.state.sending} error={this.state.error}/>
      </section>
    );
  }

  private formSubmission(formData: ISupportContactUsFormState) {
    this.setState({ sending: true }, async () => {
      const request = new Request(
        `${process.env.REACT_APP_DEVELOPER_PORTAL_SELF_SERVICE_URL}/services/meta/contact-us`,
        {
          body: JSON.stringify(formData),
          headers: {
            accept: 'application/json',
            'content-type': 'application/json',
          },
          method: 'POST',
        },
      );

      try {
        const response = await fetch(request);
        if (!response.ok) {
          throw Error(response.statusText);
        }

        const json = await response.json();
        if (json && json.statusCode !== 200) {
          throw Error(json.body);
        }
        
        this.setState({ sending: false });
        this.props.history.push('/support/confirmation');
      } catch(e) {
        this.setState({ sending: false });
        this.setState({ error: true });
      }
      
    })
  }
}