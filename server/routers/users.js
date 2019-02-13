const express = require('express');
const { find, omit } = require('lodash/fp');

const router = express.Router();

const users = [
  {
    account: 'admin',
    password: '123',
    email: 'admin@a.com',
    isAdmin: true,
  },
  {
    account: 'user1',
    password: '123',
    email: 'user1@a.com',
    isAdmin: false,
  },
  {
    account: 'user2',
    password: '123',
    email: 'user2@a.com',
    isAdmin: false,
  },
];

router.post('/login', (req, res) => {
  const { body } = req;
  const user = find(
    o => o.account === body.account && o.password === body.password,
    users,
  );

  if (user) res.send(omit(['password'], user));
  else res.status(403).send({ message: '帳號密碼錯誤' });
});

router.get('/', (req, res) => {
  res.send({
    data: users,
    total: users.length,
  });
});

module.exports = router;