import * as React from 'react';
import { lookupApiCategory } from '../../apiDefs';
import { IApiDescription } from '../../apiDefs/schema';
import PageHeader from '../../components/PageHeader';

interface IDeprecatedApiProps {
  apiDefinition: IApiDescription;
  categoryKey: string;
}

export default class DeprecatedApi extends React.Component<IDeprecatedApiProps> {
  public render() {
    const {
      apiDefinition,
      categoryKey,
    } = this.props;
    const category = lookupApiCategory(categoryKey);

    return (
      <div role="region" aria-labelledby="api-documentation">
        <PageHeader id="api-documentation" halo={category!.name} header={apiDefinition.name} />
        {apiDefinition.deprecationContent &&
          <div className="usa-alert usa-alert-info">
            <div className="usa-alert-body">
              {apiDefinition.deprecationContent({})}
            </div>
          </div>
        }
      </div>
    );
  }
}