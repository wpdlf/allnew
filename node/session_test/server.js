const express = require('express');
const nunjucks = require('nunjucks');
const { userList } = require('./model/user.js');
const session = require('express-session');
const MemoryStore = require('memorystore')(session);
const path = require("path")

const app = express();

const maxAge = 1000 * 60 * 5;

const sessionObj = {
  secret: 'kong',
  resave: false,
  saveUninitialized: true,
  store: new MemoryStore({ checkPeriod: maxAge }),
  cookie: {
    maxAge,
  },
};

app.use(session(sessionObj));

// app.set('view engine', 'html');
// nunjucks.configure('views', { express: app });

app.use(express.static(path.join(__dirname, 'views')));

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index.html');
});

app.post('/user/login', (req, res) => {
  const { userid, userpw } = req.body;

  const [user] = userList.filter((v) => v.id === userid && v.pw === userpw);
  if (user) {
    const privateKey = Math.floor(Math.random() * 1000000000);
    session[privateKey] = user;
    console.log(session);
    res.send('login^^');
  } else {
    res.redirect('/user/login?msg=등록되지 않은 사용자 입니다');
  }
});

app.listen(3000);