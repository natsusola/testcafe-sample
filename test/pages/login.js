import { Selector, t } from 'testcafe';

export default class LoginPage {
  inputAccount = Selector('#input-account');
  inputPassword = Selector('#input-password');
  btnLogin = Selector('#btn-login');
  hintLoginError = Selector('#hitn-login-error');

  async login({ account, password }) {
    await t
      .typeText(this.inputAccount, account)
      .typeText(this.inputPassword, password)
      .click(this.btnLogin);
  }
}
