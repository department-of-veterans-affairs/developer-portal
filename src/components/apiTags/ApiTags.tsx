import * as PropTypes from 'prop-types';
import * as React from 'react';
import { ExploreApiTag } from '../exploreApiCard/ExploreApiTags';
import { VaInternalOnly } from '../../apiDefs/schema';

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
    {props.vaInternalOnly && <ExploreApiTag showLock tagName="Restricted Access" />}
    {props.openData && <ExploreApiTag tagName="Open Data" />}
  </>
);

ApiTags.propTypes = ApiTagsPropTypes;
export { ApiTags };
