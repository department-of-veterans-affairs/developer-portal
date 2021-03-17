import * as React from 'react';
import './AppVersion.scss';

const commitHash = process.env.REACT_APP_COMMIT_HASH ?? 'undefined';

const AppVersion = (): JSX.Element => (
  <div id="app-commit">Commit Hash: {commitHash}</div>
);

export { AppVersion };
