const express = require('express');
const cors = require('cors');

const bodyParser = require('body-parser');

const app = express();

const routers = require('../routers');
const middlewares = require('../middlewares');

app.use(bodyParser.json());

app.use(cors());

app.use('/remedy', routers.remedyRouter);
app.use('/maker', routers.makerRouter);
app.use('/react', routers.reactRouter);

app.use(middlewares.error);

module.exports = app;
