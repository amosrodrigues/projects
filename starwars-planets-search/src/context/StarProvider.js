import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import getStarwarsPlanetsSearch from '../services/starwarsAPI';
import StarContext from './StarContext';

function StarProvider({ children }) {
  const [data, setData] = useState({
    data: [],
    isLoading: false,
  });

  const [filters, setFilters] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
    order: {
      column: 'name',
      sort: 'ASC',
    },
    dataFiltered: [],
  });

  const handleSetData = useCallback((newData) => {
    setFilters((prevState) => ({ ...prevState, dataFiltered: newData }));
  }, []);

  const handleFilterName = useCallback((name) => {
    setFilters((prevState) => ({ ...prevState, filterByName: { name } }));
  }, []);

  const handleSetOrder = useCallback((newOrder) => {
    setFilters((prevState) => ({ ...prevState, order: newOrder }));
  }, []);

  const handleFilterNumeric = useCallback((select) => {
    setFilters((prevState) => ({
      ...prevState,
      filterByNumericValues: [select, ...prevState.filterByNumericValues] }));
  }, []);

  const handleNewFilterNumeric = useCallback((newFilters) => {
    setFilters((prevState) => ({
      ...prevState,
      filterByNumericValues: [...newFilters] }));
  }, []);

  const getPlanets = () => {
    getStarwarsPlanetsSearch().then((response) => (
      setData({ data: response.results, isLoading: true })
    ));
  };

  const constextValue = {
    data,
    filters,
    handleSetData,
    handleSetOrder,
    handleFilterName,
    handleFilterNumeric,
    handleNewFilterNumeric,
  };

  useEffect(() => {
    getPlanets();
  }, []);

  return (
    <StarContext.Provider value={ constextValue }>
      { children }
    </StarContext.Provider>
  );
}

StarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StarProvider;
