import * as React from 'react';
import classNames from 'classnames';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { CardLink, PageHeader } from '../../components';
import { defaultFlexContainer } from '../../styles/vadsUtils';
import { CONSUMER_APIS_PATH } from '../../types/constants/paths';
import { platformMetrics } from './platformMetrics';
import { PlatformMetric } from './types/platform-metric';
import './About.scss';

const ParagraphHeading = ({ children }: { children: string }): JSX.Element => (
  <p className={classNames('vads-u-margin-bottom--0', 'vads-u-font-weight--bold')}>{children}</p>
);

const Overview = (): JSX.Element => (
  <div>
    <Helmet>
      <title>About</title>
    </Helmet>
    <PageHeader header="About" />
    <div>
      <p className="vads-u-margin-top--0">
        VA Developer is a product of the VA Lighthouse Developer Experience program, which is part of
        VA&apos;s Digital Modernization strategy. Since August 2018,
        we&apos;ve been giving approved individuals and organizations access to the VA data they
        need. Our platform adheres to{' '}
        <a href="https://www.oit.va.gov/services/trm/">
          Office of Information and Technology (OIT) standards and technology
        </a>{' '}
        to provide these approved entities—our consumers— with the highest quality integration
        experience.
      </p>
      <ParagraphHeading>What do we do?</ParagraphHeading>
      <p className="vads-u-margin-top--0">
        We give our consumers no-cost access to VA data through <Link to="/explore">our APIs</Link>.
        We never, ever charge fees.
      </p>
      <ParagraphHeading>Why do we do it?</ParagraphHeading>
      <p className="vads-u-margin-top--0">
        Our APIs empower partners to build innovative,{' '}
        <a href="https://www.va.gov/resources/find-apps-you-can-use/">Veteran-centered apps</a> with
        the goal of better serving those who have served us.
      </p>
      <ParagraphHeading>What are APIs?</ParagraphHeading>
      <p className="vads-u-margin-top--0">
        APIs are application programming interfaces, which allow applications to send and retrieve
        data without having to build functionality from scratch. We publish only modern, RESTful
        APIs.
      </p>
      <ParagraphHeading>Why use our APIs?</ParagraphHeading>
      <p className="vads-u-margin-top--0">
        Integrating with our APIs allows you to access the most up-to-date VA data with the least
        amount of effort. When you choose to integrate your application with one or more of our
        APIs, you&apos;re getting trusted and reliable access to the data you need with the highest
        standards for security, performance, and more.
      </p>
    </div>
    <div className={classNames(defaultFlexContainer(), 'vads-u-margin-bottom--3')}>
      {platformMetrics.map((metricData: PlatformMetric) => (
        <CardLink
          key={metricData.title}
          url={metricData.url}
          name={metricData.title}
          callToAction={metricData.callToAction}
        >
          {metricData.content}
        </CardLink>
      ))}
    </div>
    <h3
      className={classNames(
        'vads-u-border-bottom--5px',
        'vads-u-border-color--primary',
        'vads-u-padding-bottom--1',
        'vads-u-margin-top--5',
      )}
    >
      There&apos;s more to explore
    </h3>
    <ul>
      <li>
        Learn about <Link to={CONSUMER_APIS_PATH}>working with our APIs</Link>.
      </li>
      <li>
        Access to our sandbox environment is automatic when you{' '}
        <Link to="/explore">request an API key</Link>.
      </li>
    </ul>
  </div>
);

export default Overview;
