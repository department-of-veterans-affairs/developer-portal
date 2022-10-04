import React from 'react';
import ReactMarkdown from 'react-markdown';
import highlight from 'rehype-highlight';
import classNames from 'classnames';

import { CodeWrapper } from '../codeWrapper/CodeWrapper';
import Tooltip from '../tooltip/Tooltip';

import './CodeSample.scss';

interface CodeSampleProps {
  code: string;
  language?: string;
}

export const CodeSample = ({ code, language = 'plaintext' }: CodeSampleProps): JSX.Element => {
  const codeMarkdown = `\`\`\`${language}\n${code}\n\`\`\``;

  return (
    <CodeWrapper>
      <ReactMarkdown
        rehypePlugins={[highlight]}
        components={{
          // eslint-disable-next-line react/display-name
          code: ({ className, children, ...codeProps }): JSX.Element => (
            <code className={classNames('fit-content', className)} {...codeProps}>
              {children}
            </code>
          ),
        }}
      >
        {codeMarkdown}
      </ReactMarkdown>

      <Tooltip label="Code copied to clipboard!" placement="bottom">
        <button
          type="button"
          className="va-api-button-default vads-u-border--1px vads-u-border-color--primary vads-u-margin--2"
          onClick={async (): Promise<void> => {
            await navigator.clipboard.writeText(code);
          }}
        >
          Copy code to clipboard
        </button>
      </Tooltip>
    </CodeWrapper>
  );
};
