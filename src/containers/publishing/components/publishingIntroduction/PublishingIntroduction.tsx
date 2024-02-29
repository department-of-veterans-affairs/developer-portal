import React, { FC } from 'react';
import classNames from 'classnames';
import { Helmet } from 'react-helmet';
import {
  SUPPORT_CONTACT_PATH,
  PUBLISHING_ONBOARDING_PATH,
  PUBLISHING_STANDARDS_URL,
} from '../../../../types/constants/paths';
import { defaultFlexContainer } from '../../../../styles/vadsUtils';
import { CardLink, PageHeader } from '../../../../components';
import { SectionWithIcon } from '../sectionWithIcon';
import integrateImage from '../../../../assets/integrate.svg';
import docsImage from '../../../../assets/docs.svg';
import checkImage from '../../../../assets/check.svg';
import costImage from '../../../../assets/cost.svg';
import lockImage from '../../../../assets/lock.svg';
import supportImage from '../../../../assets/support.svg';
import adoptionImage from '../../../../assets/adoption.svg';

const PublishingIntroduction: FC = () => (
  <>
    <Helmet>
      <title>API Publishing</title>
    </Helmet>
    <PageHeader header="Publishing your API on Lighthouse" />
    <p>
      <strong>
        VA Lighthouse APIs work with internal VA teams to publish the APIs they&apos;ve created.
      </strong>{' '}
      Together, Lighthouse and VA are driving innovation to help Veterans control their data and
      access the benefits they&apos;ve earned. If you are an internal VA team and want to publish
      your API to help further the goals of the Office of Information and Technology{' '}
      <a href="https://www.oit.va.gov/reports/year-in-review/2020/">
        digital transformation strategy
      </a>
      , you&apos;re in the right place.
    </p>
    <p>
      Publishing your API on Lighthouse results in a streamlined API experience for you and your
      consumers. Our vision is to create the most reliable and usable API program in government to
      enable innovation and fast integration. Simplify your API management and help us achieve our
      goals by publishing your API on the Lighthouse developer portal.
    </p>
    <p>
      We publish only modern, <a href="https://restfulapi.net/">RESTful</a> APIs, but if your API
      follows another protocol and you&apos;re interested in publishing your API on our platform,
      reach out to us. We may be able to help you convert your API so you can benefit from being
      part of the Lighthouse community.
    </p>
    <h2>Lighthouse is your solution</h2>
    <p>
      Publishing your API on Lighthouse lifts much of the administrative and maintenance burden from
      your team to ours. We act as your API partner and consultant and are invested in your
      team&apos;s success. The benefits of working with us are far-reaching for both you and your
      consumers, including:
    </p>
    <div className="vads-u-display--flex vads-u-flex-direction--column vads-u-margin-bottom--7">
      <SectionWithIcon
        header="Streamlined integration"
        imageFile={integrateImage}
        headerId="integration"
      >
        <p>
          Be part of the secure, reliable Lighthouse program with easy integration for your
          consumers. Skip the weeks-long, paperwork-intensive processes needed to connect with
          legacy application interfaces.
        </p>
      </SectionWithIcon>
      <SectionWithIcon
        header="Effective documentation"
        imageFile={docsImage}
        headerId="documentation"
      >
        <p>
          We help your API documentation conform to our documentation standards, improving usability
          and ensuring human readability. We handle versioning in a clear and visible way, meaning
          no more multi-versioned Word documents or hard-to-access Sharepoint sites.
        </p>
      </SectionWithIcon>
      <SectionWithIcon header="Self-service access" imageFile={checkImage} headerId="self-service">
        <p>
          Partners can use tools such as sample requests to quickly allow their application to
          consume your API. Our sandbox environment is self-service, making it easy for partners to
          quickly (and automatically!) gain access and see responses and functionality in real-time.
        </p>
      </SectionWithIcon>
      <SectionWithIcon header="Reduced overhead" imageFile={costImage} headerId="overhead">
        <p>
          Publishing with Lighthouse shifts the burden of access control, authentication, consent,
          rate limiting, and more. You&apos;ll spend your time and effort on tasks that matter most,
          freeing your resources and reducing overhead.
        </p>
      </SectionWithIcon>
      <SectionWithIcon header="Security" imageFile={lockImage} headerId="security">
        <p>
          We use industry best practices for API security and Veteran authentication, including
          adherence to the highest industry standards.
        </p>
      </SectionWithIcon>
      <SectionWithIcon header="Top-notch support" imageFile={supportImage} headerId="support">
        <p>
          We become your trusted partner, giving you access to expert developer support when you
          need it most, including front-line issue triage and proper escalation.
        </p>
      </SectionWithIcon>
      <SectionWithIcon
        header="Higher adoption rates and visibility"
        imageFile={adoptionImage}
        headerId="adoption"
      >
        <p>
          Gain instant access to a community of innovative developers, increase internal VA
          visibility and adoption, and become part of a thriving API ecosystem.
        </p>
      </SectionWithIcon>
    </div>
    <div className={classNames(defaultFlexContainer(), 'vads-u-justify-content--space-evenly')}>
      <CardLink
        name="How onboarding works"
        url={PUBLISHING_ONBOARDING_PATH}
        callToAction="Learn about API publishing"
      >
        Curious about our publishing process? Learn more about the steps toward publishing with
        Lighthouse.
      </CardLink>
      <CardLink
        name="Requirements for APIs"
        url={PUBLISHING_STANDARDS_URL}
        callToAction="View the API standards"
      >
        All public-facing APIs must adhere to the requirements in the VA Lighthouse API Standards.
      </CardLink>
      <CardLink
        name="Contact us"
        url={SUPPORT_CONTACT_PATH}
        callToAction="Contact us for API publishing"
      >
        Ready to take the leap and publish your API with us? Start the process by contacting us
        here.
      </CardLink>
    </div>
  </>
);

export { PublishingIntroduction };
