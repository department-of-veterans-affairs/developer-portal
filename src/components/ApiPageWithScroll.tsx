import * as React from 'react';

import { Flag } from 'flag';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import scrollIntoView from 'scroll-into-view-if-needed';

import { apiCategoryOrder, apiDefs, IApiDescription } from '../apiDefs';
import { IApiNameParam } from '../types';

function ApiSection({ apiCategoryKey, sectionRef } : { apiCategoryKey : string, sectionRef? : React.RefObject<HTMLElement> } ) {
    const { apis, name: categoryName, overview, longDescription: introText } = apiDefs[apiCategoryKey];
    let linkSection;

    if (apis.length > 0) {
        const links = apis.map((apiDesc: IApiDescription, idx) => {
            const { description, name, urlFragment, vaInternalOnly } = apiDesc;
            return (
                <Flag key={idx} name={`hosted_apis.${urlFragment}`}>
                    <div key={idx} className="api-link">
                      <Link to={`/explore/${apiCategoryKey}/docs/${urlFragment}`}>
                        <span>{name}</span>
                        {(vaInternalOnly === true) ? <p className="api-name-tag">Internal VA use only.</p> : null}
                        <p>{description}</p>
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

export class ApiPage extends React.Component<RouteComponentProps<IApiNameParam>, {}> {
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
        return (
            <div>
              {sections}
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

