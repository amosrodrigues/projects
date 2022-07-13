import React, { useContext } from 'react';
import StarContext from '../context/StarContext';
import useOrderPlanets from '../hooks/useOrderPlanets';
import useSearchPlanets from '../hooks/useSearchPlanets';
import '../styles/Table.css'

function Table() {
  useOrderPlanets();
  useSearchPlanets();
  const { data: { isLoading }, filters: { dataFiltered } } = useContext(StarContext);
  return (
    <table className="table">
      <caption>Star Wars Planets Serach</caption>
      <thead>
        <tr>
          <th>name</th>
          <th>rotation_period</th>
          <th>orbital_period</th>
          <th>diameter</th>
          <th>climate</th>
          <th>gravity</th>
          <th>terrain</th>
          <th>surface_water</th>
          <th>population</th>
          <th>films</th>
          <th>created</th>
          <th>edited</th>
          <th>url</th>
        </tr>
      </thead>
      <tbody>
        {
          isLoading
        && dataFiltered.map(({
          name,
          rotation_period: rotationPeriod,
          orbital_period: orbitalPeriod,
          diameter,
          climate,
          gravity,
          terrain,
          surface_water: surfaceWater,
          population,
          films,
          created,
          edited,
          url,
        }) => (
          <tr key={ name }>
            <td data-testid="planet-name">{ name }</td>
            <td>{ rotationPeriod }</td>
            <td>{ orbitalPeriod }</td>
            <td>{ diameter }</td>
            <td>{ climate }</td>
            <td>{ gravity }</td>
            <td>{ terrain }</td>
            <td>{ surfaceWater }</td>
            <td>{ population }</td>
            <td>{ films }</td>
            <td>{ created }</td>
            <td>{ edited }</td>
            <td>{ url }</td>
          </tr>
        ))
        }
      </tbody>
    </table>
  );
}

export default Table;
