import * as React from 'react';

import './Markdown.scss';

export default function Markdown({ content, ariaLabelledby } : { content: string, ariaLabelledby?: string }) {
    return (
        <div role="region" aria-labelledby={ariaLabelledby} className="Markdown" dangerouslySetInnerHTML={{ __html: content }} />
    )
}
