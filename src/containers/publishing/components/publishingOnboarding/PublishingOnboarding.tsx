import React, { FC } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { PageHeader } from '../../../../components';

export const PublishingOnboarding: FC = () => (
  <>
    <Helmet>
      <title>API Publishing | Onboarding</title>
    </Helmet>
    <PageHeader header="How publishing works" />
    <p>
      The process of publishing your API with Lighthouse can seem daunting, but don’t worry.
      Our process is designed to ensure your questions are answered and we are both prepared for
      your API’s go-live day and beyond. Here’s what you can expect during the publishing process.
      Remember, we’re here for you each step of the way.
    </p>
    <ol className="process">
      <li className="process-step list-one">
        <strong>Contact us</strong>
        <p>
          Get the process started by filling out the Contact Us form. You’ll need to gather information
          about you and your API and send it to us so we know how we can best support you.
        </p>
      </li>
      <li className="process-step list-two">
        <strong>Kickoff meeting</strong>
        <p>We’ll answer many of your questions about API publishing with Lighthouse  as part of the kickoff meeting.</p>
      </li>
      <li className="process-step list-three">
        <strong>Prepare your API for publication</strong>
        <p>After kickoff, we will both complete tasks that will get your API ready for publication to our sandbox</p>
        environment and then production.
      </li>
      <li className="process-step list-four">
        <strong>Onboard consumers</strong>
        <p>Once the hard work is done and your API is published, it’s time to onboard your consumers.</p>
      </li>
    </ol>
    <h2>Contact us</h2>
    <p>
      Giving us some information about you and your API lets us know how we can best work together.
      The Contact Us form will ask you to tell us about your API. It helps to have this information
      ready before you start filling out the form. Here’s some of what we’re looking for:
    </p>
    <ul>
      <li>API summary, such as background, intended consumers, how it works, and goals</li>
      <li>OpenAPI specification and public-facing description, if you have it</li>
      <li>Information on public or internal VA network accessibility</li>
    </ul>
    <Link to="/support/contact-us" className="usa-button usa-button-secondary">Contact Us</Link>
    <h2>Kickoff meeting</h2>
    <p>
      At the kickoff meeting, we’ll introduce our teams, ask questions, clarify expectations, and discuss
      timelines. A successful kickoff meeting ensures we all know what’s needed going forward. Here are some
      examples of what you can expect to discuss during the kickoff meeting.
    </p>
    <table>
      <thead>
        <tr>
          <th>Your team</th>
          <th>Lighthouse</th>
          <th>Both teams</th>
        </tr>
      </thead>
      <tbody style={{ verticalAlign: 'top' }}>
        <tr>
          <td>
            <ul>
              <li>API background and vision</li>
              <li>Questions for Lighthouse</li>
              <li>Agreements to and questions about our policies and procedures</li>
            </ul>
          </td>
          <td>
            <ul>
              <li>Setting expectations about standards</li>
              <li>Publishing process and API requirements</li>
              <li>Maintenance, planned outages, and availability expectations</li>
            </ul>
          </td>
          <td>
            <ul>
              <li>Technical considerations</li>
              <li>High-interest topics such as rate limiting, publishing  timeline, and more</li>
              <li>Coordination and communications</li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
    <p>
      If you have questions that need to be answered right away or that can’t wait for the scheduled
      kickoff meeting, <Link to="/support">contact us</Link>. We’re here to help
    </p>
    <h2>Prepare your API for publication</h2>
    <p>
      We’re here to make sure nothing gets overlooked as we publish your API in the sandbox environment
      and then production. After kickoff, we’ll be with you every step of the way as we both complete tasks
      to expose your API on Lighthouse. Here’s some of what you can expect.
    </p>
    <table>
      <thead>
        <tr>
          <th>Your team</th>
          <th>Lighthouse</th>
          <th>Together, we’ll...</th>
        </tr>
      </thead>
      <tbody style={{ verticalAlign: 'top' }}>
        <tr>
          <td>
            <ul>
              <li>Propose mapping between your environments and Lighthouse</li>
              <li>Send us any governance and consumer requirements</li>
              <li>Ensure mock data is ready for testing</li>
              <li>Provide a health check endpoint for your API</li>
              <li>Make any needed changes to your API documentation and spec</li>
              <li>Send us your final, revised API spec and documentation</li>
            </ul>
          </td>
          <td>
            <ul>
              <li>Set up your Slack channel for collaboration and communication</li>
              <li>Get you access to our document repository</li>
              <li>Schedule any needed publishing and maintenance check-ins</li>
              <li>Provide feedback on API documentation and spec</li>
              <li>Propose route(s) for the API on <Link to="https://api.va.gov">https://api.va.gov</Link></li>
              <li>Propose where the API will live in our information architecture</li>
            </ul>
          </td>
          <td>
            <ul>
              <li>Discuss the consumer onboarding process</li>
              <li>Identify your first consumer to onboard</li>
              <li>Create a plan to migrate any current consumers</li>
              <li>Evaluate the need for security updates</li>
              <li>Work through any questions, concerns, or issues as they arise</li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
    <h2>Onboard consumers</h2>
    <p>
      Onboarding existing and new consumers is easy when you have our support. As part of preparing your API
      for publication, we’ll have a consumer migration plan ready to go. When you reach this phase of your API
      publishing journey, it’s as simple as identifying your first consumer to onboard and following the plan
      we’ve created together. Consumers must get production access by following our <Link to="/go-live">path to production guide</Link>.
    </p>
  </>
);
