const express = require('express');
const bodyParser = require('body-parser');
const mysql = require("sync-mysql");
const env = require("dotenv").config({ path: "../../.env" });
//const pretty = require("pretty-format");

var connection = new mysql({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
});

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/hello', (req, res) => {
    res.send('Helllo World~!!')
});

// request 0, query 0
app.get("/select", (req, res) => {
    const result = connection.query("SELECT * FROM users");
    console.log(result);
    res.send(JSON.stringify(result));
});

// request 1, query 0
app.post("/select", (req, res) => {
    const result = connection.query("select * from users");
    console.log(result);
    res.send(JSON.stringify(result));
});

// request 1, query 1
app.get("/selectQuery", (req, res) => {
    const id = req.query.userid;
    const result = connection.query("select * from users where userid=?", [id]);
    console.log(result);
    res.send(result)
});

// request 1, query 1
app.post("/selectQuery", (req, res) => {
    const id = req.body.userid;
    const result = connection.query("select * from users where userid=?", [id]);
    console.log(result);
    res.send(result)
});

// request 1, query 1
app.post("/insert", (req, res) => {
    const { id, name, gender, age, loc } = req.body;
    const result = connection.query("insert into users values (?, ?, ?, ?, ?)", [id, name, gender, age, loc]);
    console.log(result);
    res.redirect('/selectQuery?userid=' + req.body.id);
});

// request 1, query 1
app.post("/update", (req, res) => {
    const { id, name, gender, age, loc } = req.body;
    const result = connection.query("update users set username=?, gender=?, age=?, location=? where userid=?", [name, gender, age, loc, id]);
    console.log(result);
    res.redirect('/selectQuery?userid=' + req.body.id);
});

// request 1, query 1
app.post("/delete", (req, res) => {
    const id = req.body.id;
    const result = connection.query("delete from users where userid=?", [id]);
    console.log(result);
    res.redirect('/select');
});

module.exports = app;