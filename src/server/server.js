const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const path = require('path');
const session = require('express-session');
const cors = require('cors');
require('dotenv').config(); 
const fileUpload = require('express-fileupload');

const app = express();
const PORT = process.env.PORT || 4000; 

// Middleware untuk mengizinkan CORS
app.use(
  cors({
    origin: 'https://snapsindo.vercel.app', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
    credentials: true, 
  })
);

// Express json
app.use(express.json());
// Limit file upload
app.use(fileUpload({
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
}))

// Middleware untuk parsing body JSON
app.use(bodyParser.json({ limit: '10mb' })); 
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' })); 

// Middleware untuk melayani file statis
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); 

// Middleware untuk session
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your_secret_key', 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' }, 
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
