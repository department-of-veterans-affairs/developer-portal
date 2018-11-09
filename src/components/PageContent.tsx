import * as React from 'react';

import { RouteComponentProps } from 'react-router'

interface IPageContentProps extends RouteComponentProps<void> {
    children: JSX.Element[];
}

export class PageContent extends React.Component<IPageContentProps, {}> {
    private loader: HTMLDivElement | null;

    public componentDidUpdate() {
        const { location } = this.props;
        if (!location.pathname.match(/^\/explore\/[a-z\-]+\/?$/)) {
            if (this.loader) {
                this.loader.focus();
            }
            window.scrollTo(0,0);
        }
    }

    public render() {
        return (
            <div className="PageContent">
              <div className="content-main" ref={(loader) => (this.loader = loader)} tabIndex={-1}>
                {this.props.children}
              </div>
            </div>
        );
    }
}
