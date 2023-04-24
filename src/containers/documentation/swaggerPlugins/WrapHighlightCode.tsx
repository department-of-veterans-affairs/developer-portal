/* eslint-disable no-console */
import * as React from 'react';
import { CodeBlock, CodeWrapper } from '../../../components';

export const WrapHighlightCode = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  highlightCode: (Original: React.ComponentType): React.ComponentType => {
    const HighlightCode = (props: Record<string, unknown>): JSX.Element => (
      <CodeWrapper>
        <CodeBlock withCopyButton code={props.value as string} language={props.language as string} />
      </CodeWrapper>
    );

    return HighlightCode;
  },
};
