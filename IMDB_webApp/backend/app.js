const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware'lerin eklenmesi
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotaların eklenmesi
app.use('/api', require('./routes/api'));

// Ana sayfa
app.get('/', (req, res) => {
  res.send('Ana sayfaya hoş geldiniz!');
});

// Sunucunun dinlenmesi
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor...`);
});
