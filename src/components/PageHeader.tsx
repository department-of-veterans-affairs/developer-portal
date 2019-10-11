import classNames from 'classnames';
import * as React from 'react';

import './PageHeader.scss';

interface IPageHeaderProps {
  className?: string;
  description?: string;
  halo?: string;
  header: string;
  id?: string;
}

export default class PageHeader extends React.Component<IPageHeaderProps, {}> {
  public render() { 
    return (
      <div className={classNames('va-api-page-header', this.props.className)}>
        {this.props.halo &&
          <div className="header-halo">
            {this.props.halo}
          </div>
        }
        <h1 id={this.props.id}>
          {this.props.header}
        </h1>
        {this.props.description &&
          <h2>
            {this.props.description}
          </h2>
        }
      </div>
    );
  }
}