import React from 'react';
import PropTypes from 'prop-types';

const renderOptions = (options) => (
  options.map((option) => (
    <option
      value={ option }
      key={ option }
    >
      {option}
    </option>
  ))
);

const Select = ({ selection, name, dataTestId }) => {
  const {
    selectColumn,
    filterColumn,
  } = selection;

  return (
    <label htmlFor={ name }>
      { name }
      <select
        onChange={ (e) => selectColumn(e) }
        name={ name }
        data-testid={ dataTestId }
      >
        {renderOptions(filterColumn)}
      </select>
    </label>
  );
};

Select.propTypes = {
  selection: PropTypes.objectOf(String),
  name: PropTypes.string,
  dataTestId: PropTypes.string,
};

Select.defaultProps = {
  selection: {},
  name: '',
  dataTestId: '',
};

export default Select;
