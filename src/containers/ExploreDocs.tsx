import * as React from 'react';

import { Flag } from 'flag';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink, Route } from 'react-router-dom';
import scrollIntoView from 'scroll-into-view-if-needed';

import { PageHero } from '../components';
import { IApiNameParam } from '../types';
import Explore from './Explore';


import { BenefitsOverview,
         FacilitiesOverview,
         HealthOverview,
         VerificationOverview } from '../content/apiDocs';

import './Explore.scss'

import Tos from '../content/termsOfService.mdx';

interface IApiDescription {
    readonly name: string;
    readonly urlFragment: string;
    readonly shortDescription: string;
    readonly vaInternalOnly: boolean;
}

interface IApiCategory {
    readonly apis: IApiDescription[];
    readonly buttonText: string;
    readonly name: string;
    readonly overview: React.StatelessComponent;
    readonly shortDescription: string;
}

interface IApiCategories {
    [key: string]: IApiCategory;
}

const apiDefs : IApiCategories = {
    benefits: {
        apis: [
            {
                name: 'Benefits Intake',
                shortDescription: 'Submit claims',
                urlFragment: 'benefits',
                vaInternalOnly: false,
            },
            {
                name: 'Appeals Status',
                shortDescription: 'Track appeals',
                urlFragment: 'appeals',
                vaInternalOnly: false,
            },
            {
                name: 'Claims Status',
                shortDescription: 'Track claims',
                urlFragment: 'claims',
                vaInternalOnly: false,
            },
            {
                name: 'Loan Guarantees',
                shortDescription: 'Manage VA home loan guarantees',
                urlFragment: 'loan_guarantees',
                vaInternalOnly: false,
            },
        ],
        buttonText: "Get Your Key",
        name: 'Benefits',
        overview: BenefitsOverview,
        shortDescription: 'Enables approved organizations to submit benefits-related PDFs and access information on a Veteran’s behalf.',
    },
    facilities: {
        apis: [
            {
                name: 'VA Facilities API',
                shortDescription: "VA Facilities",
                urlFragment: 'facilities',
                vaInternalOnly: false,
            },
        ],
        buttonText: "Get Your Key",
        name: 'Facilities',
        overview: FacilitiesOverview,
        shortDescription: "Use the VA Facility API to find relevant information about a specific VA facility. For each VA facility, you'll find contact information, location, hours of operation and available services. For medical facilities only, we provide data on appointment wait times and patient satisfaction.",
    },
    health: {
        apis: [
            {
                name: 'Veterans Health API',
                shortDescription: "VA's Argonaut resources",
                urlFragment: 'argonaut',
                vaInternalOnly: false,
            },
        ],
        buttonText: "Get Your Key",
        name: 'Health',
        overview: HealthOverview,
        shortDescription: "Use our APIs to build tools that help Veterans manage their health, view their medical records, schedule an appointment, find a specialty facility, and share their information with caregivers and providers.",
    },
    verification: {
        apis: [
            {
                name: 'Disability Rating',
                shortDescription: "Get a veteran's disability rating",
                urlFragment: 'disability_rating',
                vaInternalOnly: false,
            },
            {
                name: 'Service History',
                shortDescription: "Get a veteran's service history",
                urlFragment: 'service_history',
                vaInternalOnly: false,
            },
            {
                name: 'Veteran Confirmation',
                shortDescription: "Get confirmation of a veteran's status",
                urlFragment: 'veteran_confirmation',
                vaInternalOnly: false,
            },
            {
                name: 'Address Validation',
                shortDescription: 'Provides methods to standardize and validate addresses.',
                urlFragment: 'address_validation',
                vaInternalOnly: true,
            },
        ],
        buttonText: "Stay Informed",
        name: "Veteran Verification",
        overview: VerificationOverview,
        shortDescription: "Empowering Veterans to take control of their data and put it to work.",
    },
};

const apiCategoryOrder: string[] = [
    'benefits',
    'facilities',
    'health',
    'verification',
];

export function ApiPageHero() {
    const href = (process.env.REACT_APP_SALESFORCE_APPLY === 'true') ?
                 "https://vacommunity.secure.force.com/survey/ExAM__AMAndAnswerCreationPage?paId=a2ft0000000VVnJ" :
                 "/apply";
    const linkDirect = (process.env.REACT_APP_SALESFORCE_APPLY === 'true');
    return (
        <PageHero
            title="API Documentation"
            content="Explore usage policies and technical details about VA's API offerings"
            button="Request Access"
            linkDirect={linkDirect}
            buttonLink={href} />
    );
}

