const mysql = require('mysql2/promise'); // Modülü ekleyin

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '1234', // MySQL şifrenizi buraya yazın
  database: 'imdb_webapp' // Kullanmak istediğiniz veritabanı adını buraya yazın
});

db.getConnection()
  .then(connection => {
    console.log('MySQL bağlantısı başarıyla gerçekleştirildi...');
    connection.release(); // Bağlantıyı serbest bırak
  })
  .catch(err => {
    console.error('MySQL bağlantısı başarısız oldu:', err);
  });

module.exports = db;
