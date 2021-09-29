import React from 'react';
import PropTypes from 'prop-types';

import styles from './Search.css';

const Search = ({ onSetSearch, onSearch, search }) => {
  return (
    <div className={styles.wrapper} data-testid="search">
      <input
        data-testid="search-input"
        type="text"
        placeholder="Search Pokemon"
        className={styles.input}
        value={search}
        onChange={(e) => onSetSearch(e.target.value)}
        onKeyDown={(e) => e.code === 'Enter' && onSearch()}
      />
    </div>
  );
};

Search.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onSetSearch: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
};

export default Search;
