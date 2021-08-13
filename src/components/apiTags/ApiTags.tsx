import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Flag } from '../../flags';
import { FLAG_CONSUMER_DOCS } from '../../types/constants';
import ApiTag, { tagTypes } from './ApiTag';

const ApiTagsPropTypes = {
  openData: PropTypes.bool.isRequired,
  trustedPartnerOnly: PropTypes.bool.isRequired,
  vaInternalOnly: PropTypes.bool.isRequired,
};

type ApiTagsProps = PropTypes.InferProps<typeof ApiTagsPropTypes>;
const ApiTags: React.FunctionComponent<ApiTagsProps> = (props: ApiTagsProps): JSX.Element => (
  <>
    {props.vaInternalOnly && <ApiTag type={tagTypes.VAInternalOnly} /> }
    {props.trustedPartnerOnly && <ApiTag type={tagTypes.TrustedPartner} />}
    <Flag name={[FLAG_CONSUMER_DOCS]}>{props.openData && <ApiTag type={tagTypes.OpenData} />}</Flag>
  </>
);

ApiTags.propTypes = ApiTagsPropTypes;
export { ApiTags };
