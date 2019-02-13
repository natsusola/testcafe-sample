import { Selector, ClientFunction } from 'testcafe';
import { url } from './untils/config';

const getWindowLocation = ClientFunction(() => window.location);

fixture('Login Page')
  .page(`${url}/#/login`);

// 登入後是否成成功跳轉頁面
test('Login Success', async t => {
  const inputAccount = Selector('#input-account');
  const inputPassword = Selector('#input-password');
  const btnLogin = Selector('#btn-login');

  
  await t
    .setTestSpeed(1)
    .typeText(inputAccount, 'admin')
    .typeText(inputPassword, '123')
    .click(btnLogin);

  const location = await getWindowLocation();

  await t
    .expect(location.href)
    .notContains('login', 'Do not redirect.');
});

// 帳號密碼錯誤是否顯示錯誤訊息
test('Login Fail', async t => {
  const inputAccount = Selector('#input-account');
  const inputPassword = Selector('#input-password');
  const btnLogin = Selector('#btn-login');
  const hintLoginError = Selector('#hint-login-error');
  
  await t
    .setTestSpeed(1)
    .typeText(inputAccount, 'aaa')
    .typeText(inputPassword, '111')
    .click(btnLogin);

  const errorMsg = await hintLoginError.innerText;
  
  await t
    .expect(!!errorMsg)
    .ok('No error message.');
});