import * as PropTypes from 'prop-types';
import * as React from 'react';
import TrustedPartnerOnlyTag from './TrustedPartnerOnlyTag';
import VAInternalOnlyTag from './VAInternalOnlyTag';
import OpenDataTag from './OpenDataTag';

const ApiTagsPropTypes = {
  openData: PropTypes.bool.isRequired,
  trustedPartnerOnly: PropTypes.bool.isRequired,
  vaInternalOnly: PropTypes.bool.isRequired,
};

type ApiTagsProps = PropTypes.InferProps<typeof ApiTagsPropTypes>;
const ApiTags: React.FunctionComponent<ApiTagsProps> = (props: ApiTagsProps): JSX.Element => (
  <>
    {props.vaInternalOnly ? <VAInternalOnlyTag /> : null}
    {props.trustedPartnerOnly ? <TrustedPartnerOnlyTag /> : null}
    {props.openData ? <OpenDataTag /> : null}
  </>
);

ApiTags.propTypes = ApiTagsPropTypes;
export { ApiTags };
