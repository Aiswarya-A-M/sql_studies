const mysql = require("mysql2");
const express = require("express");
const dotEnv = require("dotenv");

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

app.post("/student", (req, res) => {
  try {
    const studentName = req.body.name;
    const studentLocation = req.body.location;
    const deptNo = req.body.no;
    const sql = `INSERT INTO studentTable (studentName, studentLocation,deptNO) VALUES ("${studentName}","${studentLocation}","${deptNo}")`;
    connection.query(sql, function (error, result) {
      if (error) {
        return console.log(error);
      }
      res.end("added to student table");
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/teacher", (req, res) => {
  try {
    const teacherName = req.body.name;
    const teacherSalary = req.body.salary;
    const teacherNo = req.body.no;
    const sql = `INSERT INTO teacherDetails (teacherName,teacherSalary,deptNO) VALUES ("${teacherName}","${teacherSalary}","${teacherNo}")`;
    connection.query(sql, (error, result) => {
      if (error) {
        return console.log(error);
      }
      res.end("added to teacher details table");
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/count", (req, res) => {
  try {
    const sql = `SELECT COUNT(studentName) AS count FROM studentTable`;
    connection.query(sql, (error, result) => {
      if (error) {
        return console.log(error);
      }
      res.send(`count of students ${result[0].count}`);
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/sum", (req, res) => {
  try {
    const sql = `SELECT SUM(teacherSalary) AS sum FROM teacherDetails`;
    connection.query(sql, (error, result) => {
      if (error) {
        return console.log(error);
      }
      res.send(`total salary of teachers,${result[0].sum}`);
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/avg", (req, res) => {
  try {
    const sql = `SELECT AVG(teacherSalary) AS avg FROM teacherDetails`;
    connection.query(sql, (error, result) => {
      if (error) {
        return console.log(error);
      }
      res.send(`average value of salary,${result[0].avg}`);
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/max", (req, res) => {
  try {
    const sql = `SELECT MAX(teacherSalary) AS max FROM teacherDetails`;
    connection.query(sql, (error, result) => {
      if (error) {
        return console.log(error);
      }
      res.send(`maximum salary of teachers ${result[0].max}`);
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/min", (req, res) => {
  try {
    const sql = `SELECT MIN(teacherSalary) AS min FROM teacherDetails`;
    connection.query(sql, (error, result) => {
      if (error) {
        return console.log(error);
      }
      res.send(`minimum salary of teachers ${result[0].min}`);
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/last", (req, res) => {
  try {
    const sql = `SELECT studentLocation FROM studentTable ORDER BY studentId DESC LIMIT 1`;
    connection.query(sql, (error, result) => {
      if (error) {
        return console.log(error);
      }
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/first", (req, res) => {
  try {
    const sql = `SELECT * FROM teacherDetails LIMIT 1`;
    connection.query(sql, (error, result) => {
      if (error) {
        return console.log(error);
      }
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/concat", (req, res) => {
  try {
    const sql = `SELECT studentLocation, group_concat(studentName) as "name" FROM studentTable group by studentLocation;`;
    connection.query(sql, (error, result) => {
      if (error) {
        return console.log(error);
      }
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen("3000", () => {
  console.log("server started on port 3000");
});
