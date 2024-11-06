const express = require('express');
const db = require('../server.js');
const router = express.Router();

// Get all products
router.get('/', (req, res) => {
  const query = 'SELECT * FROM Products';
  db.query(query, (error, results) => {
    if (error) return res.status(500).json({ error });
    res.json(results);
  });
});

// Get a single product
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM Products WHERE product_id = ?';
  db.query(query, [id], (error, results) => {
    if (error) return res.status(500).json({ error });
    res.json(results[0]);
  });
});

module.exports = router;
