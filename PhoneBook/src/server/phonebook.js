const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "phonebook",
});

const bodyParser = require("body-parser");
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
      res.send(result);
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

app.get("/searchContacts", (req, res) => {
  const searchParams = req.query.phoneNumber;
  const phoneNumber = searchParams;
  console.log("Phone Number:", searchParams);
  const query = `SELECT * FROM contacts WHERE PhoneNumber=${phoneNumber}`;
  db.query(query, (err, result) => {
    if (err) {
      console.error("Error selecting contacts from database: " + err.stack);
      res.status(500).send("Error selecting contacts from database");
      return;
    }
    console.log("Contact selected from database successfully:", result);
    res.send(JSON.stringify(result));
  });
});

// Handle DELETE request to /deleteContact
app.delete("/deleteContact", (req, res) => {
  const phoneNumber = req.query.phoneNumber;
  // Delete contact from database
  console.log(phoneNumber);
  const sqlq = `DELETE FROM contacts WHERE PhoneNumber =${phoneNumber}`;
  const phoneNumbersToDelete = phoneNumber;
  const sql = `DELETE FROM contacts WHERE PhoneNumber IN (${phoneNumbersToDelete})`;

  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
    console.log(`Deleted ${result.affectedRows} rows from contacts table.`);
    res.send(JSON.stringify(result));
  });
});

app.put("/UpdateContacts", (req, res) => {
  const {
    FirstName,
    LastName,
    PhoneNumber,
    Email,
    ContactImage,
    PhysicalAddress,
  } = req.body;

  const sql = `UPDATE contacts SET FirstName = ?, LastName = ?, PhoneNumber = ?, Email = ?, ContactImage = ?, PhysicalAddress = ? WHERE PhoneNumber = ?`;
  db.query(
    sql,
    [
      FirstName,
      LastName,
      PhoneNumber,
      Email,
      ContactImage,
      PhysicalAddress,
      PhoneNumber,
    ],
    (err, result) => {
      if (err) {
        console.error("Error updating contact in database: " + err.stack);
        res.status(500).send("Error updating contact in database");
        return;
      }
      console.log("Contact updated in database with id " + PhoneNumber);
      res.send(result);
    }
  );
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
