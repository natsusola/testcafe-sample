import { Selector, ClientFunction, RequestLogger } from 'testcafe';
import { url } from './untils/config';

const getWindowLocation = ClientFunction(() => window.location);

const logger = new RequestLogger(
  { url: /login/, method: 'POST' },
  { logResponseBody: true, stringifyResponseBody: true }
);

fixture('Login Page')
  .page(`${url}/#/login`);

// 登入後是否成成功跳轉頁面
test
.requestHooks(logger)
('Login Success', async t => {
  const inputAccount = Selector('#input-account');
  const inputPassword = Selector('#input-password');
  const btnLogin = Selector('#btn-login');

  await t
    .setTestSpeed(1)
    .typeText(inputAccount, 'admin')
    .typeText(inputPassword, '123')
    .click(btnLogin);

  const location = await getWindowLocation();
  console.log(logger.requests[0]);
  await t
    .expect(location.href)
    .notContains('login', 'Login failed');
});

// 帳號密碼錯誤是否顯示錯誤訊息
test
.requestHooks(logger)
('Login Fail', async t => {
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
  console.log(logger.requests[0]);
  await t
    .expect(!!errorMsg)
    .ok('No error message.');
});