function ApiSection({ apiCategoryKey, sectionRef } : { apiCategoryKey : string, sectionRef? : React.RefObject<HTMLElement> } ) {
    const { apis, name: categoryName, overview, shortDescription: introText } = apiDefs[apiCategoryKey];
    let linkSection;

    if (apis.length > 0) {
        const links = apis.map((apiDesc: IApiDescription, idx) => {
            const { name, shortDescription, urlFragment, vaInternalOnly } = apiDesc;
            return (
                <Flag key={idx} name={`hosted_apis.${urlFragment}`}>
                    <div key={idx} className="api-link">
                      <Link to={`/explore/${apiCategoryKey}/docs/${urlFragment}`}>
                        <span>{name}</span>
                        {(vaInternalOnly === true) ? <p className="api-name-tag">Internal VA use only.</p> : null}
                        <p>{shortDescription}</p>
                      </Link>
                    </div>
                </Flag>
            );
        });
        linkSection = (
            <div role="navigation" aria-labelledby={`${apiCategoryKey}-overview-apis`} className="usa-grid">
              <h2 id={`${apiCategoryKey}-overview-apis`}>Available {categoryName} APIs</h2>
              {links}
            </div>
        );
    }

    return (
        <section role="region" aria-labelledby={`${apiCategoryKey}-overview`} className="usa-section" ref={sectionRef}>
          <div>
            <div className="usa-grid">
              <h1 id={`${apiCategoryKey}-overview`}>{categoryName}</h1>
              <p>{introText}</p>
            </div>
          </div>
          {linkSection}
          <div>
            <div className="usa-grid">
              <div className="usa-width-one-whole">
                {overview({})}
              </div>
            </div>
          </div>
          <hr />
        </section>
    );
}

class ApiPage extends React.Component<RouteComponentProps<IApiNameParam>, {}> {
    private sectionRefs : { [key: string]: React.RefObject<HTMLElement> } = {}
    // Our componentDidUpdate method will be called whenever any of these happen:
    //   * NavLink clicked.
    //   * The initial route is rendered.
    //   * The after-scroll event changes the navigation stack and the page re-renders.
    // The skipAutoScroll flag is set when the user is manually scrolling in order to avoid the
    // navigation stack modifications from scrolling the viewport to the top of the newly-current
    // section.
    private skipAutoScroll: boolean;

    public componentDidMount() {
        this.skipAutoScroll = false;
        window.addEventListener('scroll', this.handleScroll);
        this.scrollFocusSection();
    }

    public componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    public componentDidUpdate(prevProps : RouteComponentProps<IApiNameParam>) {
        // Since componentDidUpdate fires in response to a NavLink being clicked, we scroll the
        // corresponding section to the top.
        this.scrollFocusSection();
    }

    public render() {
        const sections = apiCategoryOrder.map((apiCategoryKey: string, idx: number) => {
            this.sectionRefs[apiCategoryKey] = React.createRef();
            return (
                <ApiSection
                    sectionRef={this.sectionRefs[apiCategoryKey]}
                    apiCategoryKey={apiCategoryKey}
                    key={idx} />
            );
        });
        this.sectionRefs['terms-of-service'] = React.createRef();
        return (
            <div>
              {sections}
              <section className="usa-section" ref={this.sectionRefs['terms-of-service']}>
                <div className="usa-grid">
                  <Tos />
                </div>
              </section>
            </div>
        );
    }

    private scrollFocusSection() {
        const { match: { params: { apiCategoryKey } } } = this.props;
        const section = this.sectionRefs[apiCategoryKey];

        if (section && section.current) {
            section.current.focus();
            if (this.skipAutoScroll === true) {
                this.skipAutoScroll = false;
            } else {
                // The skipAutoScroll flag should ensure that this is only called in response to
                // "true" navigation changes. I.e. NavLink clicks.
                scrollIntoView(section.current, {
                    block: 'start',
                    scrollMode: 'if-needed',
                });
            }
        }
    }

    private handleScroll = () => {
        if (window.scrollY !== 0) {
            this.updatePathToReflectView();
        }
    };

