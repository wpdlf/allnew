const express = require('express')
const bodyParser = require('body-parser')
const mysql = require("sync-mysql")
const env = require("dotenv").config({ path: "../../.env" });

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
    const result = connection.query("SELECT * FROM user");
    console.log(result);
    // res.send(result);
    res.writeHead(200);
    var template = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <link type="text/css" rel="stylesheet" href="table.css">
        </head>
        <body>
            <table style="margin:auto; text-align:center;">
                <thead>
                    <tr><th>User ID</th><th>Password</th></tr>
                </thead>
                <tbody>
                `;
    for (var i = 0; i < result.length; i++) {
        template += `
        <tr>
            <td>${result[i]['userid']}</td>
            <td>${result[i]['passwd']}</td>
        </tr>
        `;
    }
    template += `
                </tbody>
            </table>
        </body>
        </html>
    `;
    res.end(template);
});

// request 1, query 0
app.post("/select", (req, res) => {
    const result = connection.query("select * from user");
    console.log(result);
    res.send(result)
});

// request 1, query 1
app.get("/selectQuery", (req, res) => {
    const id = req.query.userid;
    const result = connection.query("select * from user where userid=?", [id]);
    console.log(result);
    // res.send(result)

    if (result.length == 0) {
        res.writeHead(200);
        var template2 = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <link type="text/css" rel="stylesheet" href="table.css">
        </head>
        <body>
            <span>데이터가 없습니다!</span>
        </body>
        </html>
    `;
        res.end(template2);
    } else {
        res.writeHead(200);
        var template = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <link type="text/css" rel="stylesheet" href="table.css">
        </head>
        <body>
            <table style="margin:auto; text-align:center;">
                <thead>
                    <tr><th>User ID</th><th>Password</th></tr>
                </thead>
                <tbody>
                `;
        for (var i = 0; i < result.length; i++) {
            template += `
        <tr>
            <td>${result[i]['userid']}</td>
            <td>${result[i]['passwd']}</td>
        </tr>
        `;
        }
        template += `
                </tbody>
            </table>
        </body>
        </html>
    `;
        res.end(template);
    }
});

// request 1, query 1
app.post("/selectQuery", (req, res) => {
    const id = req.body.id;
    const result = connection.query("select * from user where userid=?", [id]);
    console.log(result);
    res.send(result)
});

// request 1, query 1
app.post("/insert", (req, res) => {
    const { id, pw } = req.body;
    const result = connection.query("insert into user values (?, ?)", [id, pw]);
    console.log(result);
    res.redirect('/selectQuery?userid=' + req.body.id);
});

// request 1, query 1
app.post("/update", (req, res) => {
    const { id, pw } = req.body;
    const result = connection.query("update user set passwd=? where userid=?", [pw, id]);
    console.log(result);
    res.redirect('/selectQuery?userid=' + req.body.id);
});

// request 1, query 1
app.post("/delete", (req, res) => {
    const id = req.body.id;
    const result = connection.query("delete from user where userid=?", [id]);
    console.log(result);
    res.redirect('/select');
});

module.exports = app;