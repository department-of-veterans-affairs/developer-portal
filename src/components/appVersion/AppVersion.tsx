import * as React from 'react';
import './AppVersion.scss';

const testCommit = process.env.COMMIT_HASH ?? 'undefined';

const AppVersion = (): JSX.Element => (
  <p className="app-commit">{testCommit}</p>
);

export { AppVersion };
