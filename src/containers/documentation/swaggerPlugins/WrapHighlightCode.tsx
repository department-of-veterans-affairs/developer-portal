import * as React from 'react';
import CodeWrapper from '../../../components/CodeWrapper';

export const WrapHighlightCode = {
  highlightCode: (Original: React.ComponentType): React.ComponentType => {
    const HighlightCode = (props: Record<string, unknown>) => (
      <CodeWrapper>
        <Original {...props} />
      </CodeWrapper>
    );

    return HighlightCode;
  },
};
