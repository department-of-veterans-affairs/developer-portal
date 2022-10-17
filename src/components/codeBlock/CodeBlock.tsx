import React from 'react';
import ReactMarkdown from 'react-markdown';
import highlight from 'rehype-highlight';
import classNames from 'classnames';

import { Tooltip } from '../index';

import './CodeBlock.scss';

interface CodeBlockProps {
  code: string;
  language?: string;
  withCopy?: boolean;
}

const CodeBlock = ({
  code,
  language = 'plaintext',
  withCopy = false,
}: CodeBlockProps): JSX.Element => {
  const codeMarkdown = `\`\`\`${language}\n${code}\n\`\`\``;

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
    <div className="code-wrapper" tabIndex={0}>
      <span className="sr-only">
        Ensure your screenreader verbosity is set to high for code snippets.
      </span>

      <ReactMarkdown
        rehypePlugins={[highlight]}
        components={{
          code: ({ className, children, ...codeProps }): JSX.Element => (
            <code className={classNames('fit-content', className)} {...codeProps}>
              {children}
            </code>
          ),
        }}
      >
        {codeMarkdown}
      </ReactMarkdown>

      {withCopy ? (
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
      ) : null}
    </div>
  );
};

export { CodeBlock };