    // Determines which section is being viewed. Ensures that the window location is set to the URL
    // for that section. The left nav rendering uses the window location to determine which nav item
    // to visually focus.
    private updatePathToReflectView() {
        const distanceRecords: Array<[number, number, string]> = [];

        Object.keys(this.sectionRefs).forEach((apiCategoryKey, idx) => {
            const section = this.sectionRefs[apiCategoryKey];
            if (section.current != null) {
                const { top: sectionTop, height: sectionHeight } = section.current.getBoundingClientRect();
                const sectionBottom: number = sectionTop + sectionHeight;

                distanceRecords.push([Math.abs(sectionTop), idx, apiCategoryKey]);
                if (sectionHeight > window.innerHeight) {
                    // This pushes a second record into the list that marks one screen height above
                    // the bottom of the section. This ensures that the viewport is showing two
                    // sections, the left nav reflects the one filling more of the viewport.
                    distanceRecords.push([Math.abs(sectionBottom - window.innerHeight), idx, apiCategoryKey]);
                }
            }
        });
        distanceRecords.sort((a, b) => {
            const aDist: number = a[0];
            const bDist: number = b[0];
            return aDist - bDist;
        });

        const topSectionKey = distanceRecords[0][2];

        if (topSectionKey) {
            const path = (`/explore/${topSectionKey}`);
            const { history, location: { pathname } } = this.props;
            if (pathname !== path) {
                this.skipAutoScroll = true;
                history.push(path);
            }
        }
    }
}

function VaInternalTag() {
    return (
        <span><small>Internal VA use only.</small></span>
    );
}

function SideNavApiEntry(apiCategoryKey: string, api: IApiDescription, subIdx: number) {
    const internalTag = (api.vaInternalOnly === true) ? VaInternalTag() : null;

    return (
        <Flag key={subIdx} name={`hosted_apis.${api.urlFragment}`}>
            <li key={subIdx}>
              <NavLink exact={true} to={`/explore/${apiCategoryKey}/docs/${api.urlFragment}`} activeClassName="usa-current">
                <div>
                  {api.name}
                  <br />
                  {internalTag}
                </div>
              </NavLink>
              <br />
            </li>
        </Flag>
    );
}

function SideNavCategoryEntry(currentUrl: string, apiCategoryKey: string, apiCategory: IApiCategory, idx: number) {
    const subNavLinks = apiCategory.apis.map((api, subIdx) => {
        return SideNavApiEntry(apiCategoryKey, api, subIdx);
    });
    const topLinkPath = `/explore/${apiCategoryKey}`;
    const className = ((subNavLinks.length > 0 ? "expand" : "")
            + " "
            + (currentUrl === topLinkPath ? "usa-current" : ""))

    return (
        <li key={idx}>
          <NavLink exact={true} to={topLinkPath} className={className}>
            {apiCategory.name}
          </NavLink>
          <ul className="usa-sidenav-sub_list">
            {subNavLinks}
          </ul>
        </li>
    );
}

export function SideNav({ match: { url } } : RouteComponentProps<IApiNameParam>) {
    let idx = 0;
    const buildSideNavCategoryEntry = (key: string) => {
        return SideNavCategoryEntry(url, key, apiDefs[key], idx++);
    };

    const navLinks = apiCategoryOrder.map(buildSideNavCategoryEntry);

    return (
        <ul role="navigation" aria-label="API Docs Side Nav" className="usa-sidenav-list">
          {navLinks}
          <li>
            <NavLink exact={true} to="/explore/terms-of-service" className={url === "/explore/terms-of-service" ? "usa-current" : ""}>
              Terms of Service
            </NavLink>
          </li>
        </ul>
    );
}

export function ExploreDocs(routeProps : RouteComponentProps<IApiNameParam>) {
    return (
        <div className="Explore">
        <Route exact={true} path="/explore/:apiCategoryKey?" component={ApiPageHero} />
          <section className="Explore-main usa-grid">
            <div className="usa-width-one-third sticky">
              <SideNav {...routeProps} />
            </div>
            <div className="usa-width-two-thirds">
              <Route exact={true} path="/explore/:apiCategoryKey?" component={ApiPage} />
              <Route exact={true} path="/explore/:apiCategoryKey/docs/:apiName" component={Explore} />
            </div>
          </section>
        </div>
    );
}
