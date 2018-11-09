import * as React from 'react';

import { Link } from 'react-router-dom';

interface IPageHeroProps {
    button?: string;
    buttonLink?: string;
    content: string;
    linkDirect?: boolean;
    secondaryButton?: string;
    secondaryButtonLink?: string;
    secondaryLinkDirect?: boolean;
    title: string;
}

export function PageHero({ button,
                           buttonLink,
                           content,
                           linkDirect = false,
                           secondaryButton,
                           secondaryButtonLink,
                           secondaryLinkDirect = false,
                           title } : IPageHeroProps) {
    let  buttonEl;
    let second;
    if (secondaryButton) {
        if (secondaryLinkDirect) {
            second = (
                <a href={secondaryButtonLink || '/'} className="usa-button">
                  {secondaryButton}
                </a>
            );
        } else {
            second = (
                <Link to={secondaryButtonLink || '/'} className="usa-button">
                  {secondaryButton}
                </Link>
            );
        }
    }
    if (linkDirect) {
        buttonEl = (
            <a href={buttonLink || '/'} className="usa-button">
            {button}
                </a>
        );
    } else if (buttonLink) {
        buttonEl = (
            <Link to={buttonLink || '/'} className="usa-button">
              {button}
            </Link>
        );
    }
    return (
        <section role="region" aria-label="Page Hero" className="usa-hero">
          <div className="usa-grid">
            <div className="usa-hero-callout">
              <h1 className="usa-sans">{title}</h1>
              <p>{content}</p>
              <p>
                {buttonEl}
                {second}
              </p>
            </div>
          </div>
        </section>
    );
}
