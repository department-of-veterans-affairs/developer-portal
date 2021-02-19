import classNames from 'classnames';
import React, { FC } from 'react';
import { FormField } from '../../../../components';

const ConsumerFormFields: FC = () => (
  <fieldset className="vads-u-margin-top--4">
    <legend className={classNames('vads-u-font-size--lg', 'vads-u-margin-bottom--0')}>
      Description
    </legend>
    <FormField
      label="Describe your question or issue in as much detail as you can. If your question is about an error, include steps you took to get it and any error messaging you received."
      name="description"
      as="textarea"
      required
      className="vads-u-padding-top--3"
    />
  </fieldset>
);

export default ConsumerFormFields;
