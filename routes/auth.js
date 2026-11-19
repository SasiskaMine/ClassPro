
var express = require('express');
var router = express.Router();
var db = require('../modules/db/db_users');


router.get('/', function(req, res) {
  res.render('auth');
});

router.post('/register', (req, res) => {
  const { userName, userLogin, userPass } = req.body;

  try {
    const insert = db.prepare('INSERT INTO user (name, login, password) VALUES (?, ?, ?)');
    insert.run(userName, userLogin, userPass);
    
    console.log(`Great! ${userName},${userLogin},${userPass}`);
    res.send('Успешная регистрация! <a href="/">Назад</a>');
  } catch (err) {
    console.error(err); 
    res.send('Ошибка: логин занят или проблема с базой');
  }
});

router.post('/login', (req, res) => {
  const { userLogin, userPass } = req.body;

  const query = db.prepare('SELECT * FROM user WHERE login = ? AND password = ?');
  const user = query.get(userLogin, userPass);

  if (user) {
    req.session.user = user;
    res.redirect('/dashboard');
  } else {
    console.log("Неверно");
    res.send('Неверный логин или пароль! <a href="/">Попробовать снова</a>');
  }
});

module.exports = router;
