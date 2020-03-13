import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const Snackbar = ({ message }) => {
  return (
    <div className="snackbar-wrap">
      <div className="snackbar">{message}</div>
    </div>
  );
};

export default Snackbar;

Snackbar.propTypes = {
  message: PropTypes.string.isRequired
};
