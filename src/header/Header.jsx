/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { useHistory } from 'react-router-dom';

import PokemonLogoSrc from '../assets/pokemon_logo.png';

import styles from './Header.css';

const Header = () => {
  const { push } = useHistory();
  return (
    <div data-testid="container" className={styles.wrapper} onClick={() => push('/')}>
      <div
        data-testid="background"
        className={styles.bgWrapper}
        style={{ backgroundImage: `url(${PokemonLogoSrc})` }}
      />
    </div>
  );
};

export default Header;
