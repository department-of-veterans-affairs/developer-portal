import * as React from 'react';
import { IApiDescription } from '../../apiDefs/schema';

interface IDeprecatedApiProps {
  apiDefinition: IApiDescription;
}

export default class DeprecatedApi extends React.Component<IDeprecatedApiProps> {
  public render() {
    return null;
  }
}