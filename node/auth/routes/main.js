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
    res.send('관리자 페이지입니다.')
});

// request 0, query 0
app.get("/select", (req, res) => {
    const result = connection.query("SELECT * FROM user");
    console.log(result);
    // res.send(result);
    if (result.length == 0) {
        res.send(
            `<script>
                alert('테이블이 비어있습니다. 데이터를 입력해주세요!');
            </script>`
        );
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

// request 1, query 0
app.post("/select", (req, res) => {
    const result = connection.query("select * from user");
    console.log(JSON.stringify(result));
    res.send(JSON.stringify({ result }))
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
            <span>데이터가 없습니다!</span>
            <span>데이터가 없습니다!</span>
            <span>데이터가 없습니다!</span>
            <span>데이터가 없습니다!</span>
            <span>데이터가 없습니다!</span>
            <span>데이터가 없습니다!</span>
            <span>데이터가 없습니다!</span>
            <span>데이터가 없습니다!</span>
            <span>데이터가 없습니다!</span>
            <span>데이터가 없습니다!</span>
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
    const id = req.body.userid;
    const result = connection.query("select * from user where userid=?", [id]);
    console.log(result);
    res.send(result)
});

// request 1, query 1
app.post("/insert", (req, res) => {
    const { id, pw } = req.body;
    const result = connection.query("select * from user where userid=?", [id]);

    if (id.length == 0 || pw.length == 0) {
        res.send(
            `<script>
                alert('Userid와 Password 두가지 모두 입력해주세요!');
            </script>`
        );
    } else {
        if (result.length > 0) {
            res.send(
                `<script>
                alert('중복된 Userid입니다. 다시 입력해주세요!');
            </script>`
            );
        } else {
            connection.query("insert into user values (?, ?)", [id, pw]);
            res.redirect('/select');
        }
    }
});

// request 1, query 1
app.post("/update", (req, res) => {
    const { id, pw } = req.body;
    let result2 = connection.query("select * from user where userid=?", [id]);

    if (result2.length == 0) {
        res.send(
            `<script>
                alert('사용자를 찾을 수 없습니다. Userid를 확인해주세요!');
            </script>`
        );
    }
    else if (result2.length != 0) {
        if (pw.length == 0) {
            res.send(
                `<script>
                alert('Password를 입력해주세요!');
                </script>`
            );
            res.redirect('admin_page.html');
        }
    } else {
        connection.query("update user set passwd=? where userid=?", [pw, id]);
        res.redirect('/selectQuery?userid=' + req.body.id);
    }
});

// request 1, query 1
app.post("/delete", (req, res) => {
    const id = req.body.id;
    let result2 = connection.query("select * from user where userid=?", [id]);

    if (result2.length == 0) {
        res.send(
            `<script>
                alert('사용자를 찾을 수 없습니다. Userid를 확인해주세요!');
            </script>`
        );
    } else {
        connection.query("delete from user where userid=?", [id]);
        res.redirect('/select');
    }
});





app.post("/login", (req, res) => {
    const { id, pw } = req.body;
    const result = connection.query("select * from user where userid=? and passwd=?", [id, pw]);
    if (result.length == 0) {
        res.redirect('error.html');
    }
    else {
        if (id == 'admin') {
            res.redirect('admin_page.html');
            return console.log(id + " 사용자로 로그인했습니다.");
        }
        else if (id == 'root') {
            res.redirect('member.html');
            return console.log(id + " 사용자로 로그인했습니다.");
        }
        res.redirect('main.html');
        return console.log(id + " 사용자로 로그인했습니다.");
    }
});

app.post("/register", (req, res) => {
    const { id, pw } = req.body;

    if (id.length == 0 || pw.length == 0) {
        res.send(
            `<script>
                alert('Userid와 Password 두가지 모두 입력해주세요!');
            </script>`
        );
        res.redirect('register.html');
    } else {
        let result = connection.query("select * from user where userid=?", [id]);
        console.log(result);
        if (result.length > 0) {
            res.writeHead(200);
            var template = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Error</title>
                <meta charset="utf-8">
                <link type="text/css" rel="stylesheet" href="mystyle.css">
            </head>
            <body>
                <nav id="menubar">
                    <ul>
                        <li><a href="index.html">Home</a></li>
                        <li><a href="#">About Me</a></li>
                        <li style="float: right;"><a href="login.html">Login</a></li>
                    </ul>
                </nav>
                <h2>Register Failed</h2>
                <hr><br><br>
                <div id="input_TryAg">
                    <input style="width: 100px; height: 50px;" type="button" value="Try Again" onClick="location.href='register.html'">
                </div>
            </body>
            </html>
            `;
            res.end(template);
        } else {
            connection.query("insert into user values (?, ?)", [id, pw]);
            res.redirect('login.html');
        }
    }
});

module.exports = app;