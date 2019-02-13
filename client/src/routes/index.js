import Vue from 'vue';
import Router from 'vue-router';
import { map, contains, isEqual } from 'lodash/fp';

import Login from '@/views/Login.vue';
import Users from '@/views/Users.vue';

Vue.use(Router);

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/users',
    name: 'users',
    component: Users,
  },
];

const router = new Router({ routes });

const allPaths = map('path', routes);

router.beforeEach((to, from, next) => {
  const hasPath = contains(to.path, allPaths);
  if (hasPath) next();
  else next('/login');
});

export default router;
