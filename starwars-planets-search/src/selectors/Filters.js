import React, { useContext, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import StarContext from '../context/StarContext';

function Filters({ optionsState }) {
  const [disabled, setDisabled] = useState('none');
  const { optionColumn, recoveredOption } = optionsState;
  const {
    data: { data },
    filters: { filterByNumericValues },
    handleSetData,
    handleNewFilterNumeric,
  } = useContext(StarContext);

  const onVisible = () => {
    if (disabled === 'none') {
      setDisabled('flex');
    } else {
      setDisabled('none');
    }
  };

  const handleClick = useCallback(({ target: { value } }) => {
    handleSetData(data);

    const newFilters = filterByNumericValues.filter(({ column }) => column !== value);
    handleNewFilterNumeric(newFilters);

    recoveredOption([...optionColumn, value]);
  }, [
    data,
    filterByNumericValues,
    handleNewFilterNumeric, handleSetData, optionColumn, recoveredOption]);

  return (
    <div className="container">
      <button className="button-drop" type="button" onClick={ onVisible }>Exibir Filtros</button>
      <div className="dropdown-filters" style={ { display: disabled } }>
          {
            filterByNumericValues.length > 0
            && filterByNumericValues.map(({ column, comparison, value }, index) => (
              <div key={ index }>  
                <nav data-testid="filter">
                  <p>{ `>>${column} ${comparison}  ${value} << `}</p>              
                  <button type="button" value={ column } onClick={ handleClick }>X</button>
                </nav>
              </div>
            ))
          }
      </div>
    </div>
  );
}

Filters.propTypes = {
  optionsState: PropTypes.objectOf(String),
};

Filters.defaultProps = {
  optionsState: {},
};

export default Filters;
