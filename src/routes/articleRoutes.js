const express = require('express');
const { validateToken } = require('../middleware');
const { getArticlesDB } = require('../model/articleModel');

const articleRoutes = express.Router();

articleRoutes.get('/articles', validateToken, async (req, res) => {
  // panaudoti getArticlesDb
  try {
    const artArr = await getArticlesDB();
    res.json(artArr);
  } catch (error) {
    console.log('articleRoutes.get error ===', error);
    res.sendStatus(500);
  }
});

module.exports = articleRoutes;
