import * as React from 'react';
import './AppVersion.scss';

const currentAppVersion = process.env.REACT_APP_COMMIT_HASH ?? 'undefined';
const testCommit = process.env.COMMIT_HASH ?? 'undefined';

const AppVersion = (): JSX.Element => (
  <>
    <p className="app-commit">REACT_APP_COMMIT_HASH: {currentAppVersion}</p>
    <p className="app-commit">COMMIT_HASH: {testCommit}</p>
  </>
);

export { AppVersion };
