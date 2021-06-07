import classNames from 'classnames';
import * as React from 'react';
import { Link } from 'react-router-dom';
import codeImage from '../assets/code-block.svg';
import rocketImage from '../assets/rocket.svg';
import prImage from '../assets/pr.svg';

// import apiDefinitions, { apiCategoryOrder } from '../apiDefs/data/categories';
// import padlockImg from '../assets/homepage-padlock.svg';
// import apiImg from '../assets/homepage-reliable-api.svg';
import { Hero } from '../components';
// import { Flag } from '../flags';
// import { FLAG_CATEGORIES } from '../types/constants';

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

const buttonClasses = classNames('usa-button usa-button-secondary');

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
    <div className={columnContentClasses}>
      <div aria-label={ariaLabel}>
        <div>
          <img className={imageClasses} src={imageSrc} alt="" role="presentation" />
        </div>
        <div>
          <h2 className="vads-u-border-bottom--5px">{title}</h2>
          {children}
        </div>
        <Link to={buttonDestination} className={buttonClasses}>
          {buttonText}
        </Link>
      </div>
    </div>
  );
};

// const ApiList = (): JSX.Element => (
//   <section>
//     <div className={classNames(flexContainer, 'vads-u-margin-bottom--6')}>
//       <div className="vads-l-row">
//         <div className="medium-screen:vads-l-col--4" />
//         <div className="medium-screen:vads-l-col--8">
//           <div className="vads-l-row">
//             {apiCategoryOrder.map((apiCategoryKey: string) => {
//               const { name, content } = apiDefinitions[apiCategoryKey];
//               return (
//                 <Flag name={[FLAG_CATEGORIES, apiCategoryKey]} key={apiCategoryKey}>
//                   <CardLink name={`VA ${name}`} url={`/explore/${apiCategoryKey}`}>
//                     {content.placardText}
//                   </CardLink>
//                 </Flag>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </div>
//   </section>
// );

const Home = (): JSX.Element => (
  <div className="home">
    <Hero />
    <section className="vads-u-display--flex">
      <ColumnContent
        ariaLabel="API Docs"
        title="API Documentation"
        imageSrc={codeImage}
        buttonDestination="#"
        buttonText="Read The Docs"
      >
        A Veteran-centered API platform for securely accessing VA data to build innovative tools for
        Veterans. Explore usage policies and technical details about VA&apos;s API offerings.
      </ColumnContent>
      <ColumnContent
        ariaLabel="API Docs"
        title="Consumer Onboarding"
        imageSrc={rocketImage}
        buttonDestination="#"
        buttonText="Review the onboarding process"
      >
        Before your app is ready to go live, we review the quality and security of applications
        integrating with our APIs and data.
      </ColumnContent>
      <ColumnContent
        ariaLabel="API Docs"
        title="API Publishing"
        imageSrc={prImage}
        buttonDestination="#"
        buttonText="Add your API to Lighthouse"
      >
        Change the face of VA data by adding your API to the Lighthouse development portal. Find out
        how you can onboard your API and learn what to expect when working with Lighthouse.
      </ColumnContent>
    </section>
  </div>
);

export default Home;
