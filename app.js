var express = require('express');
var session = require('express-session');
var app = express();
var db = require('./modules/db_users');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
  secret: '^,p_T}P7bx[%onn', // ЗАМЕНИТЕ НА СВОЙ КОД
  resave: false,
  saveUninitialized: false
}));

app.get('/', function(req, res) {
  res.render('auth');
});

app.get('/dashboard', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/');
  }
  
  res.render('dashboard');
});

app.post('/register', (req, res) => {
  const { userLogin, userPass } = req.body;

  try {

    const insert = db.prepare('INSERT INTO user (login, password) VALUES (?, ?)');
    insert.run(userLogin, userPass);
    

    res.send('Успешная регистрация! <a href="/">Назад</a>');
  } catch (err) {
    console.error(err); 
    res.send('Ошибка: логин занят или проблема с базой');
  }
});

app.post('/login', (req, res) => {
  const { userLogin, userPass } = req.body;


  const query = db.prepare('SELECT * FROM user WHERE login = ? AND password = ?');
  const user = query.get(userLogin, userPass);

  if (user) {
    req.session.user  = user;
    res.redirect('/dashboard')
  } else {
    console.log("Неверно");
    res.send('Неверный логин или пароль! <a href="/">Попробовать снова</a>');
  }
});

app.listen(8080, () => {
  console.log(`http://localhost:8080`);
});
