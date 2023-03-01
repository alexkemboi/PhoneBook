const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "phonebook",
});
app.use(bodyParser.json());
app.use(cors());
db.connect((err) => {
  if (err) {
    console.error("Error connecting to database: " + err.stack);
    return;
  }
  console.log("Connected to database as id " + db.threadId);
});

app.post("/contacts", (req, res) => {
  const {
    FirstName,
    LastName,
    PhoneNumber,
    Email,
    ContactImage,
    PhysicalAddress,
  } = req.body;

  const sql = `INSERT INTO contacts (FirstName,LastName,PhoneNumber,Email,ContactImage,PhysicalAddress)
                  VALUES (?, ?, ?, ?, ?, ?)`;
  db.query(
    sql,
    [FirstName, LastName, PhoneNumber, Email, ContactImage, PhysicalAddress],
    (err, result) => {
      if (err) {
        console.error("Error inserting contact into database: " + err.stack);
        res.status(500).send("Error inserting contact into database");
        return;
      }
      console.log("Contact inserted into database with id " + result.insertId);
      res.send("Contact inserted into database with id " + result.insertId);
    }
  );
});

app.get("/getContacts", (req, res) => {
  const sql = `SELECT * FROM contacts`;
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error selecting contacts from database: " + err.stack);
      res.status(500).send("Error selecting contacts from database");
      return;
    }
    console.log("Contact selected from database succesfully ");
    res.send(JSON.stringify(result));
    //result.setHeader("Content-Type", "application/json");
  });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});