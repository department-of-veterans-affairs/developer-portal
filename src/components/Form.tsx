import AlertBox from '@department-of-veterans-affairs/formation-react/AlertBox';
import ProgressButton from '@department-of-veterans-affairs/formation-react/ProgressButton';
import * as React from "react";

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
      // Specific to the Contact Us form only
      // This points to GitHub instead of Support in order to avoid looping the user back to an apparently broken Contact Us form
      <span>Need assistance? Create an issue through our <a href="https://github.com/department-of-veterans-affairs/vets-api-clients/issues/new/choose">GitHub page</a></span>
    );

    return (
      <form className={this.props.className}>
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