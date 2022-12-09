const express = require("express");
const app = express();
const mysql = require("promise-mysql");
require("dotenv").config();

const categoriesRoute = require("./Route/categoriesRoute");
const toysRoute = require("./Route/toysRoute");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connectionOptions = {
  host: process.env.HOST,
  database: process.env.DATABASE,
  user: process.env.USERDB,
  password: process.env.PASSWORD,
  port: process.env.PORT,
};
const port = 5000;

mysql.createConnection(connectionOptions).then(async (db) => {
  app.get("/", (req, res) => {
    res.json("bien connecté");
  });

  categoriesRoute(app, db);

  toysRoute(app, db);
});

app.listen(port, () => {
  console.log(`Server is running on port: http://localhost:${port}`);
});
