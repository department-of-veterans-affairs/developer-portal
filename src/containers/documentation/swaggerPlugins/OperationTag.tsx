import PropTypes from 'prop-types';
import React from 'react';
import ImPropTypes from 'react-immutable-proptypes';
import Im from 'immutable';
import { CollapseProps, DeepLinkProps, MarkdownProps } from 'swagger-ui';
import { sanitizeUrl } from '@braintree/sanitize-url';

interface ExternalDocsProps {
  url?: string;
  description?: string;
}

const ExternalDocs: React.FunctionComponent<ExternalDocsProps> = (props: ExternalDocsProps) => (
  <div>
    {props.description ? (
      <small>
        {props.description}
        {props.url ? ': ' : null}
        {props.url ? (
          <a
            href={sanitizeUrl(props.url)}
            onClick={(e): void => e.stopPropagation()}
            target="_blank"
            rel="noreferrer"
          >
            {props.url}
          </a>
        ) : null}
      </small>
    ) : null}
  </div>
);

const createDeepLinkPath = (str: string | unknown): string =>
  (typeof str === 'string' || str instanceof String ? str.trim().replace(/\s/g, '_') : '');

interface OperationTagProps {
  tag: string;
  tagObj: Im.Map<string, unknown>;
  getComponent: (componentName: string) => React.ComponentType;
  getConfigs: () => {
    deepLinking: string;
    docExpansion: string;
  };

  layoutActions: {
    show: (key: string[], shown: boolean) => void;
  };
  layoutSelectors: {
    isShown: (key: string[], defaultVal: boolean) => boolean;
  };
}

export default class OperationTag extends React.Component<OperationTagProps> {
  public static defaultProps: Pick<OperationTagProps, 'tag' | 'tagObj'> = {
    tag: '',
    tagObj: Im.fromJS({}) as Im.Map<string, unknown>,
  };

  public static propTypes = {
    getComponent: PropTypes.func.isRequired,
    getConfigs: PropTypes.func.isRequired,

    layoutActions: PropTypes.object.isRequired,
    layoutSelectors: PropTypes.object.isRequired,

    tag: PropTypes.string.isRequired,
    tagObj: ImPropTypes.map.isRequired,
  };

  public render(): JSX.Element {
    const {
      children,
      getConfigs,
      getComponent,
      layoutSelectors,
      layoutActions,
      tag,
      tagObj,
    } = this.props;

    const { deepLinking, docExpansion } = getConfigs();

    const isDeepLinkingEnabled = (deepLinking && deepLinking !== 'false') || false;

    const Collapse = getComponent('Collapse') as React.ComponentType<CollapseProps>;
    const Markdown = getComponent('Markdown') as React.ComponentType<MarkdownProps>;
    const DeepLink = getComponent('DeepLink') as React.ComponentType<DeepLinkProps>;

    const tagDescription = tagObj.getIn(['tagDetails', 'description'], null) as string | undefined;
    const tagExternalDocsDescription = tagObj.getIn([
      'tagDetails',
      'externalDocs',
      'description',
    ]) as string | undefined;
    const tagExternalDocsUrl = tagObj.getIn(['tagDetails', 'externalDocs', 'url']) as
      | string
      | undefined;

    const isShownKey = ['operations-tag', createDeepLinkPath(tag)];
    const showTag = layoutSelectors.isShown(
      isShownKey,
      docExpansion === 'full' || docExpansion === 'list',
    );

    return (
      <div className={showTag ? 'opblock-tag-section is-open' : 'opblock-tag-section'}>
        <h3
          onClick={(): void => layoutActions.show(isShownKey, !showTag)}
          className={tagDescription ? 'opblock-tag' : 'opblock-tag no-desc'}
          id={isShownKey.join('-')}
        >
          <DeepLink enabled={isDeepLinkingEnabled} isShown={showTag} path={tag} text={tag} />
          {tagDescription ? (
            <small>
              <Markdown source={tagDescription} />
            </small>
          ) : (
            <small/>
          )}

          <ExternalDocs description={tagExternalDocsDescription} url={tagExternalDocsUrl} />
          <button
            className="expand-operation"
            title={showTag ? 'Collapse operation' : 'Expand operation'}
            onClick={(): void => layoutActions.show(isShownKey, !showTag)}
          >
            <svg className="arrow" width="20" height="20">
              <use
                href={showTag ? '#large-arrow-down' : '#large-arrow'}
                xlinkHref={showTag ? '#large-arrow-down' : '#large-arrow'}
              />
            </svg>
          </button>
        </h3>

        <Collapse isOpened={showTag}>{children}</Collapse>
      </div>
    );
  }
}
