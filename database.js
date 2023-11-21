const mysql = require("mysql2");
const express = require("express");
const uuid = require("uuid");
const dotEnv = require("dotenv");
;
dotEnv.config();
const app = express();
app.use(express.json());

const connection = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
});

connection.connect((error) => {
  if (error) {
    console.error("Error connecting to MySQL database:", error);
  } else {
    console.log("Connected to MySQL database!");
  }
});

app.get("/", (req, res) => {
  res.send("hi");
});

app.post("/emp", (req, res) => {
  try {
    const empName = req.body.name;
    const empMail = req.body.mail;
    const empId = uuid.v4();
    const checkingQuery = `SELECT empName FROM empDetails WHERE empEmail="${empMail}"`;
    connection.query(checkingQuery, (error, result) => {
      if (result.length !== 0) {
        return res.end("given mail id is already used");
      }
    });
    const sql = `INSERT INTO empDetails (empId, empName,empEmail) VALUES ("${empId}","${empName}","${empMail}")`;
    connection.query(sql, function (err, result) {
      "";
      if (err) {
        return console.log(err);
      }
      res.end("added to employee details table");
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/customer", (req, res) => {
  try {
    const customerName = req.body.name;
    const customerMail = req.body.mail;
    const customerNumber = req.body.phoneNumber;
    const customerId = uuid.v4();
    const checkingQuery = `SELECT customerName FROM customerDetails WHERE customerEmail="${customerMail}"`;
    connection.query(checkingQuery, (error, result) => {
      if (error) {
        console.log(error);
        return;
      }
      if (result.length !== 0) {
        return res.end("given mail id is already used");
      }
    });
    const sql = `INSERT INTO customerDetails (id, customerName,customerEmail,customerPhoneNumber) VALUES ("${customerId}","${customerName}","${customerMail}","${customerNumber}")`;
    connection.query(sql, (err, result) => {
      if (err) {
        return console.log(err);
      }
      res.end("added to customer details table");
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen("3000", () => {
  console.log("server started on port 3000");
});
