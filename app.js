var express = require('express');
var app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

app.get('/', function(req,res) {
  res.render('index', { name: 'kirill'})
});

app.post('/modal', (req,res) => {
  const text = req.body.inputValue;
  res.render('index', { name:text});
})

app.listen(8080, () => {
  console.log(`http://localhost:8080`)
})