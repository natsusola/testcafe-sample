const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const users = require('./routers/users');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/users', users);

app.listen(port, () => {
  console.log(`Server started at port: ${port}`);
});