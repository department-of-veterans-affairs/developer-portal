import classNames from 'classnames';
import * as React from 'react';
import { Link } from 'react-router-dom';
import LoadingIndicator from '@department-of-veterans-affairs/component-library/LoadingIndicator';
import documentationImage from '../assets/documentation.svg';
import rocketImage from '../assets/rocket.svg';
import branchImage from '../assets/branch.svg';
import './Home.scss';

import { CardLink, Hero } from '../components';
import { Flag } from '../flags';
import { FLAG_CATEGORIES } from '../types/constants';
import { getApiCategoryOrder, getApiDefinitions, getApisLoaded } from '../apiDefs/query';
import { defaultLoadingProps } from '../utils/loadingHelper';

const columnContentClasses = classNames(
  'vads-u-text-align--center',
  'vads-u-padding-top--3',
  'vads-u-padding-bottom--2',
  'va-api-u-max-width--350',
  'flex-basis-32',
);

const buttonClasses = classNames(
  'usa-button',
  'usa-button-secondary',
  'vads-u-align-items--center',
  'va-home-button',
);

const imageClasses = classNames('medium-screen:vads-u-width--auto', 'va-api-u-width--100');

const columnContentSectionClasses = classNames(
  'vads-u-display--flex',
  'vads-u-justify-content--space-between',
  'vads-u-flex-direction--column',
  'medium-screen:vads-u-flex-direction--row',
  'vads-u-padding-bottom--3',
  'va-api-u-max-width--1200',
  'vads-u-align-items--center',
  'medium-screen:vads-u-align-items--stretch',
);

export interface ColumnContentProps {
  imageSrc: string;
  title: string;
  children: React.ReactNode;
  buttonText: string;
  buttonDestination: string;
}

const ColumnContent = (props: ColumnContentProps): JSX.Element => {
  const { imageSrc, title, children, buttonText, buttonDestination } = props;
  return (
    <div className={columnContentClasses}>
      <div className="vads-u-height--full va-column-content-text">
        <div>
          <img className={imageClasses} src={imageSrc} alt="" role="presentation" />
        </div>
        <div className="vads-u-padding-bottom--4">
          <h2 className="vads-u-margin-top--0">{title}</h2>
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

const ApiList = (): JSX.Element => {
  const apisLoaded = getApisLoaded();
  const apiDefinitions = getApiDefinitions();
  const apiCategoryOrder = getApiCategoryOrder();

  return (
    <section className="api-list vads-u-padding-top--3  vads-u-padding-bottom--2">
      <div className="vads-l-grid-container vads-u-margin-x--auto">
        <h2 className="vads-u-margin-top--0">A modern, reliable API library.</h2>
        <p>
          Our API library makes accessing VA data easier and safer across many categories, including
          appeals, benefits, health, facilities, forms, and Veteran verification. With our APIs,
          individuals and organizations can securely access the VA data they need to build helpful
          tools and services for Veterans at no cost. We’re actively expanding our API library to
          include new categories and APIs, with the goal of better serving those who have served us.
        </p>
        <div className="vads-l-row">
          <div className="vads-l-row vads-u-justify-content--space-evenly">
            {apisLoaded ? (
              <>
                {apiCategoryOrder.map((apiCategoryKey: string) => {
                  const { name, content } = apiDefinitions[apiCategoryKey];
                  return (
                    <Flag name={[FLAG_CATEGORIES, apiCategoryKey]} key={apiCategoryKey}>
                      <CardLink
                        name={name}
                        url={`/explore/${apiCategoryKey}`}
                        callToAction={`View the ${name}`}
                        centered
                      >
                        {content.shortDescription}
                      </CardLink>
                    </Flag>
                  );
                })}
              </>
            ) : (
              <LoadingIndicator {...defaultLoadingProps()} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const Home = (): JSX.Element => (
  <div className="home vads-l-grid-container--full">
    <Hero />
    <section className="vads-u-background-color--white">
      <div className={classNames('vads-l-grid-container', 'vads-u-margin-x--auto')}>
        <div className={columnContentSectionClasses}>
          <ColumnContent
            title="API Documentation"
            imageSrc={documentationImage}
            buttonDestination="/explore"
            buttonText="Read the Docs"
          >
            A Veteran-centered API platform for securely accessing VA data to build innovative tools
            for Veterans. Explore usage policies and technical details about VA&apos;s API
            offerings.
          </ColumnContent>
          <ColumnContent
            title="Consumer Onboarding"
            imageSrc={rocketImage}
            buttonDestination="/onboarding"
            buttonText="Review the onboarding process"
          >
            We review the quality and security of all applications integrating with our APIs and
            data before they go live.
          </ColumnContent>
          <ColumnContent
            title="API Publishing"
            imageSrc={branchImage}
            buttonDestination="/api-publishing"
            buttonText="Add your API to Lighthouse"
          >
            Change the face of VA data by adding your API to the Lighthouse development portal. Find
            out how you can onboard your API and learn what to expect when working with Lighthouse.
          </ColumnContent>
        </div>
      </div>
    </section>
    <ApiList />
  </div>
);

export default Home;
