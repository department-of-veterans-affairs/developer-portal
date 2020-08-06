import * as React from 'react';

import classNames from 'classnames';
import { Flag } from 'flag';
import { RouteComponentProps } from 'react-router';

import { getApiDefinitions } from '../../apiDefs/query';
import { IApiDescription } from '../../apiDefs/schema';
import CardLink from '../../components/CardLink';
import OnlyTags from '../../components/OnlyTags';
import PageHeader from '../../components/PageHeader';
import { history } from '../../store';
import { defaultFlexContainer } from '../../styles/vadsUtils';
import { IApiNameParam } from '../../types';

const ApiReleaseNote = ({ api }: { api: IApiDescription }) => {
  const dashUrlFragment = api.urlFragment.replace('_', '-');
  return (
    <Flag name={`hosted_apis.${api.urlFragment}`}>
      <div id={dashUrlFragment}>
        <h2>{api.name}</h2>
        {api.releaseNotes({})}
        <hr />
      </div>
    </Flag>
  );
};

export default class CategoryReleaseNotesPage extends React.Component<
  RouteComponentProps<IApiNameParam>
> {
  public pageHeader: React.RefObject<HTMLDivElement>;

  constructor(props: RouteComponentProps<IApiNameParam>) {
    super(props);
    this.pageHeader = React.createRef();
  }
  public componentDidMount() {
    this.setPageFocus();
  }
  public componentDidUpdate() {
    this.setPageFocus();
  }

  public render() {
    const apiDefs = getApiDefinitions();
    const { apiCategoryKey } = this.props.match.params;
    const { apis } = apiDefs[apiCategoryKey];

    let cardSection;
    if (apis.length > 1) {
      const apiCards = apis.map((apiDesc: IApiDescription) => {
        const { description, name, urlFragment, vaInternalOnly, trustedPartnerOnly } = apiDesc;
        const dashUrlFragment = urlFragment.replace('_', '-');

        return (
          <Flag key={name} name={`hosted_apis.${urlFragment}`}>
            <CardLink
              name={name}
              subhead={
                vaInternalOnly || trustedPartnerOnly ? (
                  <OnlyTags {...{ vaInternalOnly, trustedPartnerOnly }} />
                ) : (
                  undefined
                )
              }
              url={`/release-notes/${apiCategoryKey}#${dashUrlFragment}`}
            >
              {description}
            </CardLink>
          </Flag>
        );
      });

      cardSection = (
        <div role="navigation" aria-labelledby={`${apiCategoryKey}-release-notes`}>
          <div className={defaultFlexContainer()}>{apiCards}</div>
        </div>
      );
    }

    return (
      <section role="region" aria-labelledby={`${apiCategoryKey}-release-notes`}>
        <PageHeader
          halo={apiDefs[apiCategoryKey].name}
          header="Release Notes"
          id={`${apiCategoryKey}-release-notes`}
          forwardedRef={this.pageHeader}
        />
        {cardSection}
        <div className={classNames('vads-u-width--full', 'vads-u-margin-top--4')}>
          {apis.map(api => (
            <ApiReleaseNote key={api.urlFragment} api={api} />
          ))}
        </div>
      </section>
    );
  }
  protected setPageFocus() {
    if (!history.location.hash) {
      const element = this.pageHeader!.current;
      setTimeout(() => {
        element!.focus();
      }, 0);
    }
  }
}
