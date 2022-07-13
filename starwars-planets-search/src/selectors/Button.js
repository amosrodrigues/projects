import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  children,
  onClick,
  dataTestId,
}) => (
  <button
    onClick={ onClick }
    data-testid={ dataTestId }
    type="button"
  >
    { children }
  </button>
);

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func.isRequired,
  dataTestId: PropTypes.string,
};

Button.defaultProps = {
  children: null,
  dataTestId: '',
};

export default Button;
