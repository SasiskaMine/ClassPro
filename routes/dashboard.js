const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/auth');
const role_check = require('../middlewares/role_check');
const { readJson, writeJson } = require('../modules/settings/settings');
const db = require('../modules/db/class_db');

function getTodayDate() {
    return new Date().toISOString().split('T')[0];
}

router.get('/', checkAuth, role_check, async (req, res) => {
    const CurrentClass = await readJson();
    const userName = req.session.user.name;
    const today = getTodayDate();


    const students = db.prepare(`
        SELECT 
            students.id, 
            students.full_name, 
            attendance.comment, 
            attendance.is_present
        FROM students
        LEFT JOIN attendance 
            ON students.id = attendance.student_id AND attendance.date = ?
        WHERE students.class_name = ?
    `).all(today, CurrentClass);

    res.render('dashboard', {
        Name: userName,
        Class: CurrentClass,
        students: students,
        today: today,
        userRole: req.userRole
    });

});

router.post('/settings', checkAuth, async (req, res) => {
    const { SettingsClassNum } = req.body;
    await writeJson(SettingsClassNum);
    res.redirect('/dashboard');
});

router.post('/add-student', checkAuth,role_check, async (req, res) => {
    const { fullName } = req.body;
    const currentClass = await readJson();

    const insert = db.prepare('INSERT INTO students (full_name, class_name) VALUES (?, ?)');
    insert.run(fullName, currentClass);

    res.redirect('/dashboard');
});

router.post('/del-student', checkAuth,role_check, (req, res) => {
    const { id } = req.body;
    const studentId = Number(id);

    db.prepare('DELETE FROM attendance WHERE student_id = ?').run(studentId);
    db.prepare('DELETE FROM students WHERE id = ?').run(studentId);

    res.redirect('/dashboard');
});



router.post('/save-journal', checkAuth, (req, res) => {
    const today = getTodayDate();
    const { studentIds, comments, present } = req.body;

    if (!studentIds) return res.redirect('/dashboard');

    const ids = Array.isArray(studentIds) ? studentIds : [studentIds];
    const presentList = present ? (Array.isArray(present) ? present : [present]) : [];

    const upsert = db.prepare(`
        INSERT INTO attendance (student_id, date, comment, is_present)
        VALUES (?, ?, ?, ?)
        ON CONFLICT(student_id, date) DO UPDATE SET
            comment = excluded.comment,
            is_present = excluded.is_present
    `);

    ids.forEach((id, index) => {
        const commentText = Array.isArray(comments) ? comments[index] : (comments || '');
        const isHere = presentList.includes(id) ? 1 : 0;
        upsert.run(id, today, commentText, isHere);
    });

    res.redirect('/dashboard');
});

module.exports = router;