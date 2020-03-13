import { observable, action } from 'mobx';

class HeaderStore {
  @observable isOpenMenu = false;

  @action.bound
  openMenu() {
    this.isOpenMenu = !this.isOpenMenu;
  }
}
const headerStore = new HeaderStore();

export default headerStore;
export { HeaderStore };
