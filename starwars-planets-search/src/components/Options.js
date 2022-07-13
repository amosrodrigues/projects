import React, { useContext, useState } from 'react';
import StarContext from '../context/StarContext';
import Button from '../selectors/Button';
import Filters from '../selectors/Filters';
import InputText from '../selectors/InputText';
import Order from '../selectors/Order';
import Select from '../selectors/Select';
import '../styles/Options.css'

function Options() {
  const COLUMN_FILTER = [
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

  const COMPARE_FILTER = ['maior que', 'menor que', 'igual a'];

  const [selectedColumn, setSelectedColumn] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '',
  });

  const [optionColumn, setoptionColumn] = useState([
    ...COLUMN_FILTER,
  ]);

  const { handleFilterName, handleFilterNumeric } = useContext(StarContext);

  const handleChange = ({ target: { value } }) => {
    handleFilterName(value);
  };

  const handleSelectColumn = ({ target: { name, value } }) => {
    setSelectedColumn((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const reloadStateInitial = (newOption) => {
    setSelectedColumn((prevState) => ({
      ...prevState,
      column: newOption[0],
    }));
  };

  const recoveredOption = (recovered) => {
    setoptionColumn(recovered);
  };

  const handleClick = () => {

    if (selectedColumn.column !== undefined ) {
      handleFilterNumeric(selectedColumn);
    } 

    const { column } = selectedColumn;
    const index = optionColumn.indexOf(column);

    const newOption = [...optionColumn];
    newOption.splice(index, 1);
    setoptionColumn(newOption);
    reloadStateInitial(newOption);
  };

  const selectionOne = {
    selectColumn: handleSelectColumn,
    selectedColumn,
    filterColumn: optionColumn,
  };

  const selectionTwo = { handleSelectColumn,
    selectColumn: handleSelectColumn,
    selectedColumn,
    filterColumn: COMPARE_FILTER,
  };

  const optionsState = {
    optionColumn,
    recoveredOption,
  };

  return (
    <div className="options">
      <div className="search-input">
        <InputText
          id="search-input"
          name="name-filter"
          type="text"
          onChange={ handleChange }
          dataTestId="name-filter"
        />
      </div>
      <div className="search-filter">
        <Select
          selection={ selectionOne }
          name="column"
          dataTestId="column-filter"
        />
        <Select
          selection={ selectionTwo }
          name="comparison"
          dataTestId="comparison-filter"
        />
        <InputText
          id="value-input"
          name="value"
          type="number"
          onChange={ handleSelectColumn }
          dataTestId="value-filter"
        />
        <Button
          dataTestId="button-filter"
          onClick={ handleClick }
        >
          Adicionar Filtro
        </Button>
      </div>
      <div className="dropdown">
        <Filters optionsState={ optionsState } />
        <Order />
      </div>
    </div>
  );
}

export default Options;
