import { toJS } from 'mobx';
import Validator from 'validatorjs';

export default class SignValidation {
  get formValues() {
    const formData = {};
    const form = toJS(this.form).fields;

    for (const key in form) {
      formData[key] = form[key].value;
    }

    return formData;
  }

  constructor(form) {
    this.form = form;

    this._checkAndUpdateValidator();
  }

  onFieldChange(field, value) {
    this.form.fields[field].value = value;

    this._checkAndUpdateValidator();

    this.form.fields[field].error = this._validation.errors.first(field);
  }

  clearForm() {
    const form = toJS(this.form).fields;

    for (const key in form) {
      const formField = this.form.fields[key];

      if (Object.prototype.hasOwnProperty.call(formField, 'error')) {
        this.form.fields[key].error = null;
      }

      if (Object.prototype.hasOwnProperty.call(formField, 'value')) {
        this.form.fields[key].value = '';
      }
    }
  }

  onFormCheckValid() {
    this._checkAndUpdateValidator();

    if (this._validation.check()) {
      return true;
    }

    const foundErrors = this._validation.errors.all();

    for (const key in foundErrors) {
    // eslint-disable-next-line prefer-destructuring
      this.form.fields[key].error = foundErrors[key][0];
    }
    return false;
  }

  _checkAndUpdateValidator() {
    const { email, password } = this.form.fields;

    this._validation = new Validator(
      { email: email.value, password: password.value },
      { email: email.rule, password: password.rule },
    );

    this.form.meta.isValid = this._validation.passes();
    this.form.meta.error = this._validation.errors.all();
  }
}
