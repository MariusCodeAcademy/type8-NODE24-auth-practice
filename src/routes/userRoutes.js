const express = require('express');

const userRoutes = express.Router();

userRoutes.get('/', async (req, res) => {
  res.json('sample route');
});

module.exports = userRoutes;
