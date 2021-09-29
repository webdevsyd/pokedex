import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';

import Pagination from '../pagination';
import PokemonCard from '../pokemon-card';
import Search from '../Search';
import { getPokemons } from '../api';

import styles from './Home.css';

const Home = () => {
  const { push } = useHistory();
  const [hasError, setHasError] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [pokemons, setPokemons] = useState([]);
  const [nextPage, setNextPage] = useState('');
  const [previousPage, setPreviousPage] = useState('');
  const [search, setSearch] = useState('');

  const goToDetailsPage = (id) => {
    return push(`/pokemon/${id}`);
  };

  const onFetchLists = async (action = '') => {
    const pagination = {
      next: nextPage,
      previous: previousPage,
      '': '',
    };

    try {
      setIsFetching(true);
      const { data } = await getPokemons({
        search,
        params: pagination[action],
      });

      if (search === '') {
        if (data.next) {
          setNextPage(
            queryString.stringify(queryString.parse(data.next.substring(data.next.indexOf('?'))))
          );
        } else {
          setNextPage('');
        }

        if (data.previous) {
          setPreviousPage(
            queryString.stringify(
              queryString.parse(data.previous.substring(data.previous.indexOf('?')))
            )
          );
        } else {
          setPreviousPage('');
        }

        setPokemons(
          data.results.map((d) => ({
            ...d,
            id: d.url.match(/\/(\d+)+[/]?/g)[0].replaceAll('/', ''),
          }))
        );

        setIsFetching(false);
      } else {
        goToDetailsPage(data.id);
      }
    } catch (_) {
      console.log('errr');
      setIsFetching(false);
    }
  };

  const onChangePagination = async (action) => {
    await onFetchLists(action);
  };

  const onSearch = async () => {
    setHasError(false);
    setNextPage('');
    setPreviousPage('');
    setPokemons([]);
    await onFetchLists('');
  };

  useEffect(() => {
    (async () => {
      onFetchLists();
    })();
  }, []);

  return (
    <>
      <Search onSetSearch={setSearch} onSearch={onSearch} search={search} />
      <div className={styles.wrapper}>
        {hasError && pokemons.length === 0 && !isFetching && <div>Pokemon not found</div>}
        {isFetching ? (
          <div>Loading...</div>
        ) : (
          pokemons.map((p) => <PokemonCard data={p} key={p.name} onClick={goToDetailsPage} />)
        )}
      </div>
      <div className={styles.paginationWrapper}>
        <Pagination onChange={onChangePagination} nextPage={nextPage} previousPage={previousPage} />
      </div>
    </>
  );
};

export default Home;
