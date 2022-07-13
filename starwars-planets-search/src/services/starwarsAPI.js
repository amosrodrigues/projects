const STARWARS_API = 'https://swapi-trybe.herokuapp.com/api/planets/';

const getStarwarsPlanetsSearch = () => (
  fetch(STARWARS_API)
    .then((response) => (
      response
        .json()
        .then((data) => (response.ok ? Promise.resolve(data) : Promise.reject(data)))
    ))
);

export default getStarwarsPlanetsSearch;
