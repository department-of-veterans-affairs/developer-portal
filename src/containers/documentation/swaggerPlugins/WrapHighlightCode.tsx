import * as React from 'react';

export const WrapHighlightCode = {
  highlightCode: (Original: any, system: any) => (props: any) => {
    return (
      <div>
        <span className="sr-only">
          Ensure your screenreader verbosity is set to high for code snippets
        </span>
        <Original {...props} />
      </div>
    );
  },
};
