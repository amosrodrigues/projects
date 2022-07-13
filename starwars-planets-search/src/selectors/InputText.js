import React from 'react';
import PropTypes from 'prop-types';

function InputText({ id, onChange, dataTestId, name, type }) {
  return (
    <label htmlFor={ id }>
      { name }
      <input
        id={ id }
        name={ name }
        type={ type }
        onChange={ onChange }
        data-testid={ dataTestId }
        />
    </label>
  );
}

InputText.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  dataTestId: PropTypes.string,
};

InputText.defaultProps = {
  id: '',
  name: '',
  type: '',
  dataTestId: '',
};

export default InputText;
