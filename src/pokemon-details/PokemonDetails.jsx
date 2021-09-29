import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ColorThief from 'colorthief';

import { getPokemon } from '../api';

import styles from './PokemonDetails.css';

const colorThief = new ColorThief();

const googleProxyUrl =
  'https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=';

const PokemonDetails = () => {
  const [bgColor, setBgColor] = useState('255, 255, 255');
  const [secondaryColor, setSecondaryColor] = useState('255, 255, 255');
  const [isFetching, setIsFetching] = useState(false);
  const [pokemon, setPokemon] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    (async () => {
      setIsFetching(true);
      const { data } = await getPokemon(id);
      setPokemon(data);
      setIsFetching(false);
    })();
  }, []);

  const onLoadImage = () => {
    const dominantColor = colorThief.getPalette(
      document.getElementById(`pokemon-${pokemon.name}`),
      3
    );
    setBgColor(dominantColor[0].join(', '));
    setSecondaryColor(dominantColor[2].join(', '));
  };

  return (
    <div className={styles.wrapper}>
      {isFetching ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className={styles.leftWrapper} style={{ backgroundColor: `rgb(${bgColor})` }}>
            <div className={styles.nameWrapper}>
              <span className={styles.name}>{pokemon?.name}</span>
              <span className={styles.name}>#{pokemon?.order}</span>
            </div>
            <div className={styles.typeWrapper}>
              {pokemon?.types.map((type) => (
                <div
                  key={type.type.name}
                  className={styles.type}
                  style={{ backgroundColor: `rgb(${secondaryColor})` }}
                >
                  {type.type.name}
                </div>
              ))}
            </div>
            <div className={styles.imageWrapper}>
              <img
                crossOrigin="anonymous"
                src={`${googleProxyUrl}${pokemon?.sprites?.other['official-artwork'].front_default}`}
                alt={pokemon?.name}
                id={`pokemon-${pokemon?.name}`}
                onLoad={() => onLoadImage()}
              />
            </div>
          </div>
          <div className={styles.rightWrapper}>
            <h1 className={styles.sectionTitle}>STATS</h1>
            <hr style={{ borderColor: `rgb(${bgColor})` }} />
            <div className={styles.statsWrapper}>
              {pokemon?.stats.map((s) => (
                <div className={styles.statsBox} key={s.stat.name}>
                  <span className={styles.statsTitle}>{s.stat.name.replace('-', ' ')}</span>
                  <span className={styles.statsValue}>{s.base_stat}</span>
                </div>
              ))}
            </div>

            <h1 className={styles.sectionTitle}>ABLITIES</h1>
            <hr style={{ borderColor: `rgb(${bgColor})` }} />
            <div className={styles.statsWrapper}>
              {pokemon?.abilities.map((a) => (
                <div className={styles.statsBox} key={a.ability.name}>
                  <span className={styles.statsTitle}>{a.ability.name.replace('-', ' ')}</span>
                </div>
              ))}
            </div>

            <h1 className={styles.sectionTitle}>MOVES</h1>
            <hr style={{ borderColor: `rgb(${bgColor})` }} />
            <div className={styles.statsWrapper}>
              {pokemon?.moves.map((m) => (
                <div className={styles.statsBox} key={m.move.name}>
                  <span className={styles.statsTitle}>{m.move.name.replace('-', ' ')}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PokemonDetails;
