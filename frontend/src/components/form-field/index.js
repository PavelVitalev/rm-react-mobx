import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './styles.scss';

const FormField = ({ className, error, ...props }) => {
  const isError = Boolean(error);

  const formClassNames = classNames('form-field', className, {
    'form-field--error': isError
  });

  return (
    <div className="form-field-wrap">
      <input
        {...props}
        className={formClassNames}
        onChange={(event) => props.onChange(event.target.name, event.target.value)}
      />

      { isError ? <div className="form-field__error">{error}</div> : null }
    </div>
  );
};

FormField.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.oneOf(['text', 'email', 'password']),
  errors: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ])
};

export default FormField;
