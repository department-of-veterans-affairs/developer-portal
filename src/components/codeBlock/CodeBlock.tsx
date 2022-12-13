import React from 'react';
import ReactMarkdown from 'react-markdown';
import highlight from 'rehype-highlight';
import classNames from 'classnames';
import { Tooltip } from '../index';

import './CodeBlock.scss';
import { CodeWrapper } from './CodeWrapper';

interface CodeBlockProps {
  code: string;
  language?: string;
  withCopyButton?: boolean;
}

/**
 * Displays a code block with optional copy to clipboard button
 * @param code - The code to be displayed
 * @param language - The language of the code
 * @param withCopyButton - Whether or not to display a copy to clipboard button
 * @returns The code block component
 */
const CodeBlock = ({
  code,
  language = 'plaintext',
  withCopyButton = false,
}: CodeBlockProps): JSX.Element => {
  const codeMarkdown = `\`\`\`${language}\n${code}\n\`\`\``;

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex

    <CodeWrapper>
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

      {withCopyButton ? (
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
    </CodeWrapper>
  );
};

export { CodeBlock };
