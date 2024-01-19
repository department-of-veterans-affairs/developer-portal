import '@testing-library/jest-dom';
import 'jest-location-mock';

//  workaround for https://github.com/jsdom/jsdom/issues/1695
Element.prototype.scrollIntoView = jest.fn();
