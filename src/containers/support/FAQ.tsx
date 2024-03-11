import {
  VaAccordion,
  VaAccordionItem,
} from '@department-of-veterans-affairs/component-library/dist/react-bindings';
import classNames from 'classnames';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { PageHeader } from '../../components';
import toHtmlId from '../../toHtmlId';
import { CONSUMER_PROD_PATH } from '../../types/constants/paths';

interface AccordionPanelContent {
  readonly body: string | JSX.Element;
  readonly title: string;
}

const generalQuestions: SupportQuestion[] = [
  {
    answer: (
      <p>
        No - this is a support page for software developers utilizing the Veterans Affairs (VA)
        Application Programming Interface (API). If you are a Veteran seeking assistance, please
        visit the <a href="http://www.va.gov">U.S. Department of Veterans Affairs website</a> to
        access and manage your VA benefits and health care. You may also ask your question at Ask VA{' '}
        <a href="https://ask.va.gov/">(AVA)</a>.
      </p>
    ),
    question: 'Is this where I apply for VA benefits and access to my health records?',
  },
  {
    answer: (
      <p>
        The APIs are the &quot;front door&quot; or &quot;wall outlet&quot; to VA health records,
        benefits eligibility, facility locations, and Veteran status verification. Developers may
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
        government data easier for Veterans.
      </p>
    ),
    question: 'What is the cost of using VA APIs?',
  },
];

const developmentQuestions: SupportQuestion[] = [
  {
    answer: (
      <p>
        Get started by requesting access credentials from an API&apos;s overview page.{' '}
        <Link to="/explore">Explore our APIs</Link>. <br />
        Note that you will need to provide your <Link to="/oauth">OAuth</Link> Redirect URI if you
        are applying for a key to the Health, Claims, or Veteran Verification APIs. You are also
        required to agree to the <Link to="/terms-of-service">VA API Terms of Service</Link> in
        order to obtain a key.
      </p>
    ),
    question: 'Where do I apply for dev access?',
  },
  {
    answer: (
      <p>
        Visit the <Link to={CONSUMER_PROD_PATH}>Path to Production</Link> page for instructions on
        &quot;going live.&quot; Schedule a demo presentation of your app by using the Contact Us, or
        by submitting a request via the GitHub links.
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
        proceed - all relevant information can be found within an individual API&apos;s
        documentation. <Link to="/explore">Find an API</Link>.
      </p>
    ),
    question: 'Can I start using the API as soon as I sign up?',
  },
  {
    answer: (
      <p>
        Yes, we have implemented basic rate limiting of 60 requests per minute. If you exceed this
        quota, your request will return a 429 status code. You may petition for increased rate
        limits by emailing{' '}
        <a
          href="mailto:api@va.gov?subject=Request%20for%20Increased%20Rate%20Limit"
          target="_BLANK"
          rel="noopener noreferrer"
        >
          api@va.gov
        </a>{' '}
        and requests will be decided on a case-by-case basis.{' '}
        <Link to="/onboarding/working-with-lighthouse-apis#rate-limiting">
          Learn more about rate limiting.
        </Link>
      </p>
    ),
    question: 'Are there any rate limits on the APIs?',
  },
  {
    answer: (
      <p>
        Use cases and other information can be found within an individual API&apos;s documentation.{' '}
        <Link to="/explore">Find an API</Link>. There are also some real-world examples in the
        articles and press releases linked on our <Link to="/about/news">News</Link> page.
      </p>
    ),
    question:
      'What kind of data can I get from the APIs? Do you have any example scenarios for Health, Benefits, Facilities or Veteran Verification?',
  },
];

const supportQuestions: SupportQuestion[] = [
  {
    answer: (
      <p>
        Submit a support request, bug report, documentation or feature request via the{' '}
        <Link to="/support/contact-us">Contact Us</Link> form. We strive to reply with a solution or
        next steps within one business day.
      </p>
    ),
    question: 'How do I contact support with any questions or if I need help?',
  },
];

const headerProps = {
  description:
    "We've compiled a list of FAQs for the VA API program; our goal is to get your question answered as soon as possible. If you need further help\u2014or have comments or feedback\u2014please contact us by using our short 'Contact Us' form. Our customer support team will be happy to help.",
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

export const SupportQuestions = (props: SupportQuestionsProps): JSX.Element => {
  const content: AccordionPanelContent[] = props.questions.map((q: SupportQuestion) => ({
    body: q.answer,
    title: q.question,
  }));
  const headingId = `${toHtmlId(props.title)}-accordions`;

  return (
    <section
      className={classNames('va-grouped-accordion', 'vads-u-margin-bottom--2p5')}
      aria-labelledby={headingId}
    >
      <div
        className={classNames(
          'vads-u-display--flex',
          'vads-u-justify-content--space-between',
          'vads-u-align-items--center',
        )}
      >
        <h2 id={headingId} className="vads-u-font-size--lg">
          {props.title}
        </h2>
      </div>
      <VaAccordion uswds>
        {content.map((c: AccordionPanelContent) => (
          <VaAccordionItem uswds header={c.title} key={c.title}>
            {c.body}
          </VaAccordionItem>
        ))}
      </VaAccordion>
    </section>
  );
};

const SupportFAQ: () => JSX.Element = () => (
  <>
    <Helmet>
      <title>FAQ</title>
    </Helmet>
    <PageHeader {...headerProps} />
    <div>
      <SupportQuestions title="General" questions={generalQuestions} />
      <SupportQuestions title="Development" questions={developmentQuestions} />
      <SupportQuestions title="Troubleshooting/Support" questions={supportQuestions} />
    </div>
  </>
);

export default SupportFAQ;
