import { IApiCategoryContent } from '../../../apiDefs/schema';
import DeactivatedIntro from './DeactivatedIntro';
import deactivatedOverview from './deactivatedOverview.mdx';

const deactivatedContent: IApiCategoryContent = {
  intro: DeactivatedIntro,
  overview: deactivatedOverview,
  placardText: '',
  shortDescription: '',
};

export {
  deactivatedContent,
};
