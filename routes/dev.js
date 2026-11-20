var express = require('express');
var router = express.Router();

const TARGET_DATE = '2026-12-10T00:00:00+03:00';

function waitDate() {
  const diff = new Date(TARGET_DATE) - Date.now();
  if (diff <= 0) return 'Время вышло!';

  const d = Math.floor(diff / 86400000);
  const h = String(Math.floor(diff / 3600000) % 24).padStart(2, '0');
  const m = String(Math.floor(diff / 60000) % 60).padStart(2, '0');
  const s = String(Math.floor(diff / 1000) % 60).padStart(2, '0');

  return `${d}д ${h}:${m}:${s}`;
}

router.get('/', (req, res) => {
  res.render('dev', {
    WaitDate: waitDate(),
    targetDate: TARGET_DATE,
  });
});

module.exports = router;
