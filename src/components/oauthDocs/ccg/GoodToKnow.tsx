import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { CONSUMER_PROD_PATH, SUPPORT_CONTACT_PATH } from '../../../types/constants/paths';

const GoodToKnow: FC = () => (
  <>
    <h2>It&apos;s good to know that:</h2>
    <ul>
      <li>
        The access credentials we supply are for the sandbox environment only and will not work in
        the production environment.
      </li>
      <li>
        To get production access, you must either work for VA or have specific VA agreements in
        place. If you have questions, <Link to={SUPPORT_CONTACT_PATH}>contact us</Link>.
      </li>
      <li>
        This page provides examples that show authorization server URLs in the sandbox environment.
        Unless otherwise indicated, you can get production auth server URLs from the API
        documentation.
      </li>
      <li>
        When your application is ready, you may{' '}
        <Link to={CONSUMER_PROD_PATH}>apply for production access</Link>.
      </li>
    </ul>
  </>
);

export default GoodToKnow;
