import React from 'react';
import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
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
 * @param language - The language to be used for syntax highlighting
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
    <div className="code-block">
      <CodeWrapper>
        <ReactMarkdown
          components={{
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            code: ({ className, children, node, ...codeProps }): JSX.Element => (
              <SyntaxHighlighter
                className={className}
                language={language}
                showLineNumbers
                useInlineStyles={false}
                tabIndex={0}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ),
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            pre: ({ children, node, ...preProps }): JSX.Element => (
              // eslint-disable-next-line react/jsx-no-useless-fragment
              <>{children}</>
            ),
          }}
        >
          {codeMarkdown}
        </ReactMarkdown>
      </CodeWrapper>

      {withCopyButton ? (
        <div className="vads-u-text-align--center small-screen:vads-u-text-align--left copy-btn-container">
          <Tooltip label="Code copied to clipboard!" placement="bottom">
            <button
              type="button"
              className="va-api-button-default vads-u-border--1px vads-u-border-color--primary vads-u-width--auto"
              onClick={async (): Promise<void> => {
                await navigator.clipboard.writeText(code);
              }}
            >
              Copy code to clipboard
            </button>
          </Tooltip>
        </div>
      ) : null}
    </div>
  );
};

export { CodeBlock };
