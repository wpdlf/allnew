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

// function show_table(result, res) {
//     res.writeHead(200);
//     var template = `
//         <!DOCTYPE html>
//         <html>
//         <head>
//             <meta charset="utf-8">
//             <link type="text/css" rel="stylesheet" href="table.css">
//         </head>
//         <body>
//             <table style="margin:auto; text-align:center;">
//                 <thead>
//                     <tr><th>User ID</th><th>Password</th></tr>
//                 </thead>
//                 <tbody>
//                 `;
//     for (var i = 0; i < result.length; i++) {
//         template += `
//         <tr>
//             <td>${result[i]['id']}</td>
//             <td>${result[i]['name']}</td>
//             <td>${result[i]['category']}</td>
//             <td>${result[i]['temp_min']}</td>
//             <td>${result[i]['temp_max']}</td>
//         </tr>
//         `;
//     }
//     template += `
//                 </tbody>
//             </table>
//         </body>
//         </html>
//     `;
//     res.end(template);
// }

// function cantfind_id(res) {
//     res.send(
//         `<script>
//                 alert('사용자를 찾을 수 없습니다. Userid를 확인해주세요!');
//             </script>`
//     );
// }

// app.get('/hello', (req, res) => {
//     res.send('관리자 페이지입니다.')
// });

// request 0, query 0
// app.get("/select", (req, res) => {
//     const result = connection.query("SELECT * FROM user");
//     console.log(result);
//     // res.send(result);
//     if (result.length == 0) {
//         res.send(
//             `<script>
//                 alert('테이블이 비어있습니다. 데이터를 입력해주세요!');
//             </script>`
//         );
//     } else {
//         show_table(result, res);
//     }
// });

// request 1, query 0
// app.post("/select", (req, res) => {
//     const result = connection.query("select * from user");
//     console.log(JSON.stringify(result));
//     res.send(JSON.stringify({ result }))
// });

// request 1, query 1
// app.get("/selectQuery", (req, res) => {
//     const id = req.query.userid;
//     const result = connection.query("select * from user where userid=?", [id]);
//     console.log(result);
//     // res.send(result)

//     if (result.length == 0) {
//         res.writeHead(200);
//         var template2 = `
//         <!DOCTYPE html>
//         <html>
//         <head>
//             <meta charset="utf-8">
//             <link type="text/css" rel="stylesheet" href="table.css">
//         </head>
//         <body>
//             <span>데이터가 없습니다!</span>
//             <span>데이터가 없습니다!</span>
//             <span>데이터가 없습니다!</span>
//             <span>데이터가 없습니다!</span>
//             <span>데이터가 없습니다!</span>
//             <span>데이터가 없습니다!</span>
//             <span>데이터가 없습니다!</span>
//             <span>데이터가 없습니다!</span>
//             <span>데이터가 없습니다!</span>
//             <span>데이터가 없습니다!</span>
//             <span>데이터가 없습니다!</span>
//             <span>데이터가 없습니다!</span>
//         </body>
//         </html>
//     `;
//         res.end(template2);
//     } else {
//         show_table(result, res);
//     }
// });

// // request 1, query 1
// app.post("/selectQuery", (req, res) => {
//     const id = req.body.id;
//     const result = connection.query("select * from user where userid=?", [id]);
//     console.log(result);
//     res.send(result)
// });

// // request 1, query 1
// app.post("/update", (req, res) => {
//     const { id, pw } = req.body;
//     let result2 = connection.query("select * from user where userid=?", [id]);

//     if (result2.length == 0) {
//         cantfind_id(res);
//     }
//     else if (result2.length != 0) {
//         if (pw.length == 0) {
//             res.send(
//                 `<script>
//                     alert('Password를 입력해주세요!');
//                 </script>`
//             );
//             res.redirect('admin_page.html');
//         }
//     } else {
//         connection.query("update user set passwd=? where userid=?", [pw, id]);
//         res.redirect('/selectQuery?userid=' + req.body.id);
//     }
// });

// // request 1, query 1
// app.post("/delete", (req, res) => {
//     const id = req.body.id;
//     let result2 = connection.query("select * from user where userid=?", [id]);

//     if (result2.length == 0) {
//         cantfind_id(res);
//     } else {
//         connection.query("delete from user where userid=?", [id]);
//         res.send(
//             `<script>
//                 alert('계정이 삭제 되었습니다!');
//             </script>`
//         );
//     }
// });

// app.post("/login", (req, res) => {
//     const { id, pw } = req.body;
//     const result = connection.query("select * from user where userid=? and passwd=?", [id, pw]);

//     if (result.length == 0) {
//         res.redirect('error.html');
//     }
//     else {
//         if (id == 'admin') {
//             console.log(id + " => Administrator Logined")
//             res.redirect('admin_page.html?id=' + id);
//         }
//         else if (id == 'root') {
//             console.log(id + " => Root Logined")
//             res.redirect('member.html');
//         }
//         console.log(id + " => User Logined")
//         res.redirect('main.html?id=' + id)
//     }
// });

// app.post("/register", (req, res) => {
//     const { id, pw } = req.body;

