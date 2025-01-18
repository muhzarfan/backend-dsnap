const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes'); // Pastikan path ini benar
const path = require('path');
const session = require('express-session');
const cors = require('cors');
require('dotenv').config(); // Untuk memuat variabel lingkungan dari file .env

const app = express();
const PORT = process.env.PORT || 4000; // Port server

// Middleware untuk mengizinkan CORS
app.use(
  cors({
    origin: 'https://snapsindo.vercel.app', // Ganti sesuai dengan domain frontend Anda
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Metode HTTP yang diizinkan
    allowedHeaders: ['Content-Type', 'Authorization'], // Header yang diizinkan
    credentials: true, // Mengizinkan pengiriman cookie
  })
);

// Middleware untuk parsing body JSON
app.use(bodyParser.json());

// Middleware untuk parsing body URL-encoded
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware untuk melayani file statis
app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

// Middleware untuk session
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your_secret_key', // Kunci session
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set ke `true` jika menggunakan HTTPS
  })
);

// Routes
app.use('/api', routes);

// Middleware untuk menangani rute yang tidak ditemukan
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Middleware untuk menangani error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
