/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { render, getByTestId } from '@testing-library/react';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

export const renderAppComponent =
  (options = {}) =>
  (Component, componentProps = {}) =>
    render(
      <BrowserRouter>
        <Route
          path={options.path}
          render={(props) => <Component {...props} {...componentProps} />}
        />
      </BrowserRouter>,
      options
    );

export { getByTestId };

export default {};
