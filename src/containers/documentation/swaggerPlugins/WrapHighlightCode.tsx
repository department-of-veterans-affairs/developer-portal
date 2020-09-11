import * as React from 'react';
import CodeWrapper from '../../../components/CodeWrapper';

export const WrapHighlightCode = {
  highlightCode: (Original: any, system: any) => (props: any) => {
    return (
      <CodeWrapper>
        <Original {...props} />
      </CodeWrapper>
    );
  },
};
