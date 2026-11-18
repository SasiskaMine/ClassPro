const { DatabaseSync } = require('node:sqlite');
const db = new DatabaseSync('./modules/db/class_db.db');

db.exec(`
    CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        full_name TEXT NOT NULL,
        class_name TEXT
    );

    CREATE TABLE IF NOT EXISTS attendance (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        student_id INTEGER,
        date TEXT,
        comment TEXT,
        is_present INTEGER,
        UNIQUE(student_id, date)
    );
`);

module.exports = db;