import { Role } from 'testcafe';
import { url } from '../untils/config';
import LoginPage from '../pages/login';

const loginUrl = `${url}/#/login`;
const loginPage = new LoginPage();

const genRole = data => Role(
  loginUrl,
  async t => {
    await loginPage.login(data);
  },
  { preserveUrl: true },
);

export const adminUser = genRole({
  account: 'admin',
  password: '123',
});

export const normalUser = genRole({
  account: 'user1',
  password: '123',
});
