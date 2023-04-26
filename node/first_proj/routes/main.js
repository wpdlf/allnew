const express = require("express")
const app = express()
const mongoose = require("mongoose")
const mysql = require("sync-mysql");
const bodyParser = require("body-parser");
const env = require("dotenv").config({ path: "../../.env" });
const query = require("async");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var connection = new mysql({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
});

// define schema
var new_clothes_Schema = mongoose.Schema({
    cloth_name: String,
    category: String
}, {
    versionKey: false
})

var new_places_Schema = mongoose.Schema({
    place_name: String,
    type: String,
    location: String
}, {
    versionKey: false
})

var rec_places_Schema = mongoose.Schema({
    location: String,
    date: String,
    place_name: String
}, {
    versionKey: false
})

// create model with mongodb collection and schema
var New_clohtes = mongoose.model('musinsas', new_clothes_Schema);
var New_places = mongoose.model('agodas', new_places_Schema);
var Rec_places = mongoose.model('rec_places', rec_places_Schema);

// mysql에서 뽑아온 추천 관광지를 mongodb에 바로 저장
app.post('/rec_place_insert', function (req, res, next) {
    const { loc, user_date } = req.body;
    const result = connection.query(
        "SELECT w.location, w.date, p.name AS place_name FROM weather w JOIN places p ON w.location = p.location AND w.temp_min <= p.temp_min WHERE w.location=? AND w.date=?;", [loc, user_date]);
    var location = [];
    var date = [];
    var place_name = [];

    for (let i = 0; i < result.length; i++) {
        location[i] = result[i]['location'];
        date[i] = result[i]['date'];
        place_name[i] = result[i]['place_name'];

        var rec_places = new Rec_places({ 'location': location[i], 'date': date[i], 'place_name': place_name[i] })

        rec_places.save(function (err, silence) {
            if (err) {
                console.log('err')
                res.status(500).send('insert error')
                return;
            }
        })
    }
    res.status(200)
    res.redirect('/select')
});


// list
app.get('/list', function (req, res, next) {
    New_clohtes.find({}, function (err, docs) {
        if (err) console.log('err')
        res.send(docs)
    })
});

// get
app.get('/get', function (req, res, next) {
    var userid = req.query.input
    User.findOne({ 'userid': userid }, function (err, doc) {
        if (err) console.log('err')
        res.send(doc)
    })
});

// new clothes insert from users
app.post('/cloth_insert', function (req, res, next) {
    var cloth_name = req.body.cloth_name;
    var category = req.body.category;
    var new_clothes = new New_clohtes({ 'cloth_name': cloth_name, 'category': category })

    new_clothes.save(function (err, silence) {
        if (err) {
            console.log('err')
            res.status(500).send('insert error')
            return;
        }
        res.status(200)
        res.redirect('/list')
    })
});

// new places insert from users
app.post('/place_insert', function (req, res, next) {
    var place_name = req.body.place_name;
    var type = req.body.type;
    var location = req.body.location;
    var new_places = new New_places({ 'place_name': place_name, 'type': type, 'location': location })

    new_places.save(function (err, silence) {
        if (err) {
            console.log('err')
            res.status(500).send('insert error')
            return;
        }
        res.status(200)
        res.redirect('/list')
    })
    //res.redirect('/list')
});

// update
// app.post('/update', function (req, res, next) {
//     var userid = req.body.userid;
//     var name = req.body.name;
//     var city = req.body.city;
//     var sex = req.body.sex;
//     var age = req.body.age;

//     User.findOne({ 'userid': userid }, function (err, user) {
//         if (err) {
//             console.log('err')
//             res.status(500).send('update error')
//         }

//         user.name = name;
//         user.sex = sex;
//         user.city = city;
//         user.age = age;

//         user.save(function (err, silence) {
//             if (err) {
//                 console.log('err')
//                 res.status(500).send('update error')
//                 return;
//             }
//             res.status(200).send("Updated")
//         })
//     })
// });

