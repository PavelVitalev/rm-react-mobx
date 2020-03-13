import { observable, action } from 'mobx';
import axios from 'axios';

export const getToken = () => {
  const token = localStorage.getItem('token');
  return JSON.parse(token) || '';
};

class IsAuthentication {
  @observable isAuth = false;

  @observable isPending = false;

  @observable user = {};

  @action
  setIsAuth(value) {
    this.isAuth = value;
  }

  @action
  setIsPending(value) {
    this.isPending = value;
  }

  @action.bound
  checkIsAuth() {
    // eslint-disable-next-line prefer-destructuring
    const CancelToken = axios.CancelToken;
    let cancel;

    this.setIsPending(true);

    axios.get('/users/current', {
      cancelToken: new CancelToken((c) => {
        cancel = c;
      })
    })
      .then((response) => {
        if (response && response.data && response.data.success) {
          this.setIsAuth(true);
          this.setIsPending(false);
          this.user = response.data.data.user;
        } else {
          this.setIsAuth(false);
          this.setIsPending(false);
        }
      })
      .catch((error) => {
        console.warn(error);
        if (error && error.data && !error.data.success) {
          this.setIsAuth(false);
          this.setIsPending(false);
        }
      });

    if (!getToken().length) {
      cancel();
      this.setIsPending(false);
    }
  }
}

const isAuthentication = new IsAuthentication();

export default isAuthentication;
export { IsAuthentication };
