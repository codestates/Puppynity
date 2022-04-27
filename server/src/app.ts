import express from 'express';

const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
// const { sequelize } = require('./models');

const indexRouter = require('./routes/index');

dotenv.config();
const app: express.Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// index 라우팅
app.use('/', indexRouter);

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Hello Puppynity Fuck typescript');
});

export default app;
