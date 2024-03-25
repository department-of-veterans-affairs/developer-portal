/* eslint-disable max-lines */
import React from 'react';
import { Helmet } from 'react-helmet';
import { PageHeader } from '../components';

const TermsOfService = (): JSX.Element => (
  <section className="vads-u-padding-y--5">
    <div className="vads-l-grid-container">
      <div>
        <Helmet>
          <title>Terms of Service</title>
        </Helmet>
        <PageHeader header="VA API Terms of Service" />
        <p>Last Updated: March 14, 2024</p>
        <p>
          Thank you for using U.S. Department of Veterans Affairs (VA) APIs. By accessing or using
          our APIs, you are agreeing to the terms below.
        </p>
        <p>
          Please review these terms carefully. Once accepted, these terms become a binding legal
          commitment between you and the VA. If you do not agree to be bound by these terms, you
          should not use VA&apos;s APIs.
        </p>
        <h2 id="scope">Scope</h2>
        <p>
          The service (&quot;API&quot;) through which you interact with VA data is subject to these
          terms. Use of the API constitutes acceptance to these Terms.
        </p>
        <h2 id="data-rights-and-usage">Data Rights and Usage</h2>
        <h3 id="accounts%2Fregistration">Accounts/Registration</h3>
        <p>
          If you are using the API on behalf of an entity, you represent and warrant that you have
          authority to bind that entity to the Terms and by accepting the Terms, you are doing so on
          behalf of that entity (and all references to &quot;you&quot; in the Terms refer to you and
          that entity).
        </p>
        <p>
          In order to access the API, you may be required to provide certain information (such as
          identification or contact details) as part of the registration process for the API, or as
          part of your continued use of the API. Any registration information you give to VA must be
          accurate and up to date and you must inform us promptly of any updates so that we can keep
          you informed of any changes to the API or the Terms which may impact your usage of the
          API.
        </p>
        <p>
          Developer credentials (such as passwords, keys, tokens, and client IDs) are intended to be
          used only by you and identify any software which you are using with the APIs. You will
          keep your credentials confidential and make reasonable efforts to prevent and discourage
          other API Clients from using your credentials. Developer credentials may not be embedded
          in open source projects.
        </p>
        <p>
          You will only access (or attempt to access) an API by the means described in the
          documentation of that API. If VA assigns you developer credentials (e.g., client IDs), you
          must use them with the applicable APIs.
        </p>
        <h3 id="attribution">Attribution</h3>
        <p>
          While not required, when using content, data, documentation, code, and related materials
          associated with the API in your own work, we ask that proper credit be given.
        </p>
        <h3 id="right-to-limit">Right to Limit</h3>
        <p>
          Your use of the API may be subject to certain limitations on access, calls, or use as set
          forth within this Agreement or otherwise provided by VA. These limitations are designed to
          manage the load on the system, promote equitable access, and prevent abuse, and these
          limitations may be adjusted without notice, as deemed necessary by VA. If VA reasonably
          believes that you have attempted to exceed or circumvent these limits, your ability to use
          the API may be temporarily or permanently blocked. VA may monitor your use of the API to
          improve the service or to ensure compliance with this Agreement.
        </p>
        <h2 id="changes-and-service-termination">Changes and Service Termination</h2>
        <h3 id="changes-to-these-terms">Changes to these Terms</h3>
        <p>
          We may revise these Terms from time to time. If we do, those revised Terms will supersede
          prior versions. Unless we say otherwise, revisions will be effective upon the effective
          date indicated at the top of these Terms. Your continued access or use of our Services
          constitutes your acceptance of any revisions. If you don&apos;t agree to the revisions,
          you should stop using VA APIs and we are not obligated to provide you with the Services.
        </p>
        <h3 id="changes-to-services">Changes to Services</h3>
        <p>
          The features and functions of our Services, including our APIs, and VA&apos;s service
          level agreement (SLA), may change over time. It is your responsibility to ensure that
          calls or requests you make to our Services are compatible with our then-current Services.
          Although we try to avoid making changes to our Services that are not backwards compatible,
          if any such changes become necessary, we will use reasonable efforts to let you know at
          least sixty (60) days prior to implementing those changes.
        </p>
        <h3 id="service-termination">Service Termination</h3>
        <p>
          If you wish to terminate this Agreement, you may do so by refraining from further use of
          the API. VA reserves the right (though not the obligation) to: (1) refuse to provide the
          API to you, if it is VA&apos;s opinion that use violates any VA policy; or (2) terminate
          or deny you access to and use of all or part of the API at any time for any other reason
          which in its sole discretion it deems necessary to in order to prevent abuse. You may
          petition VA to regain access to the API. If VA determines in its sole discretion that the
          circumstances which led to the refusal to provide the API or terminate access to the API
          are no longer in existence, then VA may restore your access. All provisions of this
          Agreement shall survive termination including, without limitation, warranty disclaimers,
          and limitations of liability.
        </p>
        <h2 id="liability">Liability</h2>
        <h3 id="disclaimer-of-warranties">Disclaimer of Warranties</h3>
        <p>
          The API platform is provided &quot;as is&quot; and on an &quot;as-available&quot; basis.
          While we will do our best to ensure the service is available and functional at all times,
          VA hereby disclaim all warranties of any kind, express or implied, including without
          limitation the warranties of merchantability, fitness for a particular purpose, and
          non-infringement. VA makes no warranty that data will be error free or that access thereto
          will be continuous or uninterrupted.
        </p>
        <h3 id="limitations-on-liability">Limitations on Liability</h3>
        <p>
          In no event will VA be liable with respect to any subject matter of this Agreement under
          any contract, negligence, strict liability or other legal or equitable theory for: (1) any
          special, incidental, or consequential damages; (2) the cost of procurement of substitute
          products or services; or (3) for interruption of use or loss or corruption of data.
        </p>
        <h3 id="indemnification">Indemnification</h3>
        <p>
          You agree to indemnify and hold harmless VA, its contractors, employees, agents, and the
          like, from and against any and all claims and expenses, including attorney&apos;s fees,
          arising out of your use of the API, including but not limited to violation of this
          Agreement except to the extent that such claim arises from the negligence or wrongful act
          of VA.
        </p>
        <h3 id="disputes">Disputes</h3>
        <p>
          Any disputes arising out of this Agreement and access to or use of the API shall be
          governed by federal law. Some APIs may have API specific Terms. If there is a conflict
          between these terms and additional terms applicable to a specific API, the additional
          terms will control for that conflict.
        </p>
        <h3 id="no-waiver-rights">No Waiver Rights</h3>
        <p>
          VA&apos;s failure to exercise or enforce any right or provision of this Agreement shall
          not constitute waiver of such right or provision.
        </p>
        <h2 id="privacy">Privacy</h2>
        <p>
          You may use a VA API to develop a service to search, display, analyze, retrieve, view and
          otherwise &apos;get&apos; information from VA, which requires special safeguarding. You
          agree to strictly abide by all applicable federal and state laws regarding the protection
          and disclosure of information obtained through a VA API.
        </p>
        <p>
          You further acknowledge that when records regarding an individual are obtained through a
          VA API, you may not expose that content to other individuals or third parties without
          specific, explicit consent from the individual or his or her authorized representative, or
          as permitted by applicable law. The terms &quot;individual&quot; and &quot;record&quot;
          have the meanings given in the Privacy Act at 5 U.S.C. § 552a(a). If you would like more
          information about the application of the Privacy Policy at VA,{' '}
          <a href="https://www.va.gov/privacy/">click here</a>.
        </p>
        <h2 id="authorization-for-ngos">Authorization for VA API Access for NGOs</h2>
        <p>
          By accessing a VA API, you, a non-governmental organization (NGO), are entering into a
          public-private partnership (P3) with VA. VA&apos;s policies relating to entry into a P3
          are explained in{' '}
          <a href="https://www.va.gov/vapubs/viewPublication.asp?Pub_ID=803&FType=2">
            VA Directive 0008
          </a>
          .
        </p>
        <p>
          VA&apos;s participation in, or continuation of, a P3 is voluntary. The decision to grant,
          deny, or discontinue your NGO API access rests solely at VA&apos;s discretion. Upon your
          request for access, VA initiates a thorough due diligence process, reviewing public
          information, evaluating details provided by your NGO, and consulting with various VA
          stakeholders.
        </p>
        <p>
          Following this comprehensive review and consideration of program goals as detailed in
          Directive 0008 and other factors, VA determines whether to authorize API access. If access
          is granted, VA conducts ongoing reviews to ensure your NGO continues to operate within the
          agreed scope of the initial approval.
        </p>
        <p>
          The availability of API access through this process does not establish a right to
          electronically access VA data through an API. It does not create, and may not be relied
          upon to create, any right or benefit, substantive or procedural, enforceable at law
          against the United States or VA.
        </p>
        <p>
          If your NGO&apos;s API access is declined or removed, you typically have an opportunity to
          submit requests for reconsideration. This process occurs within a specified time period
          following notice that VA has declined or removed your access.
        </p>
      </div>
    </div>
  </section>
);

export default TermsOfService;
