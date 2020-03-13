import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

import Button from 'components/button';
import FormField from 'components/form-field';
import { BtnLoader } from 'components/loader';

import './styles.scss';

@inject('signinStore')
@observer
class SignIn extends Component {
  render() {
    const { signinStore } = this.props;

    return (
      <div className="signin-wrap">
        <form className="signin-form" onSubmit={(event) => signinStore.signIn(event, this.props.history)}>
          <FormField
            className="signin-form__input"
            id="inputEmail"
            type="email"
            name="email"
            placeholder="Email address"
            required
            onChange={signinStore.onFieldChange}
            error={signinStore.form.fields.email.error}
            value={signinStore.form.fields.email.value}
          />

          <FormField
            className="signin-form__input"
            id="passwordEmail"
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={signinStore.onFieldChange}
            error={signinStore.form.fields.password.error}
            value={signinStore.form.fields.password.value}
          />

          <Button className="btn--sign" type="submit">
            {
              signinStore.isLoading
                ? <BtnLoader /> : 'Sign In'
            }
          </Button>
        </form>
      </div>
    );
  }
}

export default SignIn;

SignIn.propTypes = {
  signinStore: PropTypes.object
};
