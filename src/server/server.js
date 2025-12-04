const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const path = require('path');
const session = require('express-session');
const cors = require('cors');
require('dotenv').config();

// --- Inisialisasi Aplikasi dan Konfigurasi Dasar ---
const app = express();
// Mendefinisikan port
const PORT = process.env.PORT || 4000;
// Mengambil daftar origin yang diizinkan untuk CORS dari variabel lingkungan
const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS ?
  // Memisahkan string menjadi array jika ada beberapa origin
  process.env.CORS_ALLOWED_ORIGINS.split(',') :
  // Array kosong jika variabel tidak didefinisikan
  [];

// --- Middleware: CORS (Cross-Origin Resource Sharing) ---
app.use(
  cors({
    origin: allowedOrigins, 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
    credentials: true, 
  })
);

// --- Middleware: Body Parsers ---

// JSOn body parser
app.use(bodyParser.json());

// Decode url body: Mengubah permintaan URL-encoded (misalnya dari formulir HTML)
app.use(bodyParser.urlencoded({ extended: true }));

// --- Middleware: Static Files ---

// File static buat uploads
app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

// --- Middleware: Express Session ---

// Session login: Mengkonfigurasi middleware sesi
app.use(
  session({
    // Kunci rahasia untuk menandatangani cookies session
    secret: process.env.SESSION_SECRET || 'your_secret_key',
    // Mencegah sesi disimpan ulang jika tidak ada perubahan
    resave: false,
    // Memaksa sesi 'baru' yang belum diinisialisasi untuk disimpan
    saveUninitialized: true,
    // Konfigurasi cookie sesi (secure: false digunakan untuk lingkungan non-HTTPS/development)
    cookie: { secure: false },
  })
);

// --- Mounting Routes ---

// Routes: Menghubungkan semua rute API yang telah didefinisikan di routes.js
// Semua endpoint akan diawali dengan '/api'
app.use('/api', routes);

// --- Middleware: Error Handlers ---

// Route not found handler (404 Not Found)
app.use((req, res, next) => {
  // Jika tidak ada rute yang cocok di atas, kirim respons 404
  res.status(404).json({
    message: 'Halaman tidak ditemukan',
    error: '404 Not Found',
  });
});

// Final error handler: Menangani semua error yang dilempar dari middleware atau rute
app.use((err, req, res, next) => {
  console.error(err.stack); // Logging error stack
  // Mengirim respons 500 Internal Server Error
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    error: err.stack,
  });
});


// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server sedang berjalan pada http://localhost:${PORT}`);
});