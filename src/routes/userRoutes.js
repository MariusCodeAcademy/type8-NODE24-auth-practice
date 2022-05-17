const express = require('express');
const { getArticlesDB, executeDb } = require('../model/userModel');
const { hashPassword } = require('../utils/helpers');

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
userRoutes.post('/register', async (req, res) => {
  const newUser = req.body;
  // hash password (bcryptjs)
  newUser.password = hashPassword(newUser.password);
  // saveToDb(newUser);
  try {
    const sql = 'INSERT INTO users (email, password) VALUES (?, ?)';
    const saveResult = await executeDb(sql, [newUser.email, newUser.password]);
    if (saveResult.affectedRows === 1) {
      res.sendStatus(201);
      return;
    }
    res.status(400).json('no user created');
  } catch (error) {
    console.log('POST /register ===', error);
    res.sendStatus(500);
  }
});

// issaugom duomenu bazeje users lenteleje

module.exports = userRoutes;
