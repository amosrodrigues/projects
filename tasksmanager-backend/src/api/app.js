const express = require('express');
const cors = require('cors');

const bodyParser = require('body-parser');

const app = express();

const routers = require('../routers');
const middlewares = require('../middlewares');

app.use(bodyParser.json());

app.use(cors());

app.use('/users', routers.userRouter);
app.use('/login', routers.loginRouter);
app.use('/tasks', routers.taskRouter);

app.use(middlewares.error);

module.exports = app;
