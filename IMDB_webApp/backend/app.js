const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/api');
const userRoutes = require('./routes/userRoutes');
const connectToDatabase = require('./config/db');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// apiRoutes'u kullan
app.use('/api', apiRoutes);
app.use('/api/users', userRoutes);

// MySQL bağlantısını kontrol et
connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to database:', error);
  });
