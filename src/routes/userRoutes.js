const express = require('express');
const { validateUser } = require('../middleware');
const { executeDb, findUserByEmail } = require('../model/userModel');
const {
  hashPassword,
  passWordsMatch,
  generateJwtToken,
} = require('../utils/helpers');

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
userRoutes.post('/register', validateUser, async (req, res) => {
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

// POST /login - grazinti {success: true, token}
userRoutes.post('/login', validateUser, async (req, res) => {
  const gautasEmail = req.body.email;
  const gautasSlaptazodis = req.body.password;

  // patikrinti ar yra toks email kaip gautas
  const foundUserArr = await findUserByEmail(gautasEmail);
  // nes findUserByEmail grazina visada masyva
  const foundUser = foundUserArr[0];
  console.log('foundUser ===', foundUser);
  // jei nera 400 email or password not found
  if (!foundUser) {
    res.status(400).json('email or password not found (email)');
    return;
  }
  // jei yra tikrinam ar sutampa slaptazodis
  // bcrypt.compareSync(ivestas slaptazodis, issaugotas hashed slaptazodis)
  if (!passWordsMatch(gautasSlaptazodis, foundUser.password)) {
    res.status(400).json('email or password not found (pass)');
    return;
  }
  // sugeneruoti jwt token
  const payload = { userId: foundUser.id };
  const token = generateJwtToken(payload);
  // console.log('token ===', token);
  res.json({ success: true, token });
});

module.exports = userRoutes;
