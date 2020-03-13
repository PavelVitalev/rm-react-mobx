import { observable, action, toJS } from 'mobx';
import axios from 'axios';

import SignValidation from 'utils/validation/signin';

class SignupStore {
  validation = new SignValidation(this.form);

  @observable
  errorMessage = '';

  get formValues() {
    const formData = {};
    const form = toJS(this.form).fields;

    for (const key in form) {
      formData[key] = form[key].value;
    }

    return formData;
  }

  @observable
  form = {
    fields: {
      email: {
        value: '',
        error: null,
        rule: 'required|email'
      },
      name: {
        value: ''
      },
      password: {
        value: '',
        error: null,
        rule: 'required'
      },
    },
    meta: {
      isValid: false,
      error: null,
    },
  };

  @observable
  isLoading = false;

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
  setErrorMessage(message) {
    this.errorMessage = message;
  }

  @action
  signUp = (event, history) => {
    event.preventDefault();

    this.validation.onFormCheckValid();
    this.setIsLoading(true);
    axios.post('/auth/signup', { ...this.formValues })
      .then((response) => {
        this.setIsLoading(false);

        if (response && !response.statusText === 'OK') {
          return;
        }

        const { token } = response.data.data;
        localStorage.setItem('token', JSON.stringify(token));

        axios.defaults.headers.common['authorization'] = token;

        this.clearForm();
        history.push('/boards');
      })
      .catch((error) => {
        if (error && error.data && !error.data.success && error.data.message) {
          this.setErrorMessage(error.data.message);

          setTimeout(() => {
            this.setErrorMessage('');
          }, 1000);
        }
        this.setIsLoading(false);
        console.warn(error);
      });
  };
}

const signupStore = new SignupStore();

export default signupStore;
export { SignupStore };
