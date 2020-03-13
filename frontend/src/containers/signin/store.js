import { observable, action, toJS } from 'mobx';
import axios from 'axios';

import isAuthentication from '@utils/auth';

import SignValidation from 'utils/validation/signin';

class SigninStore {
  validation = new SignValidation(this.form);

  get formValues() {
    const formData = {};
    const form = toJS(this.form).fields;

    for (const key in form) {
      formData[key] = form[key].value;
    }

    return formData;
  }

  @observable
  isLoading = false;

  @observable
  form = {
    fields: {
      email: {
        value: 'admin@admin.admin',
        // value: '',

        error: null,
        rule: 'required|email'
      },
      password: {
        value: 'admin',
        // value: '',

        error: null,
        rule: 'required'
      },
    },
    meta: {
      isValid: false,
      error: null,
    },
  };

  @action
  setIsLoading(value) {
    this.isLoading = value;
  }

  @action.bound
  onFieldChange(field, value) {
    this.validation.onFieldChange(field, value);
  }

  @action.bound
  clearForm() {
    this.validation.clearForm();
  }

  @action
  signIn = (event, history) => {
    event.preventDefault();

    this.validation.onFormCheckValid();

    this.setIsLoading(true);

    axios.post('/auth/signin', { ...this.formValues })
      .then((response) => {
        this.setIsLoading(false);

        if (response && !response.statusText === 'OK') {
          return;
        }

        const { token } = response.data.data;
        localStorage.setItem('token', JSON.stringify(token));

        axios.defaults.headers.common['authorization'] = token;

        isAuthentication.checkIsAuth();

        this.clearForm();

        history.push('/boards');
      })
      .catch((error) => {
        this.setIsLoading(false);
        console.warn(error);
      });
  };

  @action
  signout() {
    localStorage.removeItem('token');
  }
}

const signinStore = new SigninStore();

export default signinStore;
export { SigninStore };
