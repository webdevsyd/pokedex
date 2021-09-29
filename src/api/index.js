import queryString from 'query-string';

import client from '../client';

export const getPokemons = ({ search, params }) => {
  return client.get(`/api/v2/pokemon/${search}?${params}`);
};

export const getPokemon = (id) => {
  return client.get(`/api/v2/pokemon/${id}`);
};

export default {};
