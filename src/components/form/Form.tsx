import AlertBox from '@department-of-veterans-affairs/formation-react/AlertBox';
import ProgressButton from '@department-of-veterans-affairs/formation-react/ProgressButton';
import * as React from 'react';

interface FormProps {
  disabled?: boolean;
  className?: string;
  onSubmit: () => Promise<void>;
  onSuccess: () => void;
  children?: React.ReactNode;
}

const assistanceTrailer = (
  /**
   * Specific to the Contact Us form only. This points to GitHub instead of Support in order
   * to avoid looping the user back to an apparently broken Contact Us form
   */
  <span>Need assistance? Create an issue through our <a href="https://github.com/department-of-veterans-affairs/vets-api-clients/issues/new/choose">GitHub page</a></span>
);

const Form = (props: FormProps): JSX.Element => {
  const [error, setError] = React.useState(false);
  const [sending, setSending] = React.useState(false);

  const { className, children, disabled, onSubmit, onSuccess } = props;

  const submitForm = async (): Promise<void> => {
    if (!sending) {
      setSending(true);

      try {
        await onSubmit();
        onSuccess();
        setSending(false);
      }
      catch (e: unknown) {
        setSending(false);
        setError(true);
      }
    }
  };

  return (
    <form className={className}>
      {children}
      <ProgressButton
        buttonText={sending ? 'Sending...' : 'Submit'}
        disabled={disabled}
        onButtonClick={submitForm}
        buttonClass="usa-button-primary" />
      {error &&
        <AlertBox
          status="error"
          headline="We encountered a server error while saving your form. Please try again later."
          content={ assistanceTrailer } />
      }
    </form>
  );
};

export { Form };
