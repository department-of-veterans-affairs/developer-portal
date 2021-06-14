import classNames from 'classnames';
import * as React from 'react';
import { Link } from 'react-router-dom';
import documentationImage from '../assets/documentation.svg';
import rocketImage from '../assets/rocket.svg';
import branchImage from '../assets/branch.svg';
import './Home.scss';

import apiDefinitions, { apiCategoryOrder } from '../apiDefs/data/categories';
import { CardLink, Hero } from '../components';
import { Flag } from '../flags';
import { FLAG_CATEGORIES } from '../types/constants';

// const leftColumnClasses = classNames(
//   'medium-screen:vads-l-col--4',
//   'small-screen:vads-l-col--6',
//   'va-api-u-margin-y--auto',
// );
// const rightColumnClasses = classNames(
//   'medium-screen:vads-l-col--8',
//   'small-screen:vads-u-padding-left--2',
//   'small-screen:vads-l-col--6',
//   'va-api-u-margin-y--auto',
// );
const columnContentClasses = classNames(
  'vads-u-flex--1',
  'vads-u-text-align--center',
  'vads-u-padding-top--3',
  'vads-u-padding-x--2',
  'vads-u-padding-bottom--2',
);

const buttonClasses = classNames(
  'usa-button',
  'usa-button-secondary',
  'vads-u-align-items--center',
);

const imageClasses = classNames('medium-screen:vads-u-width--auto', 'va-api-u-width--200');

export interface ColumnContentProps {
  ariaLabel: string;
  imageSrc: string;
  title: string;
  children: React.ReactNode;
  buttonText: string;
  buttonDestination: string;
}

const ColumnContent = (props: ColumnContentProps): JSX.Element => {
  const { ariaLabel, imageSrc, title, children, buttonText, buttonDestination } = props;
  return (
    <div className={columnContentClasses} style={{ maxWidth: '356px' }}>
      <div aria-label={ariaLabel}>
        <div>
          <img className={imageClasses} src={imageSrc} alt="" role="presentation" />
        </div>
        <div>
          <h2>{title}</h2>
          <div className="title-border" />
          <p>{children}</p>
        </div>
        <Link to={buttonDestination} className={buttonClasses}>
          {buttonText}
        </Link>
      </div>
    </div>
  );
};

const ApiList = (): JSX.Element => (
  <section className="api-list">
    <div className="vads-l-grid-container">
      <h2>A modern, reliable API library.</h2>
      <p>
        Our API library makes accessing VA data easier and safer across many categories, including
        appeals, benefits, health, facilities, forms, and Veteran verification. With our APIs,
        individuals and organizations can securely access the VA data they need to build helpful
        tools and services for Veterans at no cost. We’re actively expanding our API library to
        include new categories and APIs, with the goal of better serving those who have served us.
      </p>
      <div className="vads-l-row vads-u-justify-content--space-around">
        {/* <div className="vads-l-col--4" /> */}
        {apiCategoryOrder.map((apiCategoryKey: string) => {
          const { name, content } = apiDefinitions[apiCategoryKey];
          return (
            <Flag name={[FLAG_CATEGORIES, apiCategoryKey]} key={apiCategoryKey}>
              <CardLink
                name={name}
                url={`/explore/${apiCategoryKey}`}
                linkText={`View the ${name}`}
              >
                {content.placardText}
              </CardLink>
            </Flag>
          );
        })}
      </div>
    </div>
  </section>
);

const Home = (): JSX.Element => (
  <div className="home">
    <Hero />
    <section className="vads-u-display--flex vads-u-justify-content--center">
      <ColumnContent
        ariaLabel="API Docs"
        title="API Documentation"
        imageSrc={documentationImage}
        buttonDestination="/explore"
        buttonText="Read The Docs"
      >
        A Veteran-centered API platform for securely accessing VA data to build innovative tools for
        Veterans. Explore usage policies and technical details about VA&apos;s API offerings.
      </ColumnContent>
      <ColumnContent
        ariaLabel="API Docs"
        title="Consumer Onboarding"
        imageSrc={rocketImage}
        buttonDestination="/onboarding"
        buttonText="Review the onboarding process"
      >
        Before your app is ready to go live, we review the quality and security of applications
        integrating with our APIs and data.
      </ColumnContent>
      <ColumnContent
        ariaLabel="API Docs"
        title="API Publishing"
        imageSrc={branchImage}
        buttonDestination="/api-publishing"
        buttonText="Add your API to Lighthouse"
      >
        Change the face of VA data by adding your API to the Lighthouse development portal. Find out
        how you can onboard your API and learn what to expect when working with Lighthouse.
      </ColumnContent>
    </section>
    <ApiList />
  </div>
);

export default Home;
