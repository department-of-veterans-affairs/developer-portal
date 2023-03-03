import * as PropTypes from 'prop-types';
import * as React from 'react';
import { VaInternalOnly } from '../../apiDefs/schema';
import ApiTag, { tagTypes } from './ApiTag';

const ApiTagsPropTypes = {
  openData: PropTypes.bool.isRequired,
  vaInternalOnly: PropTypes.oneOf([
    VaInternalOnly.StrictlyInternal,
    VaInternalOnly.AdditionalDetails,
    VaInternalOnly.FlagOnly,
    null,
  ]),
};

type ApiTagsProps = PropTypes.InferProps<typeof ApiTagsPropTypes>;
const ApiTags: React.FunctionComponent<ApiTagsProps> = (props: ApiTagsProps): JSX.Element => (
  <>
    {props.vaInternalOnly && <ApiTag type={tagTypes.VAInternalOnly} />}
    {props.openData && <ApiTag type={tagTypes.OpenData} />}
  </>
);

ApiTags.propTypes = ApiTagsPropTypes;
export { ApiTags };
