import classNames from 'classnames';
import React, { FC } from 'react';
import { TextField } from '../../../../components';

const ConsumerFormFields: FC = () => (
  <>
    <legend>
      <h2
        className={classNames(
          'vads-u-margin-top--6',
          'vads-u-margin-bottom--2p5',
          'vads-u-font-size--lg',
        )}
      >
        Description
      </h2>
    </legend>
    <TextField
      label="Describe your question or issue in as much detail as you can."
      secondLabel="If your question is about an error, include steps you took to get it and any error messaging you received."
      name="description"
      as="textarea"
      required
    />
  </>
);

export default ConsumerFormFields;
