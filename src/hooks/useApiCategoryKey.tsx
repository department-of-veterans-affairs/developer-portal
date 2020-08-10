import { useEffect, useState } from 'react';

import { getDeactivatedCategory } from '../apiDefs/deprecated';
import { getApiDefinitions } from '../apiDefs/query';

// ideally we would use the useHistory/useLocation hook provided
// in react-router-dom v5+
const useApiCategoryKey = (matchParams: string) => {
  const [apiInfo, setApiInfo] = useState({
    apiDefinition: null,
    apiFlagName: '',
  });

  useEffect(() => {
    let apiDefs;
    let flagName;

    if (matchParams === 'deactivated') {
      apiDefs = getDeactivatedCategory();
      flagName = `deactivated_apis`;
    } else {
      apiDefs = getApiDefinitions();
      flagName = `hosted_apis`;
    }

    setApiInfo({
      apiDefinition: apiDefs[matchParams],
      apiFlagName: flagName,
    });
  }, [matchParams]);

  return apiInfo;
};

export default useApiCategoryKey;