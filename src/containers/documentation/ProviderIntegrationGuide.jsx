// This module cannot use TypeScript because the compiler does not have enough
// type information about the component returned by the markdown component
// loader to understand that it should accept the standard `className`
// attribute.
import * as React from 'react';
import IntegrationGuideContent from '../../content/providers/integrationGuide.mdx';

export default function ProviderIntegrationGuide() {
  return (
      <section className="usa-section">
        <div className="usa-grid">
          <IntegrationGuideContent className="markdown-wrapper" />
        </div>
      </section>
    );
}

