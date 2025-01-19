const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes'); 
const path = require('path');
const session = require('express-session');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000; 

// Middleware untuk mengizinkan CORS
const allowedOrigins = [
  'https://snapsindo.vercel.app',
  'http://localhost:3000', 
  'https://backend-dsnap.vercel.app/',
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
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
    secret: process.env.SESSION_SECRET || 'your_secret_key', 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, 
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
