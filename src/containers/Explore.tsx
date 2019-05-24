import * as React from 'react';

import { Flag } from 'flag';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';

import { lookupApiByFragment } from '../apiDefs';
import { SwaggerDocs } from '../components';
import ExplorePage from '../content/explorePage.mdx';
import { IApiNameParam, IExternalSwagger, IRootState } from '../types';

export interface IExploreProps extends RouteComponentProps<IApiNameParam> {
    argonaut: IExternalSwagger;
    fetchArgonaut: () => void;
}

const mapStateToProps = ({ routing }: IRootState) => {
    return {
        ...routing,
    };
};

class Explore extends React.Component<IExploreProps, { }> {
    public render() {
      let docsDom: JSX.Element | null = null;
      if (this.props.match.params.apiName != null) {
        const api = lookupApiByFragment(this.props.match.params.apiName);
        if (api != null) {
          docsDom = (
                <Flag name={`hosted_apis.${api.urlFragment}`}>
                  <SwaggerDocs url={api.openApiDocUrl} />
                </Flag>
              );
        }
      }

      if (docsDom == null) {
        docsDom = this.renderIndex();
      }
      return (
          <div role="region" aria-labelledby="api-documentation">
            <h1 id="api-documentation">API Documentation</h1>
            {docsDom}
          </div>
        );
    }

    private renderIndex() {
        return (
            <ExplorePage />
        );
    }
}

export default connect(mapStateToProps)(Explore);
