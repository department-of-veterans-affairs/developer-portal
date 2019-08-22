declare module '*news.yml' {
  interface INewsData {
    sections: INewsSection[];
  }

  interface INewsSection {
    title: string;
    description: string;
    items?: INewsItem[];
  }

  interface INewsItem {
    date: string;
    source?: string;
    title: string;
    url: string;
  }

  const newsData: INewsData;
  export default newsData;
}
