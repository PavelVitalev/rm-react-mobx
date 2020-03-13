/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const Button = ({ children, className, onClick, disabled, type = 'button' }) => (
  <button
    disabled={disabled}
    type={type}
    className={`btn ${className || ''}`}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  className: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit'])
};
