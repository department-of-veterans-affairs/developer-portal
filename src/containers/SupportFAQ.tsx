import * as React from 'react';
import GroupedAccordions from '../components/GroupedAccordions';
import PageHeader from '../components/PageHeader';

const generalQuestions = [
    {
        answer: (<p>No - this is a support page for software developers utilizing the Veterans Affairs (VA) 
            Application Programming Interface (API). If you are a veteran seeking assistance, please visit 
            the <a href="http://www.va.gov">US Department of Veterans Affairs website</a> to access and manage your VA benefits and health care. 
            There are also helpful reference links and Q&A at the VA Inquiry Routing & Information System <a href="https://iris.custhelp.va.gov/app/answers/list">(IRIS)</a> .</p>),
        question: 'Is this where I apply for VA Benefits and access to my health records?',
    },
    {
        answer: 'The APIs are the "front door" or "wall outlet" to VA health records, benefits eligibility, facility locations, and veteran status verification. Developers may create applications to securely access this information via mobile devices and web browsers, across a variety of platforms.',
        question: 'What are the VA APIs? Why use the VA APIs?',
    },
    {
        answer: 'Access to all VA APIs is free of charge, with the goal of making access to federal government data easier for veterans.',
        question: 'What is the cost of using VA APIs?',
    },
]

const developmentQuestions = [
    {
        answer: (<p>Click to <a href="https://developer.va.gov/apply">Get Started</a> by applying for 
            an API key. Note that you will need to provide your <a href="https://developer.va.gov/oauth">OAuth</a> Redirect 
            URL if you are applying for a key to the Health, Claims, or Veteran Verification APIs. 
            You are also required to agree to the <a href="https://developer.va.gov/terms-of-service">VA API Terms of Service</a> in order to obtain a key.</p>),
        question: 'Where do I apply for dev access?',
    },
    {
        answer: (<p>Visit the <a href="https://developer.va.gov/go-live">Path to Production</a> page for
            instructions on "going live.” Schedule a demo presentation of your app by using the Contact Us, 
            or by submitting a request via the GitHub links.</p>),
        question: 'How do we move forward with production API access once dev is complete?',
    },
    {
        answer: 'Not by default. Your key can be authorized for access to additional APIs, but you will need to arrange a demo for each new API that your application uses before being granted production access.',
        question: 'Is the production key I received for one API good for other VA APIs as well?',
    },
    {
        answer: (<p>Yes! You will receive your API key immediately after sign up. That is all you
             need to proceed - all relevant information should be contained in the <a href="https://developer.va.gov/explore">API documentation</a>.</p>),
        question: 'Can I start using the API as soon as I sign up?',
    },
    {
        answer: 'Yes, we have implemented basic rate limiting of 60 requests per minute. If you exceed this quota, your request will return a 429 status code. You may petition for increased rate limits by emailing api@va.gov and requests will be decided on a case-by-case basis.',
        question: 'Are there any rate limits on the APIs?',
    },
    {
        answer: (<p>Please visit the <a href="https://developer.va.gov/explore">API documentation</a> for 
                more information and example use cases. There are also some real-world examples in the articles and 
                press releases linked on our <a href="https://developer.va.gov/whats-new">News</a> page.</p>),
        question: 'What kind of data can I get from the APIs? Do you have any example scenarios for Health, Benefits, Facilities or Veteran Verification?',
    },
]

const supportQuestions = [
    {
        answer: (<p>Submit a support request, bug report, documentation or feature request via Github on 
                our <a href="http://developer.va.gov/support">support portal</a>, or use the Contact Us form 
                to send an email. We strive to reply with a solution or next steps within one business day.</p>),
        question: 'How do I contact support with any questions or if I need help?',
    },
]

const headerProps = {
    description: "We've compiled a list of FAQs for the VA API program; our goal is to get your question answered as soon as possible. If you need further help\u2014or have comments or feedback\u2014please contact us via Github or use our short 'Contact Us' form. Our customer support team will be happy to help.",
    halo: "Support",
    header: "FAQ",
};

export default class SupportFAQ extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
    }

    public render() {
        return (
            <section role="region" aria-label="Support FAQ" className="usa-section">
                <PageHeader {...headerProps}/>
                <div className="va-api-container">
                    <GroupedAccordions questions={generalQuestions} title="General" />
                    <GroupedAccordions questions={developmentQuestions} title="Development" />
                    <GroupedAccordions questions={supportQuestions} title="Troubleshooting/Support" />
                </div>
            </section>
        )
    }
}