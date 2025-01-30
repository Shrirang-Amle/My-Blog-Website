const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "ShriRam@24",
  database: "blogDB"
});

db.connect(err => {
  if (err) throw err;
  console.log("MySQL Connected...");
});

app.post("/blogs", (req, res) => {
  const { title, content, author } = req.body;
  const sql = "INSERT INTO blogs (title, content, author, timestamp) VALUES (?, ?, ?, NOW())";
  db.query(sql, [title, content, author], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, title, content, author });
  });
});

app.get("/blogs", (req, res) => {
  db.query("SELECT * FROM blogs", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.delete("/blogs/:id", (req, res) => {
  db.query("DELETE FROM blogs WHERE id = ?", [req.params.id], (err) => {
    if (err) throw err;
    res.json({ message: "Blog deleted" });
  });
});

app.listen(5000, () => console.log("Server running on port 5000"));