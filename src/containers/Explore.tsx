import * as React from 'react';

import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ThunkDispatch } from 'redux-thunk';

import * as actions from '../actions'
import { Markdown, SwaggerDocs } from '../components';
import explorePage from '../content/explorePage.md';
import { IApiNameParam, IExternalSwagger, IRootState } from '../types';

export interface IExploreProps extends RouteComponentProps<IApiNameParam> {
    argonaut: IExternalSwagger;
    fetchArgonaut: () => void;
}

const mapStateToProps = ({ explore: { argonaut }, routing }: IRootState) => {
    return {
        argonaut,
        ...routing,
    };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<IRootState, undefined, actions.FetchArgonautAction>) => {
    return {
        fetchArgonaut: () => { dispatch(actions.fetchArgonaut()) },
    };
};

class Explore extends React.Component<IExploreProps, { }> {
    public render() {
        let docs : JSX.Element ;
        switch (this.props.match.params.apiName) {
            case 'service_history':
                docs = (
                    <SwaggerDocs url={`${process.env.REACT_APP_VETSGOV_SWAGGER_API}/services/veteran_verification/docs/v0/service_history`} />
                );
                break;
            case 'disability_rating':
                docs = (
                    <SwaggerDocs url={`${process.env.REACT_APP_VETSGOV_SWAGGER_API}/services/veteran_verification/docs/v0/disability_rating`} />
                );
                break;
            case 'benefits':
                docs = (
                    <SwaggerDocs url={`${process.env.REACT_APP_VETSGOV_SWAGGER_API}/services/vba_documents/docs/v0/api`} />
                );
                break;
            case 'facilities':
                docs = (
                    <SwaggerDocs url={`${process.env.REACT_APP_VETSGOV_SWAGGER_API}/services/va_facilities/docs/v0/api`} />
                );
                break;
            case 'appeals':
                docs = (
                    <SwaggerDocs url={`${process.env.REACT_APP_VETSGOV_SWAGGER_API}/services/appeals/docs/v0/api`} />
                );
                break;
            case 'address_validation':
                docs = (
                    <SwaggerDocs url={`${process.env.REACT_APP_VETSGOV_SWAGGER_API}/services/address_validation/docs/v0/api`} />
                );
                break;
            case 'argonaut':
                if (this.props.argonaut.fetched) {
                    docs = (
                        <SwaggerDocs json={this.props.argonaut.swagger} />
                    );
                } else {
                    docs = (
                        <div>Loading...</div>
                    );
                }
                break;
            default:
                docs = this.renderIndex();
        }
        return (
            <div role="region" aria-labelledby="api-documentation">
              <h1 id="api-documentation">API Documentation</h1>
              {docs}
            </div>
        );
    }

    public componentDidMount() {
        if (this.props.match.params.apiName === 'argonaut' && !this.props.argonaut.fetched && !this.props.argonaut.loading) {
            this.props.fetchArgonaut();
        }
    }

    public componentDidUpdate() {
        if (this.props.match.params.apiName === 'argonaut' && !this.props.argonaut.fetched && !this.props.argonaut.loading) {
            this.props.fetchArgonaut();
        }
    }

    private renderIndex() {
        return (
            <Markdown content={explorePage} />
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Explore);
