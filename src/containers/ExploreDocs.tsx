import * as React from 'react';

import { RouteComponentProps } from 'react-router';
import { Link, NavLink, Route } from 'react-router-dom';

import { Markdown, PageHero } from '../components';
import { IApiNameParam } from '../types';
import Explore from './Explore';

import { benefitsOverview,
         healthOverview,
         verificationOverview } from '../content/apiDocs';

import './Explore.scss'

import tos from '../content/termsOfService.md';

interface IApiDescription {
    readonly name: string;
    readonly urlFragment: string;
    readonly shortDescription: string;
}

interface IApiCategory {
    readonly apis: IApiDescription[];
    readonly buttonText: string;
    readonly name: string;
    readonly overview: string;
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
            },
            {
                name: 'Appeals Status',
                shortDescription: 'Track appeals',
                urlFragment: 'appeals',
            },
        ],
        buttonText: "Get Your Key",
        name: 'Benefits',
        overview: benefitsOverview,
        shortDescription: 'Enables approved organizations to submit benefits-related PDFs and access information on a Veteran’s behalf.',
    },
    facilities: {
        apis: [
            {
                name: 'VA Facilities API',
                shortDescription: "VA Facilities",
                urlFragment: 'facilities'
            },
        ],
        buttonText: "Get Your Key",
        name: 'Facilities',
        overview: '',
        shortDescription: "Use the VA Facility API to find relevant information about a specific VA facility. For each VA facility, you'll find contact information, location, hours of operation and available services. For medical facilities only, we provide data on appointment wait times and patient satisfaction."
    },
    health: {
        apis: [
            {
                name: 'Veterans Health API',
                shortDescription: "VA's Argonaut resources",
                urlFragment: 'argonaut'
            },
        ],
        buttonText: "Get Your Key",
        name: 'Health',
        overview: healthOverview,
        shortDescription: "Use our APIs to build tools that help Veterans manage their health, view their medical records, schedule an appointment, find a specialty facility, and share their information with caregivers and providers."
    },
    verification: {
        apis: [],
        buttonText: "Stay Informed",
        name: "Veteran Verification",
        overview: verificationOverview,
        shortDescription: "Coming soon! Empowering Veterans to take control of their data and put it to work.",
    },
};

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

function ApiSection({ apiCategory, sectionRef } : { apiCategory : string, sectionRef? : React.RefObject<HTMLElement> } ) {
    const { apis, name: categoryName, overview, shortDescription: introText } = apiDefs[apiCategory];
    let linkSection;

    if (apis.length > 0) {
        const links = apis.map(({ name, shortDescription, urlFragment }, idx) => {
            return (
                <div key={idx} className="usa-width-one-half api-link">
                  <Link to={`/explore/${apiCategory}/docs/${urlFragment}`}>
                    <span>{name}</span>
                    <p>{shortDescription}</p>
                  </Link>
                </div>
            );
        });
        linkSection = (
            <div role="navigation" aria-labelledby={`${apiCategory}-overview-apis`} className="usa-grid">
              <h2 id={`${apiCategory}-overview-apis`}>Available {categoryName} APIs</h2>
              {links}
            </div>
        );
    }

    return (
        <section role="region" aria-labelledby={`${apiCategory}-overview`} className="usa-section" ref={sectionRef}>
          <div>
            <div className="usa-grid">
              <h1 id={`${apiCategory}-overview`}>{categoryName}</h1>
              <p>{introText}</p>
            </div>
          </div>
          {linkSection}
          <div>
            <div className="usa-grid">
              <div className="usa-width-one-whole">
                <Markdown ariaLabelledby="overview" content={overview} />
              </div>
            </div>
          </div>
          <hr />
        </section>
    );
}

class ApiPage extends React.Component<RouteComponentProps<IApiNameParam>, {scrolling: number, timeout?: number}> {
    private sectionRefs : { [key: string]: React.RefObject<HTMLElement> } = {}

