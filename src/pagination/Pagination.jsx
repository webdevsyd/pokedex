import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import styles from './Pagination.css';

const Pagination = ({ onChange, previousPage, nextPage }) => {
  return (
    <div
      className={clsx(
        styles.wrapper,
        previousPage && nextPage && styles.justifySpaceBetween,
        previousPage && !nextPage && styles.justifyFlexStart,
        !previousPage && nextPage && styles.justifyFlexEnd
      )}
    >
      {previousPage && (
        <button type="button" className={styles.button} onClick={() => onChange('previous')}>
          PREVIOUS
        </button>
      )}
      {nextPage && (
        <button type="button" className={styles.button} onClick={() => onChange('next')}>
          NEXT
        </button>
      )}
    </div>
  );
};

Pagination.propTypes = {
  nextPage: PropTypes.string.isRequired,
  previousPage: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Pagination;
