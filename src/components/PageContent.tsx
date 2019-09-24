import * as React from 'react';

import { RouteComponentProps } from 'react-router';

interface IPageContentProps extends RouteComponentProps<void> {
    children: JSX.Element[] | JSX.Element;
}

export default class PageContent extends React.Component<IPageContentProps, {}> {
    private loader: HTMLDivElement | null;

    public componentDidUpdate(prevProps: IPageContentProps) {
        const { location } = this.props;
        if (prevProps.location.pathname === location.pathname && location.hash) {
          return;
        }
        if (!location.pathname.match(/^\/explore\/[a-z\-]+\/?$/)) {
            if (this.loader) {
                this.loader.focus();
            }
            window.scrollTo(0,0);
        }
    }

    public render() {
        return (
            <div className="content-main" ref={(loader) => (this.loader = loader)} tabIndex={-1}>
              {this.props.children}
            </div>
        );
    }
}
