function checkAuth(req, res, next) {
  if (!req.session || !req.session.user) {
    req.session.error = {
      code: 401,
      reason: 'Необходима авторизация для доступа к этой странице'
    };

    return req.session.save((err) => {
      if (err) {
        console.error('Ошибка сохранения сессии:', err);
      }
      return res.redirect('/error');
    });
  }
  next();
}

module.exports = checkAuth;
