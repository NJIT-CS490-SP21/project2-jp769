import React from 'react';
import PropTypes from 'prop-types';

function Box(props){
  Box.propTypes = {
    onClick: PropTypes.func.isRequired,
    value: PropTypes.string,
  };
  Box.defaultProps = {
    value: null,
  };
  const { value } = props;
  console.log(value);
  return (
    <div className="box" onMouseDown={() => props.onClick()} role="button" tabIndex="0">{value.value}</div>
  );
};

export default Box;
