import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import store from './store';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const router = createMemoryRouter([{ element: <App />, path: '/*' }]);
  ReactDOM.render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
