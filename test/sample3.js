import { RequestLogger } from 'testcafe';
import { adminUser, normalUser } from './roles';
import { routes } from './routes';
import { getWindowLocation } from './untils/getWindowLocation';
import UserListPage from './pages/userList';

const userListPage = new UserListPage();
const genLogger = filter => RequestLogger(
  filter,
  { logResponseBody: true, stringifyResponseBody: true }
);

const userListLogger = genLogger({
  url: /user/,
  method: 'GET',
});

fixture('User List Page')
  .page(routes.userList);

test
.requestHooks(userListLogger)
('List Success', async t => {
  await t.useRole(adminUser);
  const res = await userListLogger.requests[0];
  const payload = JSON.parse(res.response.body);
  await userListPage.checkRowRender(payload);
});