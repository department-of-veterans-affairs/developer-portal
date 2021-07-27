import * as PropTypes from 'prop-types';
import * as React from 'react';
import TrustedPartnerOnlyTag from './TrustedPartnerOnlyTag';
import VAInternalOnlyTag from './VAInternalOnlyTag';
import OpenDataTag from './OpenDataTag';

const OnlyTagsPropTypes = {
  openData: PropTypes.bool.isRequired,
  trustedPartnerOnly: PropTypes.bool.isRequired,
  vaInternalOnly: PropTypes.bool.isRequired,
};

type OnlyTagsProps = PropTypes.InferProps<typeof OnlyTagsPropTypes>;
const OnlyTags: React.FunctionComponent<OnlyTagsProps> = (props: OnlyTagsProps): JSX.Element => (
  <>
    {props.vaInternalOnly ? <VAInternalOnlyTag /> : null}
    {props.trustedPartnerOnly ? <TrustedPartnerOnlyTag /> : null}
    {props.openData ? <OpenDataTag /> : null}
  </>
);

OnlyTags.propTypes = OnlyTagsPropTypes;
export { OnlyTags };
