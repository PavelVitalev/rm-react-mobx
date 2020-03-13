import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const BoardInput = ({ className: classes, ...rest }) => (
  <input
    {...rest}
    className={`board-input ${classes}`}
  />
);

export default BoardInput;

BoardInput.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  autoFocus: PropTypes.bool,
  style: PropTypes.object,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  onBlur: PropTypes.func
};
