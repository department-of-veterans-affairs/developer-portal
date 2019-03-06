import * as React from 'react';
import { Link } from 'react-router-dom';

import './ApiCard.scss';

export interface IApiCardProps {
  name: string;
  description: string;
  vaInternalOnly: boolean;
  url: string;
}

export class ApiCard extends React.Component<IApiCardProps, {}> {
  protected static defaultProps = {
    vaInternalOnly: false,
  };

  public render() {
    return (
      <Link to={this.props.url} className="va-api-card">
        <h3 className="va-api-name">
          {this.props.name}
        </h3>
        {this.props.vaInternalOnly &&
          <div className="va-internal-tag">
            <span>
              Internal VA use only
            </span>
          </div>
        }
        <div className="va-api-description">
          {this.props.description}
        </div>
      </Link>
    );
  }
}

export default ApiCard;
