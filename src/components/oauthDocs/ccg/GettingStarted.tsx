import * as React from 'react';
import { Link } from 'react-router-dom';
import { SectionHeaderWrapper } from '../../index';
import { ApiRequiredProps } from '../../../containers/documentation/DocumentationRoot';
import { PublicKeySteps } from './PublicKeySteps';

const GettingStarted = (props: ApiRequiredProps): JSX.Element => (
  <>
    <SectionHeaderWrapper heading="Getting Started" id="getting-started" />
    <h3>Generating Public RSA Key and Converting to JWK Format</h3>
    <PublicKeySteps />
    <p>
      Next, get sandbox access. On the{' '}
      <Link to={`/explore/api/${props.api.urlSlug}/sandbox-access`}>access form</Link>, provide your
      public RSA key in JWK format. After you submit the form, we will send your client ID in an
      email.
    </p>
  </>
);

GettingStarted.propTypes = {};

export { GettingStarted };
