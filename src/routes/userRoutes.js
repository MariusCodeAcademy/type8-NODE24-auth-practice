const express = require('express');
const { getArticlesDB } = require('../model/userModel');

const userRoutes = express.Router();

userRoutes.get('/art', async (req, res) => {
  // panaudoti getArticlesDb
  try {
    const artArr = await getArticlesDB();
    res.json(artArr);
  } catch (error) {
    console.log('error ===', error);
    res.sendStatus(500);
  }
});

// POST /register - gaunam email ir password
// hash password (bcryptjs)
// issaugom duomenu bazeje users lenteleje

module.exports = userRoutes;
