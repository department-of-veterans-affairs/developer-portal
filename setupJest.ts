import { GlobalWithFetchMock } from 'jest-fetch-mock';

import { configure } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

// Configure Enzyme
configure({ adapter: new Adapter() });

// Configure jest fetch mock
const customGlobal: GlobalWithFetchMock = global as GlobalWithFetchMock;
customGlobal.fetch = require('jest-fetch-mock'); //tslint:disable-line
customGlobal.fetchMock = customGlobal.fetch;
