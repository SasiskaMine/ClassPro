const db = require('../modules/db/db_users');

function check_role(req, res, next) {
    req.userRole = 1;

    const sessionUser = req.session.user;
    if (!sessionUser) {
        return next();
    }

    let row;
    if (typeof sessionUser === 'object') {
        if (sessionUser.id) {
            row = db.prepare('SELECT role FROM user WHERE id = ?').get(sessionUser.id);
        } else if (sessionUser.login) {
            row = db.prepare('SELECT role FROM user WHERE login = ?').get(sessionUser.login);
        } else if (sessionUser.name) {
            row = db.prepare('SELECT role FROM user WHERE name = ?').get(sessionUser.name);
        }
    } else {
        row = db.prepare('SELECT role FROM user WHERE login = ?').get(sessionUser);
    }

    if (row) {
        req.userRole = Number(row.role);
    }

    next();
}

module.exports = check_role;
