import * as PropTypes from 'prop-types';
import * as React from 'react';
import ApiTag, { tagTypes } from './ApiTag';

const ApiTagsPropTypes = {
  openData: PropTypes.bool.isRequired,
  vaInternalOnly: PropTypes.oneOf([1, 2, 3]),
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
