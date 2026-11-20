var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  const errorData = req.session.error || {
    code: 401,
    reason: 'Ошибка доступа'
  };
  delete req.session.error;

  res.status(errorData.code).render('error', {
    NumError: errorData.code,
    TextError: errorData.reason
  });
});

module.exports = router;
