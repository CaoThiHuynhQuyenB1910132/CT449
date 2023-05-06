//inmports
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();
const port = process.env.PORT || 5000;

//middlewares
app.use(cors({
  origin: "http://localhost:8080",
  credentials: true,
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));

//mongoose connection
mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
  })
  .then(() => console.log("connected to the database"))
  .catch((error) => console.log(error));

//routers prefix

app.use('/api/books', require('./routes/routes'));

//start server
app.listen(port, () =>
  console.log(`server running at http://localhost:${port}`)
);



