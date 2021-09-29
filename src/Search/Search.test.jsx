/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';

import Search from './Search';

const props = {
  onSearch: jest.fn(),
  onSetSearch: jest.fn(),
  search: '',
};

describe('Search', () => {
  const renderComponent = (overrideProps = {}) => {
    const { getByTestId } = render(<Search {...props} {...overrideProps} />);
    return { getByTestId };
  };

  beforeEach(() => {
    cleanup();
  });

  it('should render', () => {
    const { getByTestId } = renderComponent();
    expect(!!getByTestId('search')).toBe(true);
  });

  describe('input', () => {
    it('should render', () => {
      const { getByTestId } = renderComponent();
      expect(!!getByTestId('search-input')).toBe(true);
    });

    describe('on change', () => {
      it('should display value in input', () => {
        const { getByTestId } = renderComponent({ search: 'Charizard' });
        const input = getByTestId('search-input');
        expect(input.value).toBe('Charizard');
      });

      it('onSetSearch should be called', () => {
        const { getByTestId } = renderComponent();
        const input = getByTestId('search-input');
        fireEvent.change(input, { target: { value: 'Charizard' } });
        expect(props.onSetSearch).toHaveBeenCalled();
      });

      it('onSearch should be called', () => {
        const { getByTestId } = renderComponent();
        const input = getByTestId('search-input');
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 });
        expect(props.onSearch).toHaveBeenCalled();
      });
    });
  });
});
