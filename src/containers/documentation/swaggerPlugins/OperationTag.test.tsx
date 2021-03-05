/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { render, screen } from '@testing-library/react';
import 'jest';
import * as React from 'react';
import Im from 'immutable';
import { DeepLinkProps } from 'swagger-ui';
import OperationTag from './OperationTag';

const components = {
  Collapse: function Collapse(): JSX.Element {
    return (<div>Collapse</div>);
  },
  DeepLink: function DeepLink(props: DeepLinkProps): JSX.Element {
    return (<div>DeepLink {props.enabled.toString()}</div>);
  },
  Markdown: function Markdown(): JSX.Element {
    return (<div>Markdown</div>);
  },
};
describe('OperationTag', () => {
  it('renders successfully', () => {
    const tagObj = Im.fromJS({ tagDetails: { description: 'potato', name: 'document_uploads' } }) as Im.Map<string, unknown>;
    render(
      <OperationTag
        tagObj={tagObj}
        getComponent={(name: string): React.ComponentType => components[name] as React.ComponentType}
        getConfigs={jest.fn().mockReturnValue({ deepLinking: 'true', docExpansion: 'full' })}
        layoutActions={{ show: jest.fn() }}
        layoutSelectors={{ isShown: jest.fn() }}
      />
    );
    expect(screen.getByText('DeepLink true')).toBeInTheDocument();
  });

  it('header contains no-desc class without description', () => {
    const tagObj = Im.fromJS({ tagDetails: { name: 'document_uploads' } }) as Im.Map<string, unknown>;
    render(
      <OperationTag
        tagObj={tagObj}
        getComponent={(name: string): React.ComponentType => components[name] as React.ComponentType}
        getConfigs={jest.fn().mockReturnValue({ deepLinking: 'true', docExpansion: 'full' })}
        layoutActions={{ show: jest.fn() }}
        layoutSelectors={{ isShown: jest.fn() }}
      />
    );
    const header = screen.getByRole('heading', { name: 'DeepLink true' });
    expect(header.classList).toContain('no-desc');
  });
});
