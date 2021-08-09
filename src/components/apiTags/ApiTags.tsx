import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Flag } from '../../flags';
import { FLAG_CONSUMER_DOCS } from '../../types/constants';
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
    <Flag name={[FLAG_CONSUMER_DOCS]}>{props.openData ? <OpenDataTag /> : null}</Flag>
  </>
);

ApiTags.propTypes = ApiTagsPropTypes;
export { ApiTags };
