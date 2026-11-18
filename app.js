var express = require('express');
var session = require('express-session');
var app = express();
var Dashboard = require('./routes/dashboard');
var Auth = require('./routes/auth');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
  secret: '^,p_T}P7bx[%onn', // ЗАМЕНИТЕ НА СВОЙ КОД
  resave: false,
  saveUninitialized: false
}));

app.use('/', Auth);
app.use('/dashboard', Dashboard);

app.listen(8080, () => {
  console.log(`http://localhost:8080`);
});
