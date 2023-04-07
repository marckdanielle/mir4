const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const path = require('path')

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
	user: "root",
	host: "localhost",
	password: "password",
	database: "mir4"
});

const _dirname = path.dirname("");
const buildPath = path.join(_dirname, '../client/build');

app.use(express.static(buildPath))

app.get("/*", function(req, res) {
  res.sendFile(
    path.join(__dirname, "./client/build/index.html"),
    function(err) {
      if(err) {
        res.status(500).send(err);
      }
    }
  );
});


app.post("/create-roster", (req, res) => {
  const ign = req.body.ign;
  const level = req.body.level;
  const clan = req.body.clan;
  const ps = req.body.ps;

  db.query(
    "INSERT INTO members (ign, level, clan, ps) VALUES (?,?,?,?)",
    [ign, level, clan, ps],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.get("/get-roster", (req, res) => {
  db.query("SELECT * FROM members", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/update-roster", (req, res) => {
  console.log(req.body.idmembers);
  const id = req.body.idmembers;
  const ign = req.body.ign;
  const level = req.body.level;
  const ps = req.body.ps;
  const clan = req.body.clan;
  db.query(
    "UPDATE members SET ign = ?, level = ?, ps = ?, clan = ? WHERE idmembers = ?",
    [ign, level, ps, clan, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM employees WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});