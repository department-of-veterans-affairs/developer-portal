import * as React from 'react';

import TrustedPartnerOnlyTag from './TrustedPartnerOnlyTag';
import VAInternalOnlyTag from './VAInternalOnlyTag';

const OnlyTags = ({vaInternalOnly, trustedPartnerOnly}:{vaInternalOnly: boolean, trustedPartnerOnly: boolean}) : JSX.Element => <>
  {vaInternalOnly ? <VAInternalOnlyTag /> : null}
  {trustedPartnerOnly ? <TrustedPartnerOnlyTag /> : null}
</>;

export default OnlyTags;
