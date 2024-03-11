import { cleanup, render, screen, waitFor, RenderResult } from '@testing-library/react';
import 'jest';
import * as React from 'react';
import { Provider } from 'react-redux';
import store from '../../store';
import { apiLoadingState } from '../../types/constants';
import * as apiDefs from '../../apiDefs/query';
import ApisLoader from './ApisLoader';

const renderComponent = async (): Promise<RenderResult> => {
  await waitFor(() => cleanup()); // clean up beforeEach render if we're testing a different page
  return render(
    <Provider store={store}>
      <ApisLoader>
        <h1>Child element</h1>
      </ApisLoader>
    </Provider>,
  );
};

const renderConditionalComponent = async (
  hideError: boolean,
  hideSpinner: boolean,
): Promise<RenderResult> => {
  const props = {
    hideError: false,
    hideSpinner: false,
  };
  if (hideError) {
    props.hideError = true;
  }
  if (hideSpinner) {
    props.hideSpinner = true;
  }
  await waitFor(() => cleanup()); // clean up beforeEach render if we're testing a different page
  return render(
    <Provider store={store}>
      <ApisLoader {...props} />
    </Provider>,
  );
};

describe('ApisLoader', () => {
  let apisLoadedSpy: jest.SpyInstance;

  beforeAll(() => {
    apisLoadedSpy = jest.spyOn(apiDefs, 'getApisLoadedState');
  });
  beforeEach(renderComponent);

  it('Loading in progress state properly observed', async () => {
    apisLoadedSpy.mockReturnValue(apiLoadingState.IN_PROGRESS);

    const { container } = await renderComponent();
    const loadingIndicator = container.querySelector('va-loading-indicator');
    expect(loadingIndicator).toBeInTheDocument();
  });

  it('Loaded state properly observed', async () => {
    apisLoadedSpy.mockReturnValue(apiLoadingState.LOADED);

    await renderComponent();

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('Child element');
  });

  it('Error state properly observed', async () => {
    apisLoadedSpy.mockReturnValue(apiLoadingState.ERROR);

    await renderComponent();

    expect(screen.getByText('Loading Error:')).toBeInTheDocument();
  });

  it('hideSpinner works as expected', async () => {
    apisLoadedSpy.mockReturnValue(apiLoadingState.IN_PROGRESS);

    const { container } = await renderConditionalComponent(false, true);
    const loadingIndicator = container.querySelector('va-loading-indicator');
    expect(loadingIndicator).toBeNull();
  });

  it('Loaded state with empty children properly observed', async () => {
    apisLoadedSpy.mockReturnValue(apiLoadingState.LOADED);

    await renderConditionalComponent(false, false);

    expect(screen.queryByRole('heading', { level: 1 })).not.toBeInTheDocument();
  });

  it('hideError works as expected', async () => {
    apisLoadedSpy.mockReturnValue(apiLoadingState.ERROR);

    await renderConditionalComponent(true, false);

    expect(screen.queryByRole('heading', { level: 2 })).not.toBeInTheDocument();
  });
});
