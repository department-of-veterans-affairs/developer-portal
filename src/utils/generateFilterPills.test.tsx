import { generateFilterPills } from './generateFilterPills';

describe('generateFilterPills', () => {
  const props = {
    clearAuthFilter: jest.fn(),
    clearSearchFilter: jest.fn(),
    clearTopicFilter: jest.fn(),
  };
  const { clearAuthFilter, clearSearchFilter, clearTopicFilter } = props;

  let clearAuthFilterSpy: jest.SpyInstance;
  let clearSearchFilterSpy: jest.SpyInstance;
  let clearTopicFilterSpy: jest.SpyInstance;

  beforeEach(() => {
    clearAuthFilterSpy = jest.spyOn(props, 'clearAuthFilter');
    clearSearchFilterSpy = jest.spyOn(props, 'clearSearchFilter');
    clearTopicFilterSpy = jest.spyOn(props, 'clearTopicFilter');
  });

  afterEach(() => {
    clearAuthFilterSpy.mockRestore();
    clearSearchFilterSpy.mockRestore();
    clearTopicFilterSpy.mockRestore();
  });

  test('should generate a topic Pill', () => {
    const topicFilter: string[] = ['basketball'];
    const authFilter: string[] = [];
    const search: string = '';
    const pillsData = {
      authFilter,
      clearAuthFilter,
      clearSearchFilter,
      clearTopicFilter,
      search,
      topicFilter,
    };
    expect(generateFilterPills(pillsData)).toHaveLength(1);
  });

  test('should generate an auth Pill', () => {
    const topicFilter: string[] = [];
    const authFilter: string[] = ['ccg'];
    const search: string = '';
    const pillsData = {
      authFilter,
      clearAuthFilter,
      clearSearchFilter,
      clearTopicFilter,
      search,
      topicFilter,
    };
    expect(generateFilterPills(pillsData)).toHaveLength(1);
  });

  test('should generate a search Pill', () => {
    const topicFilter: string[] = [];
    const authFilter: string[] = [];
    const search: string = 'Bene';
    const pillsData = {
      authFilter,
      clearAuthFilter,
      clearSearchFilter,
      clearTopicFilter,
      search,
      topicFilter,
    };
    expect(generateFilterPills(pillsData)).toHaveLength(1);
  });

  test('should generate topic and auth pills', () => {
    const topicFilter: string[] = ['basketball'];
    const authFilter: string[] = ['acg', 'ccg'];
    const search: string = '';
    const pillsData = {
      authFilter,
      clearAuthFilter,
      clearSearchFilter,
      clearTopicFilter,
      search,
      topicFilter,
    };
    expect(generateFilterPills(pillsData)).toHaveLength(3);
  });

  test('should generate all filter types', () => {
    const topicFilter: string[] = ['basketball', 'hockey'];
    const authFilter: string[] = ['acg', 'ccg'];
    const search: string = 'bananas';
    const pillsData = {
      authFilter,
      clearAuthFilter,
      clearSearchFilter,
      clearTopicFilter,
      search,
      topicFilter,
    };
    expect(generateFilterPills(pillsData)).toHaveLength(5);
  });
});
