import React, { FC } from 'react';
import { FormField } from '../../../../components';

const DefaultFormFields: FC = () => (
  <FormField
    label="Describe your question or issue in as much detail as you can. If your question is about an error, include steps you took to get it and any error messaging you received."
    name="description"
    as="textarea"
    required
    className="vads-u-padding-top--7"
  />
);

export default DefaultFormFields;
