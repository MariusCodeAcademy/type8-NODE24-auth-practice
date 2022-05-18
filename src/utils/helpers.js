require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
/**
 *  Takes plain text and return hashed pass
 * @param {string} plainTextString
 * @returns {string} hashed pass
 */
function hashPassword(plainTextString) {
  return bcrypt.hashSync(plainTextString, 10);
}

function passWordsMatch(enteredPass, storedHash) {
  return bcrypt.compareSync(enteredPass, storedHash);
}

function generateJwtToken(payload) {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) throw new Error('generateJwtToken no secret');
  return jwt.sign(payload, jwtSecret, { expiresIn: '1h' });
}

function verifyJwtToken(token) {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) throw new Error('verifyJwtToken no secret');
  try {
    const payload = jwt.verify(token, jwtSecret);
    return payload;
  } catch (err) {
    // err
    console.log('err ===', err.message);
    throw new Error('verifyJwtToken');
  }
}

module.exports = {
  passWordsMatch,
  generateJwtToken,
  verifyJwtToken,
  hashPassword,
};
