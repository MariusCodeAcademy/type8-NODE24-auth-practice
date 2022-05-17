const express = require('express');

const userRoutes = express.Router();

userRoutes.get('/', async (req, res) => {
  // panaudoti getArticlesDb
  res.json('sample route');
});

module.exports = userRoutes;
