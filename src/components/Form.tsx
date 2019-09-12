import AlertBox from '@department-of-veterans-affairs/formation-react/AlertBox';
import ProgressButton from '@department-of-veterans-affairs/formation-react/ProgressButton';
import * as React from "react";

import { Link } from 'react-router-dom';

export interface IFormProps {
  disabled?: boolean;
  className?: string;
  onSubmit: () => void;
  onSuccess: () => void;
}

interface IFormState {
  error: boolean;
  sending: boolean;
}

export default class Form extends React.Component<IFormProps, IFormState> {

  constructor(props: IFormProps) {
    super(props);
    this.state = {
      error: false,
      sending: false,
    };

    this.submittingForm = this.submittingForm.bind(this);
  }

  public render() {
    const assistanceTrailer = (
      <span>Need assistance? Create an issue through our <Link to="/support">Support page</Link></span>
    );

    return (
      <form className={this.props.className ? this.props.className : 'va-api-developer-form'}>
        {this.props.children}
        <ProgressButton
              buttonText={this.state.sending ? "Sending..." : "Submit"}
              disabled={this.props.disabled}
              onButtonClick={this.submittingForm}
              buttonClass="usa-button-primary" />
        {this.state.error &&
          <AlertBox 
            status="error" 
            headline={"We encountered a server error while saving your form. Please try again later."} 
            content={ assistanceTrailer } />
        }
      </form>
    );
  }

  private submittingForm(): void {
    this.setState({sending: true}, async () => {
      try {
        await this.props.onSubmit();
        this.setState({sending: false}, () => this.props.onSuccess());
      } catch(e) {
        this.setState({sending: false, error: true});
      }
    });
  }
}