    public componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        this.scrollFocusSection();
    }

    public componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    public componentDidUpdate(prevProps : RouteComponentProps<IApiNameParam>) {
        const { match: { params: { apiCategory } } } = this.props;
        const { match: { params: { apiCategory: prevCategory } } } = prevProps;
        if (apiCategory !== prevCategory && (!this.state || !this.state.scrolling)) {
            this.scrollFocusSection();
        }
    }

    public render() {
        const sections = Object.keys(apiDefs).map((apiCategory, index) => {
            this.sectionRefs[apiCategory] = React.createRef();
            return (
                <ApiSection
                    sectionRef={this.sectionRefs[apiCategory]}
                    apiCategory={apiCategory}
                    key={index} />
            );
        });
        this.sectionRefs['terms-of-service'] = React.createRef();
        return (
            <div>
              {sections}
              <section className="usa-section" ref={this.sectionRefs['terms-of-service']}>
                <div className="usa-grid">
                  <Markdown content={tos} />
                </div>
              </section>
            </div>
        );
    }

    private scrollFocusSection() {
        const { match: { params: { apiCategory } } } = this.props;
        const section = this.sectionRefs[apiCategory];

        if (section && section.current) {
            section.current.focus();
            section.current.scrollIntoView();
        }
    }

    private handleScroll = () => {
        let direction : string | undefined;
        const { scrollY } = window;

        if (this.state && this.state.timeout && this.state.scrolling > scrollY) {
            direction = 'up';
        } else if (this.state && this.state.timeout &&  this.state.scrolling < scrollY) {
            direction = 'down';
        }

        if (this.state && this.state.timeout) {
            window.clearTimeout(this.state.timeout)
        }
        const timeout = window.setTimeout(() => {
            this.setState({scrolling: 0, timeout: undefined})
        }, 400)
        this.setState({scrolling: scrollY, timeout})

        if (window.scrollY !== 0 && direction) {
            const topSectionKey = Object.keys(this.sectionRefs).sort((sectionKeyLeft, sectionKeyRight) => {
                const left = this.sectionRefs[sectionKeyLeft];
                const right = this.sectionRefs[sectionKeyRight];

                if (left.current !== null && right.current !== null) {
                    const { top: leftTop } = left.current.getBoundingClientRect();
                    const { top: rightTop } = right.current.getBoundingClientRect();
                    if (leftTop > rightTop) {
                        return direction && direction === 'down' ? 1 : -1;
                    } else if (leftTop === rightTop) {
                        return 0;
                    } else {
                        return direction && direction === 'down' ? -1 : 1;
                    }
                } else if (left.current === null) {
                    return direction && direction === 'down' ? -1 : 1;
                } else {
                    return direction && direction === 'down' ? 1 : -1;
                }
            }).filter((sectionKey) => {
                const section = this.sectionRefs[sectionKey]
                if (section.current) {
                    const { top, bottom } = section.current.getBoundingClientRect();
                    if (direction && direction === 'down') {
                        return top >= 0 && top <= window.innerHeight;
                    } else if (direction && direction === 'up') {
                        return bottom >= 0 && bottom <= window.innerHeight;
                    }
                    return true
                }
                return false;
            })[0];
            if (topSectionKey) {
                const path = (`/explore/${topSectionKey}`);
                const { history, location: { pathname } } = this.props;
                if (pathname !== path) {
                    history.push(path);
                }
            }
        }
    }
}

export function SideNav({ match: { url } } : RouteComponentProps<IApiNameParam>) {
    const navLinks = Object.keys(apiDefs).map((apiCategory, idx) => {
        const { name: apiTitle, apis } = apiDefs[apiCategory];

        const subNavLinks = apis.map(({ name, shortDescription, urlFragment }, subIdx) => {
            return (
                <li key={subIdx}>
                  <NavLink exact={true} to={`/explore/${apiCategory}/docs/${urlFragment}`} activeClassName="usa-current">
                    {name}
                  </NavLink>
                </li>
            );
        });
        const topLinkPath = `/explore/${apiCategory}`;
        const className = (subNavLinks.length > 0 ? "expand" : "") + " " + (url === topLinkPath ? "usa-current" : "")
        return (
            <li key={idx}>
              <NavLink exact={true} to={topLinkPath} className={className}>
                {apiTitle}
              </NavLink>
              <ul className="usa-sidenav-sub_list">
                {subNavLinks}
              </ul>
            </li>
        );
    });

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
          <Route exact={true} path="/explore/:apiCategory?" component={ApiPageHero} />
          <section className="Explore-main usa-grid">
            <div className="usa-width-one-third sticky">
              <SideNav {...routeProps} />
            </div>
            <div className="usa-width-two-thirds">
              <Route exact={true} path="/explore/:apiCategory?" component={ApiPage} />
              <Route exact={true} path="/explore/:apiCategory/docs/:apiName" component={Explore} />
            </div>
          </section>
        </div>
    );
}
