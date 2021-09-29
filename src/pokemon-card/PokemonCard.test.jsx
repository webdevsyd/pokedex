/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { act } from 'react-dom/test-utils';
import nock from 'nock';
import { render, cleanup, fireEvent, waitFor } from '@testing-library/react';

import PokemonCard from './PokemonCard';

nock.disableNetConnect();

const props = {
  onClick: jest.fn(),
  data: {
    id: '123',
    name: 'Charizard',
  },
};

const data = {
  sprites: {
    other: {
      'official-artwork': {
        front_default: 'asdasdadasasd.jpg',
      },
    },
  },
};

describe('PokemonCard', () => {
  const renderComponent = (overrideProps = {}) => {
    const { getByTestId } = render(<PokemonCard {...props} {...overrideProps} />);
    return { getByTestId };
  };

  beforeEach(() => {
    nock('https://pokeapi.co/')
      .get(`/api/v2/pokemon/${props.data.id}`)
      .reply(200, { ...data });
  });

  afterEach(() => {
    cleanup();
    nock.cleanAll();
  });

  describe('card', () => {
    it('should render', () => {
      const { getByTestId } = renderComponent();
      expect(!!getByTestId('pokemon-card')).toBe(true);
    });

    it('on click', () => {
      const { getByTestId } = renderComponent();
      fireEvent.click(getByTestId('pokemon-card'));
      expect(props.onClick).toHaveBeenCalled();
    });
  });

  describe('loading', () => {
    it('should display', () => {
      const { getByTestId } = renderComponent();

      expect(!!getByTestId('loading')).toBe(true);
    });

    it('should not display', async () => {
      let container = null;

      await act(async () => {
        container = render(<PokemonCard {...props} />);

        await waitFor(async () => {
          expect(await !!container.queryByTestId('loading')).toBe(false);
        });
      });
    });
  });

  describe('name', () => {
    it('should display', async () => {
      let container = null;

      await act(async () => {
        container = render(<PokemonCard {...props} />);

        await waitFor(async () => {
          expect(await !!container.queryByTestId('name')).toBe(true);
        });
      });
    });

    it('should display correct text', async () => {
      let container = null;

      await act(async () => {
        container = render(<PokemonCard {...props} />);

        await waitFor(async () => {
          expect(await container.queryByTestId('name').textContent).toBe(props.data.name);
        });
      });
    });
  });

  describe('background image', () => {
    it('should display', async () => {
      let container = null;

      await act(async () => {
        container = render(<PokemonCard {...props} />);

        await waitFor(async () => {
          expect(await !!container.queryByTestId('image')).toBe(true);
        });
      });
    });

    it('should display correct background image', async () => {
      let container = null;

      await act(async () => {
        container = render(<PokemonCard {...props} />);

        await waitFor(async () => {
          expect(
            await window.getComputedStyle(container.getByTestId('image')).backgroundImage
          ).toBe(`url(${data.sprites.other['official-artwork'].front_default})`);
        });
      });
    });
  });
});
