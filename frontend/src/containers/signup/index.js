import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

import Button from 'components/button';
import { BtnLoader } from 'components/loader/index';
import FormField from 'components/form-field';
import Snackbar from 'components/snackbar';

import './styles.scss';

@inject('signupStore')
@observer
class SignIn extends Component {
  render() {
    const { signupStore, history } = this.props;

    return (
      <div className="signin-wrap">
        <form className="signin-form" onSubmit={(event) => signupStore.signUp(event, history)}>
          <FormField
            className="signin-form__input"
            id="inputEmail"
            type="email"
            name="email"
            placeholder="Email address"
            required
            onChange={signupStore.onFieldChange}
            error={signupStore.form.fields.email.error}
            value={signupStore.form.fields.email.value}
          />
          <FormField
            className="signup-form__input"
            id="inputName"
            type="text"
            name="name"
            placeholder="Name"
            onChange={signupStore.onFieldChange}
            value={signupStore.form.fields.name.value}
          />
          <FormField
            className="signin-form__input"
            id="passwordEmail"
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={signupStore.onFieldChange}
            error={signupStore.form.fields.password.error}
            value={signupStore.form.fields.password.value}
          />
          <Button className="btn--sign" type="submit">
            {
              signupStore.isLoading
                ? <BtnLoader /> : 'Sign Up'
            }
          </Button>
        </form>
        { signupStore.errorMessage.length ? <Snackbar message={signupStore.errorMessage} /> : null}
      </div>
    );
  }
}

export default SignIn;

SignIn.propTypes = {
  signupStore: PropTypes.object,
  history: PropTypes.object
};
