import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

import './styles.scss';

const DeleteButton = ({ onClick, className }) => {
  return (
    <div
      className={`delete-btn-wrap ${className || ''}`}
      onClick={onClick}
    >
      <FontAwesomeIcon icon="times" />
    </div>
  );
};

export default DeleteButton;

DeleteButton.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string
};
