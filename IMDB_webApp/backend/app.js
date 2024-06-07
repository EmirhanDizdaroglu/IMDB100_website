const express = require('express');
const cors = require('cors');

const app = express();

// Tüm isteklere CORS başlıklarını ekleyin
app.use(cors());

// Diğer middleware'leri ve rotaları buraya ekleyin

// Body parser middleware'ini ekleyin
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// "/api" ile başlayan rotaları kullanmak için api.js dosyasını dahil edin
const apiRouter = require('./routes/api.js');
app.use('/api', apiRouter);

// Sunucuyu belirli bir portta başlatın
const PORT = process.env.PORT || 5000; // Portu belirle, ortam değişkeni yoksa 5000 kullan
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
