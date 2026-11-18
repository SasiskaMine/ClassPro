const { DatabaseSync} = require('node:sqlite');

const db = new DatabaseSync('./modules/db_users.db');

db.exec(`
    CREATE TABLE IF NOT EXISTS user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    login TEXT UNIQUE,
    password TEXT
    )
    `);
module.exports = db;