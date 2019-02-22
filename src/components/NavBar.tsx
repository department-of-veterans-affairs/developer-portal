import * as React from 'react';
import { Link } from 'react-router-dom';

import './NavBar.scss';

import closeButton from "../assets/close-white.svg";

import { faHome } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Banner } from './Banner';
import { Search } from './Search';

interface INavBarProps {
  hideLinks: boolean;
}

interface INavBarState {
  menuVisible: boolean;
}

export class NavBar extends React.Component<INavBarProps, INavBarState> {
  constructor(props: INavBarProps) {
    super(props);
    this.state = { menuVisible: false }
  }

  public render() {
    let apply;
    let search;

    if (process.env.REACT_APP_SALESFORCE_APPLY === 'true') {
      apply = (
        <a className="usa-button" href="https://vacommunity.secure.force.com/survey/ExAM__AMAndAnswerCreationPage?paId=a2ft0000000VVnJ">
          Sign Up
        </a>
      );
    } else {
      apply = (
        <Link to="/apply" className="usa-button">Get Started</Link>
      );
    }

    if (process.env.REACT_APP_SEARCH_ENABLED === 'true') {
      search = (
        <Search />
      );
    }
    return (
      <header className="usa-header usa-header-extended" role="banner">
        <Banner />
        <div className="usa-navbar">
          <div className="usa-logo" id="extended-logo">
            <em className="usa-logo-text"><Link to="/" title="Digital VA home page">
              <strong>VA Digital</strong> | API Platform Management</Link>
            </em>
          </div>
          <button className="usa-menu-btn" onClick={this.toggleVisible}>Menu</button>
        </div>
        <nav className={this.setNavClass()} role="navigation">
          <div className="usa-nav-inner">
            <button className="usa-nav-close" onClick={this.toggleVisible}>
              <img src={closeButton} />
            </button>
            <ul className="usa-nav-primary usa-accordion">
              <li>
                <Link to="/" className="usa-nav-link">
                  <FontAwesomeIcon icon={faHome} />
                  Home
                </Link>
              </li>
              <li>
                <Link to="/explore" className="usa-nav-link">Documentation</Link>
              </li>
              <li>
                <Link to="/explore/benefits" className="usa-nav-link">Benefits</Link>
              </li>
              <li>
                <Link to="/explore/facilities" className="usa-nav-link">Facilities</Link>
              </li>
              <li>
                <Link to="/explore/health" className="usa-nav-link">Health</Link>
              </li>
              <li>
                <Link to="/oauth" className="usa-nav-link">OAuth</Link>
              </li>
              <li>
                <Link to="/explore/verification" className="usa-nav-link">Verification</Link>
              </li>
            </ul>
            <div className="usa-nav-secondary">
              <ul className="usa-unstyled-list">
                <li>
                  {apply}
                </li>
                <li >
                  {search}
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    );
  }

  private toggleVisible = () => {
    this.setState({ menuVisible: !this.state.menuVisible });
  };

  private setNavClass = () => {
    if (this.props.hideLinks) {
      return 'is-hidden';
    } else {
      return this.state.menuVisible ? "is-visible usa-nav" : "usa-nav"
    }
  }
}
