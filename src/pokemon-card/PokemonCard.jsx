/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import ColorThief from 'colorthief';
import PropTypes from 'prop-types';

import { getPokemon } from '../api';

import styles from './PokemonCard.css';

const colorThief = new ColorThief();

const googleProxyUrl =
  'https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=';

const PokemonCard = ({ data, onClick }) => {
  const [bgColor, setBgColor] = useState('255, 255, 255');
  const [secondaryColor, setSecondaryColor] = useState('255, 255, 255');

  const [pokemon, setPokemon] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  const onLoadImage = () => {
    const dominantColor = colorThief.getPalette(document.getElementById(`pokemon-${data.name}`), 3);
    setBgColor(dominantColor[0].join(', '));
    setSecondaryColor(dominantColor[2].join(', '));
  };

  useEffect(() => {
    (async () => {
      try {
        setIsFetching(true);
        const { data: response } = await getPokemon(data.id);
        setIsFetching(false);
        setPokemon(response);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <div
      data-testid="pokemon-card"
      className={styles.wrapper}
      style={{ backgroundColor: `rgb(${bgColor})` }}
      onClick={() => onClick(data.id)}
    >
      {isFetching || !pokemon ? (
        <div className={styles.loading} data-testid="loading">
          Loading...
        </div>
      ) : (
        <>
          <span
            data-testid="name"
            className={styles.name}
            style={{ backgroundColor: `rgb(${secondaryColor})` }}
          >
            {data.name}
          </span>
          <div
            data-testid="image"
            className={styles.imageWrapper}
            style={{
              backgroundImage: `url(${pokemon.sprites.other['official-artwork'].front_default})`,
            }}
          >
            <img
              style={{ display: 'none' }}
              crossOrigin="anonymous"
              src={`${googleProxyUrl}${pokemon.sprites.other['official-artwork'].front_default}`}
              alt={data.name}
              id={`pokemon-${data.name}`}
              onLoad={() => onLoadImage()}
            />
          </div>
        </>
      )}
    </div>
  );
};

PokemonCard.propTypes = {
  onClick: PropTypes.func.isRequired,
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default PokemonCard;
