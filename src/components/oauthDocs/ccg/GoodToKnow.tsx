import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { CONSUMER_PROD_PATH } from '../../../types/constants/paths';

const GoodToKnow: FC = () => (
  <>
    <h2>It&apos;s also good to know that:</h2>
    <ul>
      <li>
        The access credentials we supply are for the sandbox environment only and will not work in
        the production environment.
      </li>
      <li>
        This page provides examples that show authorization server URLs in the sandbox environment,
        unless otherwise indicated, which differ depending on the API. You can get production auth
        server URLs from the API documentation.
      </li>
      <li>
        When your application is ready, you may{' '}
        <Link to={CONSUMER_PROD_PATH}>apply for production access</Link>.
      </li>
    </ul>
  </>
);

export default GoodToKnow;
