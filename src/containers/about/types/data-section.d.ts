import { NewsItemData } from './news-item-data';

export interface DataSection {
  title: string;
  description: string;
  media: boolean;
  callToAction: string;
  items: NewsItemData[];
}
