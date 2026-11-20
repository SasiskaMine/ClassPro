var express = require('express');
var session = require('express-session');
var app = express();
var Dashboard = require('./routes/dashboard');
var Auth = require('./routes/auth');
var Dev = require('./routes/dev');
var ErrorPage = require('./routes/error');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
  secret: '^,p_T}P7bx[%onn', // ЗАМЕНИТЕ НА СВОЙ КОД
  resave: false,
  saveUninitialized: false
}));

app.use('/error',ErrorPage)
app.use('/', Auth);
//app.use('/',Dev);
app.use('/dashboard', Dashboard);

app.use((req, res) => {
  res.status(404).render('error', {
    NumError: 404,
    TextError: 'Страница не найдена. '
  });
});


app.listen(8080, () => {
  console.log(`http://localhost:8080`);
});
