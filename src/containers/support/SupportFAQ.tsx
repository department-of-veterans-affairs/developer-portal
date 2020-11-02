import * as React from 'react';
import { Link } from 'react-router-dom';
import { AccordionPanelContent, GroupedAccordions } from '../../components';
import PageHeader from '../../components/PageHeader';

const generalQuestions: SupportQuestion[] = [
  {
    answer: (
      <p>
        No - this is a support page for software developers utilizing the Veterans Affairs (VA)
        Application Programming Interface (API). If you are a veteran seeking assistance, please
        visit the <a href="http://www.va.gov">US Department of Veterans Affairs website</a> to
        access and manage your VA benefits and health care. There are also helpful reference links
        and Q&amp;A at the VA Inquiry Routing &amp; Information System{' '}
        <a href="https://iris.custhelp.va.gov/app/answers/list">(IRIS)</a>.
      </p>
    ),
    question: 'Is this where I apply for VA Benefits and access to my health records?',
  },
  {
    answer: (
      <p>
        The APIs are the &quot;front door&quot; or &quot;wall outlet&quot; to VA health records,
        benefits eligibility, facility locations, and veteran status verification. Developers may
        create applications to securely access this information via mobile devices and web browsers,
        across a variety of platforms.
      </p>
    ),
    question: 'What are the VA APIs? Why use the VA APIs?',
  },
  {
    answer: (
      <p>
        Access to all VA APIs is free of charge, with the goal of making access to federal
        government data easier for veterans.
      </p>
    ),
    question: 'What is the cost of using VA APIs?',
  },
];

const developmentQuestions: SupportQuestion[] = [
  {
    answer: (
      <p>
        Click to <Link to="/apply">Get Started</Link> by applying for an API key. Note that you will
        need to provide your <Link to="/oauth">OAuth</Link> Redirect URL if you are applying for a
        key to the Health, Claims, or Veteran Verification APIs. You are also required to agree to
        the <Link to="/terms-of-service">VA API Terms of Service</Link> in order to obtain a key.
      </p>
    ),
    question: 'Where do I apply for dev access?',
  },
  {
    answer: (
      <p>
        Visit the <Link to="/go-live">Path to Production</Link> page for instructions on &quot;going
        live.&quot; Schedule a demo presentation of your app by using the Contact Us, or by
        submitting a request via the GitHub links.
      </p>
    ),
    question: 'How do we move forward with production API access once dev is complete?',
  },
  {
    answer: (
      <p>
        Not by default. Your key can be authorized for access to additional APIs, but you will need
        to arrange a demo for each new API that your application uses before being granted
        production access.
      </p>
    ),
    question: 'Is the production key I received for one API good for other VA APIs as well?',
  },
  {
    answer: (
      <p>
        Yes! You will receive your API key immediately after sign up. That is all you need to
        proceed - all relevant information should be contained in the{' '}
        <Link to="/explore">API documentation</Link>.
      </p>
    ),
    question: 'Can I start using the API as soon as I sign up?',
  },
  {
    answer: (
      <p>
        Yes, we have implemented basic rate limiting of 60 requests per minute. If you exceed this
        quota, your request will return a 429 status code. You may petition for increased rate
        limits by emailing api@va.gov and requests will be decided on a case-by-case basis.
      </p>
    ),
    question: 'Are there any rate limits on the APIs?',
  },
  {
    answer: (
      <p>
        Please visit the <Link to="/explore">API documentation</Link> for more information and
        example use cases. There are also some real-world examples in the articles and press
        releases linked on our <Link to="/news">News</Link> page.
      </p>
    ),
    question:
      'What kind of data can I get from the APIs? Do you have any example scenarios for Health, Benefits, Facilities or Veteran Verification?',
  },
  {
    answer: (
      <React.Fragment>
        <p>
          The Address Validation API is for internal VA use only and is not listed on the developer
          portal. To begin development in the sandbox environment, request a developer{' '}
          <Link to="/apply">API key for the Facilities API</Link>. Once finished, send an email to{' '}
          <a
            href="mailto:api@va.gov?subject=Request%20for%20Sandbox%20Access%20to%20Address%20Validation%20API"
            target="_BLANK"
            rel="noopener noreferrer"
          >
            api@va.gov
          </a>{' '}
          with the subject line &quot;Request for Sandbox Access to Address Validation API.&quot; In
          the email, include the following:
        </p>
        <ul>
          <li>Email address used for the sandbox Facilities API key request</li>
          <li>Name of team/project</li>
          <li>Consumer name (if different from team/project)</li>
          <li>Expected call volume (our default rate limit is 60 requests per minute)</li>
          <li>Desired production date</li>
          <li>
            Any IP addresses or subnets <em>outside the VA intranet</em> from which you require
            developer access (permitted in sandbox only)
          </li>
          <li>
            When indicating your desired production date, note that we require at least one
            week&apos;s notice before a demo can be scheduled, and that it may take up to a week
            after the demo to grant you the sandbox key for the Address Validation API.
          </li>
        </ul>
        <p>We will respond to your request within 2 business days.</p>
      </React.Fragment>
    ),
    question: 'How do I get sandbox access to the Address Validation API (VA internal only)?',
  },
];

const supportQuestions: SupportQuestion[] = [
  {
    answer: (
      <p>
        Submit a support request, bug report, documentation or feature request via GitHub on our{' '}
        <Link to="/support">support portal</Link>, or use the Contact Us form to send an email. We
        strive to reply with a solution or next steps within one business day.
      </p>
    ),
    question: 'How do I contact support with any questions or if I need help?',
  },
];

const headerProps = {
  description:
    "We've compiled a list of FAQs for the VA API program; our goal is to get your question answered as soon as possible. If you need further help\u2014or have comments or feedback\u2014please contact us via GitHub or use our short 'Contact Us' form. Our customer support team will be happy to help.",
  halo: 'Support',
  header: 'FAQ',
};

interface SupportQuestionsProps {
  readonly title: string;
  readonly questions: SupportQuestion[];
}

interface SupportQuestion {
  readonly answer: string | JSX.Element;
  readonly question: string;
}

const SupportQuestions = (props: SupportQuestionsProps) => {
  const content: AccordionPanelContent[] = props.questions.map((q: SupportQuestion) => ({
    body: q.answer,
    title: q.question,
  }));

  return <GroupedAccordions panelContents={content} title={props.title} />;
};

const SupportFAQ: () => JSX.Element = () => (
  <section aria-label="Support FAQ">
    <PageHeader {...headerProps} />
    <div>
      <SupportQuestions title="General" questions={generalQuestions} />
      <SupportQuestions title="Development" questions={developmentQuestions} />
      <SupportQuestions title="Troubleshooting/Support" questions={supportQuestions} />
    </div>
  </section>
);

export default SupportFAQ;
