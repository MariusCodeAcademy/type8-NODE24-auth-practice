const express = require('express');
const { getArticlesDB } = require('../model/userModel');

const userRoutes = express.Router();

userRoutes.get('/art', async (req, res) => {
  // panaudoti getArticlesDb
  const artArr = await getArticlesDB();
  res.json(artArr);
});

module.exports = userRoutes;
