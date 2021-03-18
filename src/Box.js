import React from 'react';
import PropTypes from 'prop-types';

function Box(props) {
  Box.propTypes = {
    onClick: PropTypes.func.isRequired,
    value: PropTypes.string,
  };
  Box.defaultProps = {
    value: null,
  };
  const { onClick, value } = props;
  return (
    <div className="box" onMouseDown={() => onClick()} role="button" tabIndex="0">{value}</div>
  );
}

export default Box;