//     if (id.length == 0 || pw.length == 0) {
//         res.send(
//             `<script>
//                 alert('Userid와 Password 두가지 모두 입력해주세요!');
//             </script>`
//         );
//         res.redirect('register.html');
//     } else {
//         let result = connection.query("select * from user where userid=?", [id]);
//         console.log(result);
//         if (result.length > 0) {
//             res.writeHead(200);
//             var template = `
//             <!DOCTYPE html>
//             <html>
//             <head>
//                 <title>Error</title>
//                 <meta charset="utf-8">
//                 <link type="text/css" rel="stylesheet" href="mystyle.css">
//             </head>
//             <body>
//                 <nav id="menubar">
//                     <ul>
//                         <li><a href="index.html">Home</a></li>
//                         <li><a href="#">About Me</a></li>
//                         <li style="float: right;"><a href="login.html">Login</a></li>
//                     </ul>
//                 </nav>
//                 <h2>Register Failed</h2>
//                 <hr><br><br>
//                 <div id="input_TryAg">
//                     <input style="width: 100px; height: 50px;" type="button" value="Try Again" onClick="location.href='register.html'">
//                 </div>
//             </body>
//             </html>
//             `;
//             res.end(template);
//         } else {
//             connection.query("insert into user values (?, ?)", [id, pw]);
//             res.redirect('login.html');
//         }
//     }
// });



/// functions for project

app.get("/select", (req, res) => {
    const result = connection.query("SELECT * FROM clothes;");
    console.log(result);
    res.send(result);
});


app.get("/show_wt", (req, res) => {
    const result = connection.query("SELECT * FROM weather WHERE location = '서울' AND date = '20230313';");
    console.log(result);
    res.send(result);
});

app.post("/show_wt", (req, res) => {
    const { loc, date } = req.body;
    const result = connection.query("select * from weather WHERE location=? AND date=?;", [loc, date]);
    console.log('{"ok":true,' + JSON.stringify(result) + ' }');

    if (result.length == 0) {
        res.send('{ "ok": false }');
    } else {
        res.send('{"ok": true,' + JSON.stringify(result) + ' }');
    }
});


app.get("/rec_place", (req, res) => {
    const result = connection.query(
        "SELECT w.location, w.date, p.name AS place_name FROM weather w JOIN places p ON w.location = p.location AND w.temp_min <= p.temp_min WHERE w.location = '대전' AND w.date = '20230328'; ");
    console.log(result);
    res.send(result);
});

app.post("/rec_place", (req, res) => {
    const { loc, date } = req.body;
    const result = connection.query(
        "SELECT w.location, w.date, p.name AS place_name FROM weather w JOIN places p ON w.location = p.location AND w.temp_min <= p.temp_min WHERE w.location=? AND w.date=?;", [loc, date]);
    console.log('{"ok":true,' + JSON.stringify(result) + ' }');

    if (result.length == 0) {
        res.send('{ "ok": false }');
    } else {
        res.send('{"ok": true,' + JSON.stringify(result) + ' }');
    }
});


app.get("/rec_cloth", (req, res) => {
    const result = connection.query(
        "SELECT w.location, w.date, c.name AS cloth_name FROM clothes c JOIN weather w ON w.temp_max >= c.temp_max AND w.temp_min >= c.temp_min WHERE w.location = '대구' AND w.date = '20230329'; ");
    console.log(result);
    res.send(result);
});

app.post("/rec_cloth", (req, res) => {
    const { loc, date } = req.body;
    const result = connection.query(
        "SELECT w.location, w.date, c.name AS cloth_name FROM clothes c JOIN weather w ON w.temp_max >= c.temp_max AND w.temp_min >= c.temp_min WHERE w.location = ? AND w.date = ?;", [loc, date]);
    console.log(result);
    res.send(result);
});


app.post("/insert_cloth", (req, res) => {
    const { id, name, category, temp_min, temp_max } = req.body;
    const result = connection.query("select * from clothes where id=?", [id]);

    if (id.length == 0 || name.length == 0 || category.length == 0 || temp_min.length == 0 || temp_max.length == 0) {
        res.send(
            `<script>
                alert('값을 모두 입력해주세요!');
            </script>`
        );
    } else {
        if (result.length > 0) {
            res.send(
                `<script>
                alert('중복된 cloth ID입니다. 다시 입력해주세요!');
            </script>`
            );
        } else {
            connection.query("insert into clothes values (?, ?, ?, ?, ?)", [id, name, category, temp_min, temp_max]);
            res.redirect('/select');
        }
    }
});


app.post("/find_my_cloth", (req, res) => {
    const { now_temp, cloth_category } = req.body;
    const clothes = connection.query("select name, temp_min, temp_max from clothes where category=?", [cloth_category]);

    console.log(clothes);
    let mintemp = [];
    let maxtemp = [];

    for (var i = 0; i < clothes.length; i++) {
        mintemp[i] = clothes[i]['temp_min'];
        maxtemp[i] = clothes[i]['temp_max'];
    }

    // console.log(mintemp)
    // console.log(maxtemp)

    for (var j = 0; j < clothes.length; j++) {
        if (maxtemp[j] > now_temp && mintemp[j] < now_temp) {
            result = connection.query("select name from clothes where category=? AND temp_min=? AND temp_max=?", [cloth_category, mintemp[j], maxtemp[j]]);
        }
    }
    console.log(result);
});


module.exports = app;