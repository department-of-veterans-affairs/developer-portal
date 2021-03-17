import * as React from 'react';
import './AppVersion.scss';

const commitHash = process.env.REACT_APP_COMMIT_HASH ?? 'undefined';

const AppVersion = (): JSX.Element => (
  <p className="app-commit">{commitHash}</p>
);

export { AppVersion };
