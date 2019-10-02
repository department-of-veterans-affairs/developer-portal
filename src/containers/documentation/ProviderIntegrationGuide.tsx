import * as React from 'react';
import IntegrationGuide from '../../content/providers/integrationGuide.mdx';

export default function ProviderIntegrationGuide() {
  console.log(IntegrationGuide);
  return (
      <section className="usa-section">
        <div className="usa-grid">
          <IntegrationGuide />
        </div>
      </section>
    );
}

