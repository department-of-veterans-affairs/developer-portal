import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import 'jest';
import * as React from 'react';
import { useModalController } from './ModalController';

const TestComponent = (): JSX.Element => {

  const { modalVisible, setModalVisible } = useModalController();

  // False values are rendered as blank. This helper shows the actual value
  const displayModalVisibility = () => modalVisible ? 'true' : 'false';

  return (
    <div>
      <p>Modal Visible: {displayModalVisibility()}</p>
      <div>
        <input type="button" id="toggle-visible" onClick={() => setModalVisible(!modalVisible)} />
      </div>
    </div>
  );
};

describe('useModalController', () => {

  let container: HTMLElement;
  let toggleVisibleButton: HTMLElement;

  beforeEach(() => {
    container = render(<TestComponent />).container;
    toggleVisibleButton = screen.getByRole('button');
  });

  afterEach(async () => {
    await cleanup();
  });

  it('initializes to be invisible', async () => {
    expect(await screen.findByText('Modal Visible: false')).toBeDefined();
  });

  describe('when invisible', () => {

    it('becomes visible when modal visisble is set to true', async () => {
      userEvent.click(toggleVisibleButton);
      expect(await screen.findByText('Modal Visible: true')).toBeDefined();
    });
  });

  describe('when visible', ()=> {

    beforeEach(() => {
      // It initializes as invisible, so we toggled it before these tests
      fireEvent.click(toggleVisibleButton);
    });

    it('goes invisible when the [Escape] key is pressed', async () => {
      await userEvent.type(container, '{esc}');
      expect(await screen.findByText('Modal Visible: false')).toBeDefined();
    });

    it('goes invisible when modal visible is set to false', async () => {
      userEvent.click(toggleVisibleButton);
      expect(await screen.findByText('Modal Visible: false')).toBeDefined();
    });
  });
});