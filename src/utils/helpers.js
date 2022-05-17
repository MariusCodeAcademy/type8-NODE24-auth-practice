const bcrypt = require('bcryptjs');
/**
 *  Takes plain text and return hashed pass
 * @param {string} plainTextString
 * @returns {string} hashed pass
 */
function hashPassword(plainTextString) {
  return bcrypt.hashSync(plainTextString, 10);
}

module.exports = {
  hashPassword,
};
