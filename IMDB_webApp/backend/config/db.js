// IMDB_webApp\backend\config\db.js
const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'imdb_webapp'
};

const pool = mysql.createPool(dbConfig);

const connectToDatabase = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Connected to database.');
    connection.release(); // Bağlantıyı serbest bırak
    return connection;
  } catch (error) {
    console.error('Database connection failed:', error.stack);
    throw error;
  }
};

module.exports = connectToDatabase;
