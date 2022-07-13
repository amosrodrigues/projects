import React from 'react';
import InputMask from 'react-input-mask';

// const onlyNumbers = (str) => str.replace(/[^0-9]/g, '');

const MaskedInput = ({ ...props }) => {
  // function handleChange(event) {
  //   onChange({
  //     ...event,
  //     target: {
  //       ...event.target,
  //       name,
  //       value: onlyNumbers(event.target.value),
  //     },
  //   });
  // }

  return <InputMask {...props} />;
};

export default MaskedInput;
