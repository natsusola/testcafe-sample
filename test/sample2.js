import { adminUser } from './roles';
import { routes } from './routes';
import { getWindowLocation } from './untils/getWindowLocation';

fixture('Login Page')
  .page(routes.login);

test('Login Success', async t => {
  await t.useRole(adminUser);

  const location = await getWindowLocation();

  await t
    .expect(location.href)
    .notContains('login', 'Login failed');
});