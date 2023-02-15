const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();
const app = express();

app.use(express.json());
app.use(cors());

const routerApi = require('./api');
app.use('api', routerApi);

app.use((_, res, __) => {
  res.status(404).json({
    success: false,
    code: 404,
    message: 'Page not found',
  });
});

app.use((error, _, res, __) => {
  console.log(error);
  res.status(500).json({
    success: false,
    code: 500,
    message: 'Internal Server Error',
  });
});

const DB_HOST =
  'mongodb+srv://IvanDovhopol:Le_Mon310102@users.qs4zw4l.mongodb.net/?retryWrites=true&w=majority';

const PORT = process.env.PORT || 3000;
const uriDb = process.env.DB_HOST;

const connection = mongoose.connect(DB_HOST, {
  promiseLibrary: global.Promise,
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

connection
  .then(() => {
    app.listen(PORT, () => console.log(`server running on port ${PORT}`));
  })
  .catch(error =>
    console.log(`server not running. Error message: ${error.message}`)
  );
 