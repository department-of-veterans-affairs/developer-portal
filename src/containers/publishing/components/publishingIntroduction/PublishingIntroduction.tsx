import React, { FC } from 'react';
import classNames from 'classnames';
import { Helmet } from 'react-helmet';
import {
  SUPPORT_CONTACT_PATH,
  PUBLISHING_ONBOARDING_PATH,
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
import { useAppDispatch } from '../../../../hooks';
import { setGeneralStore } from '../../../../features/general/generalStoreSlice';

const PublishingIntroduction: FC = () => {
  const dispatch = useAppDispatch();
  const openModal = (): void => {
    dispatch(
      setGeneralStore({
        vaNetworkConnected: true,
        vaNetworkModal: true,
      }),
    );
  };
  return (
    <>
      <Helmet>
        <title>API Publishing</title>
      </Helmet>
      <PageHeader header="Publishing your API" />
      <p>
        <strong>
          VA Lighthouse Developer Experience works with internal VA teams to publish the APIs
          they&apos;ve created onto VA Developer.
        </strong>{' '}
        We are driving innovation to help Veterans control their data and access the benefits
        they&apos;ve earned. If you are an internal VA team and want to publish your API to help
        further the goals of the Office of Information and Technology{' '}
        <a href="https://www.oit.va.gov/reports/year-in-review/2020/">
          digital transformation strategy
        </a>
        , you&apos;re in the right place.
      </p>
      <p>
        Publishing your API on VA Developer results in a streamlined API experience for you and your
        users. Our vision is to create the most reliable and usable API program in government to
        enable innovation and fast integration. Simplify your API management by publishing your API
        on VA Developer.
      </p>
      <p>
        We publish only modern, <a href="https://restfulapi.net/">RESTful</a> APIs, but if your API
        follows another protocol and you&apos;re interested in publishing your API on our platform,
        reach out to us. We may be able to help you convert your API so you can benefit from being
        part of the VA Developer community.
      </p>
      <h2>VA Developer is your solution</h2>
      <p>
        Publishing your API on VA Developer shifts the administrative and maintenance burden from
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
            Be part of the secure, reliable VA Developer platform with easy integration for your
            users. Skip the weeks-long, paperwork-intensive processes needed to connect with legacy
            application interfaces.
          </p>
        </SectionWithIcon>
        <SectionWithIcon
          header="Effective documentation"
          imageFile={docsImage}
          headerId="documentation"
        >
          <p>
            We help your API documentation conform to our documentation standards, improving
            usability and ensuring human readability. We handle versioning in a clear and visible
            way, meaning no more multi-versioned Word documents or hard-to-access Sharepoint sites.
          </p>
        </SectionWithIcon>
        <SectionWithIcon
          header="Self-service access"
          imageFile={checkImage}
          headerId="self-service"
        >
          <p>
            Partners can use tools such as sample requests to quickly allow their application to
            consume your API. Our sandbox environment is self-service, making it easy for partners
            to quickly (and automatically!) gain access and see responses and functionality in
            real-time.
          </p>
        </SectionWithIcon>
        <SectionWithIcon header="Reduced overhead" imageFile={costImage} headerId="overhead">
          <p>
            Publishing with VA Developer shifts the burden of access control, authentication,
            consent, rate limiting, and more. You&apos;ll spend your time and effort on tasks that
            matter most, freeing your resources and reducing overhead.
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
          Curious about our publishing process? Learn more about the steps for publishing on VA
          Developer.
        </CardLink>
        <CardLink
          name="Requirements for APIs"
          onClick={(): void => {
            openModal();
          }}
          callToAction="View the API standards"
        >
          All public-facing APIs must adhere to VA Developer&apos;s API Standards.
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
};

export { PublishingIntroduction };
