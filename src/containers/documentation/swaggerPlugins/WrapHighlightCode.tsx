import * as React from 'react';
import { CodeBlock } from '../../../components';

export const WrapHighlightCode = {
  highlightCode: (): React.ComponentType => {
    const HighlightCode = (props: Record<string, string>): JSX.Element => (
      <CodeBlock language={props.language} code={props.value} />
    );

    return HighlightCode;
  },
};
