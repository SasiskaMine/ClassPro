const { DatabaseSync } = require('node:sqlite');

const db = new DatabaseSync('./modules/db/db_users.db');

db.exec(`
    CREATE TABLE IF NOT EXISTS user (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        role INTEGER DEFAULT 1,
        name TEXT,
        login TEXT UNIQUE,
        password TEXT
    )
`);

try {
    db.exec(`ALTER TABLE user ADD COLUMN role INTEGER DEFAULT 1`);
} catch (e) {}

module.exports = db;