// new clothes update from users
app.post('/cloth_update', function (req, res, next) {
    var cloth_name = req.body.cloth_name;
    var category = req.body.category;

    New_clohtes.findOne({ 'cloth_name': cloth_name }, function (err, new_clohtes) {
        if (err) {
            console.log('err')
            res.status(500).send('update error')
            return;
        }
        new_clohtes.cloth_name = cloth_name;
        new_clohtes.category = category;

        new_clohtes.save(function (err, silence) {
            if (err) {
                console.log('err')
                res.status(500).send('update error')
                return;
            }
            res.status(200)
            res.redirect('/list')
        })
    })
});

// new places update
app.post('/place_update', function (req, res, next) {
    var place_name = req.body.place_name;
    var type = req.body.type;
    var location = req.body.location;

    New_places.findOne({ 'place_name': place_name }, function (err, new_places) {
        if (err) {
            console.log('err')
            res.status(500).send('update error')
            return;
        }
        new_places.place_name = cloth_name;
        new_places.type = type;
        new_places.location = location;

        new_places.save(function (err, silence) {
            if (err) {
                console.log('err')
                res.status(500).send('update error')
                return;
            }
            res.status(200)
            res.redirect('/list')
        })
    })
});

// delete
// app.post('/delete', function (req, res, next) {
//     var userid = req.body.userid;
//     var user = User.find({ 'userid': userid })
//     user.deleteOne(function (err) {
//         if (err) {
//             console.log('err')
//             res.status(500).send('delete error')
//             return;
//         }
//         res.status(200).send("Removed")
//     })
// });

// clothes delete
app.post('/cloth_delete', function (req, res, next) {
    var cloth_name = req.body.cloth_name;
    var new_clohtes = New_clohtes.find({ 'cloth_name': cloth_name })
    new_clohtes.remove(function (err) {
        if (err) {
            console.log('err')
            res.status(500).send('delete error')
            return;
        }
        res.status(200)
        res.redirect('/list')
    })
});

// delete place
app.post('/places_delete', function (req, res, next) {
    var place_name = req.body.place_name;
    var new_places = New_places.find({ 'place_name': place_name })
    new_places.remove(function (err) {
        if (err) {
            console.log('err')
            res.status(500).send('delete error')
            return;
        }
        res.status(200)
        res.redirect('/list')
    })
});

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


// app.post("/insert_cloth", (req, res) => {
//     const { id, name, category, temp_min, temp_max } = req.body;
//     const result = connection.query("select * from clothes where id=?", [id]);

//     if (id.length == 0 || name.length == 0 || category.length == 0 || temp_min.length == 0 || temp_max.length == 0) {
//         res.send(
//             `<script>
//                 alert('값을 모두 입력해주세요!');
//             </script>`
//         );
//     } else {
//         if (result.length > 0) {
//             res.send(
//                 `<script>
//                 alert('중복된 cloth ID입니다. 다시 입력해주세요!');
//             </script>`
//             );
//         } else {
//             connection.query("insert into clothes values (?, ?, ?, ?, ?)", [id, name, category, temp_min, temp_max]);
//             res.redirect('/select');
//         }
//     }
// });


app.post("/find_my_cloth", (req, res) => {
    const { now_temp, cloth_category } = req.body;
    const clothes = connection.query("select name, temp_min, temp_max from clothes where category=?", [cloth_category]);
    const mintemp = [];
    const maxtemp = [];
    const result = [];

    console.log(clothes)

    Array.from(clothes).forEach((clothing) => {
        mintemp.push(clothing.temp_min);
        maxtemp.push(clothing.temp_max);
    });

    if (now_temp.length == 0 || cloth_category.length == 0) {
        res.send(
            `<script>
                alert('현재 온도와 원하시는 옷 카테고리를 모두 입력해주세요!');
            </script>`
        );
    } else {
        for (var i = 0; i < clothes.length; i++) {
            if ((maxtemp[i] >= now_temp) && (mintemp[i] <= now_temp)) {
                result.push(clothes[i].name);
            }
        }
        console.log(result);
    }
});


module.exports = app;