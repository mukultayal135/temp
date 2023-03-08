const express = require('express');
const dotenv = require('dotenv');
const userRouter = require('./src/routes/users');

const app = express();
const port = 4000;
dotenv.config();

app.use(express.json());
app.use('/', userRouter);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
