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

