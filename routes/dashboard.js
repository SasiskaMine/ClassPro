var express = require('express');
var router = express.Router();
var checkAuth = require('../middlewares/auth');
var db = require('../modules/db/db_users');
var {readJson, writeJson} = require('../modules/settings/settings');



router.get('/', checkAuth, async (req, res) => {
    const CurrentClass = await readJson();
    const userName = req.session.user.name;
    res.render('dashboard', {Name:userName, Class:CurrentClass});
});

module.exports = router;
