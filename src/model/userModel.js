const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

async function getArrayFromDb(sql) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const [result] = await conn.execute(sql, []);
    return result;
  } catch (error) {
    console.log('error getArrayFromDb', error);
    throw new Error('error getArrayFromDb');
  } finally {
    conn?.end();
  }
}

async function executeDb(sql, dataToDbArr) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const [result] = await conn.execute(sql, dataToDBArr);
    return result;
  } catch (error) {
    console.log('error executeDb', error);
    throw new Error('error executeDb');
  } finally {
    conn?.end();
  }
}

// sukurti  getArticlesDB ji grazina visus straipsnius
function getArticlesDB() {
  const sql = 'SELECT * FROM articles';
  return getArrayFromDb(sql);
}

// exportuoti getArticlesDB

module.exports = {
  getArticlesDB,
};
