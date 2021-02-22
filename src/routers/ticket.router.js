const express = require('express');
const router = express.Router();

router.all('/', (req, res) => {
  res.json({ message: 'Ticket router' });
});

module.exports = router;
