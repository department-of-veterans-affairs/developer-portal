import * as React from 'react';
import classNames from 'classnames';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { CardLink, PageHeader } from '../../components';
import { defaultFlexContainer } from '../../styles/vadsUtils';
import { consumerPartners } from './consumerPartners';
import { platformMetrics } from './platformMetrics';
import { PlatformMetric } from './types/platform-metric';
import './About.scss';

const Overview = (): JSX.Element => (
  <div>
    <Helmet>
      <title>About</title>
    </Helmet>
    <PageHeader header="About" />
    <div className="vads-u-font-size--lg">
      <p className="vads-u-margin-top--0">
        Lighthouse is part of VA’s Digital Modernization strategy. Since August 2018, we’ve been
        giving approved individuals and organizations access to the VA data they need. Our platform
        adheres to{' '}
        <Link to="https://www.oit.va.gov/services/trm/">
          Office of Information and Technology (OIT) standards and technology
        </Link>{' '}
        to provide these approved entities—our consumers— with the highest quality integration
        experience.
      </p>
      <h3 className="vads-u-margin-bottom--0">What do we do?</h3>
      <p className="vads-u-margin-top--0">
        We give our consumers no-cost access to VA data through{' '}
        <Link to="https://developer.va.gov/explore">our APIs</Link>. We never, ever charge fees.
      </p>
      <h3 className="vads-u-margin-bottom--0">Why do we do it?</h3>
      <p className="vads-u-margin-top--0">
        Our APIs empower partners to build innovative,{' '}
        <Link to="https://www.va.gov/resources/find-apps-you-can-use/">Veteran-centered apps</Link>{' '}
        with the goal of better serving those who have served us.
      </p>
      <h3 className="vads-u-margin-bottom--0">What are APIs?</h3>
      <p className="vads-u-margin-top--0">
        APIs are application programming interfaces, which allow applications to send and retrieve
        data without having to build functionality from scratch. We publish only modern, RESTful
        APIs.
      </p>
      <h3 className="vads-u-margin-bottom--0">Why use our APIs?</h3>
      <p className="vads-u-margin-top--0">
        Integrating with our APIs allows you to access the most up-to-date VA data with the least
        amount of effort. When you choose to integrate your application with one or more of our
        APIs, you’re getting trusted and reliable access to the data you need with the highest
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
    <h2 className="vads-u-margin-top--0">You&apos;ll be in good company</h2>
    <div className="vads-u-margin-bottom--5" id="clients">
      {consumerPartners.map(
        (partner: string): JSX.Element => (
          <div key={partner}>{partner}</div>
        ),
      )}
    </div>
    <div className={classNames('vads-u-border-left--5px', 'vads-u-border-color--gray-lighter')}>
      <p
        className={classNames(
          'quote',
          'vads-u-margin-top--0',
          'vads-u-margin-left--2',
          'vads-u-color--gray-dark',
          'vads-u-font-size--lg',
        )}
      >
        VA Lighthouse helped us to create needed efficiency within our office. During these lean
        business times, innovative solutions are imperative in order to be able to help Veterans
        more effectively with less resources.
      </p>
      <p className={classNames('signature', 'vads-u-color--gray-dark', 'vads-u-font-size--lg')}>
        — VSO, Santa Clara, CA
      </p>
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
        Learn about{' '}
        <Link to="https://developer.va.gov/onboarding/working-with-lighthouse-apis">
          working with our APIs
        </Link>
        .
      </li>
      <li>
        Access to our sandbox environment is automatic when you{' '}
        <Link to="https://developer.va.gov/apply">request an API key</Link>.
      </li>
    </ul>
  </div>
);

export default Overview;
