/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import Header from './Header';

describe('Header', () => {
  const history = createMemoryHistory();

  const renderComponent = () => {
    const { getByTestId } = render(
      <Router history={history}>
        <Header />
      </Router>
    );
    return { getByTestId };
  };

  afterEach(() => {
    cleanup();
  });

  describe('container', () => {
    it('should render', () => {
      const { getByTestId } = renderComponent();
      expect(!!getByTestId('container')).toBe(true);
    });

    it('should redirect to home page', () => {
      const { getByTestId } = renderComponent();
      fireEvent.click(getByTestId('container'));
      expect(history.location.pathname).toBe('/');
    });
  });

  describe('background image', () => {
    it('should render', () => {
      const { getByTestId } = renderComponent();
      expect(!!getByTestId('background')).toBe(true);
    });

    it('should have background image', () => {
      const { getByTestId } = renderComponent();

      expect(window.getComputedStyle(getByTestId('background')).backgroundImage).toBe(
        'url(mock-image-file)'
      );
    });
  });
});
