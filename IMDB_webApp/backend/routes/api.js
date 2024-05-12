const express = require('express');
const router = express.Router();

// Örnek bir GET endpoint'i
router.get('/example', (req, res) => {
  res.json({ message: 'Bu bir örnek GET endpoint\'i!' });
});

module.exports = router;
