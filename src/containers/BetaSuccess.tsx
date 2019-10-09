import classNames from 'classnames';
import * as React from 'react';

import './BetaSuccess.scss';

export default function BetaSuccess() {
  return (
    <div className={classNames('beta-success', 'vads-l-grid-container', 'vads-u-margin-y--4')}>
      <div className="vads-u-margin-bottom--8">
        <h1>Thank you for your interest!</h1>
        <p>Your request to join our Beta Test Group will be reviewed shortly and a response will be sent to the email address you provided.</p>
        <p>Please check your email, and open the email from <span className="bold-text">api@va.gov</span> titled <span className="bold-text">"VA Mobile App Testing."</span></p>
      </div>
      <div>
        <h2 className="underlined-header">But wait... I did not receive an email</h2>
        <p> We make every effort to ensure that these emails are delivered.</p>
        <p>If you do not see the email in your inbox, please check your “junk mail” folder or "spam" folder and add "<span className="bold-text">api@va.gov</span>" to your White List or Safe Sender List.</p>
        <p>If you do not receive a confirmation email, try <a href="/beta">submitting the form again.</a></p>
      </div>
    </div>
  );
}
