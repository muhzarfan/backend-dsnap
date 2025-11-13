const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const path = require('path');
const session = require('express-session');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;
const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS ?
  process.env.CORS_ALLOWED_ORIGINS.split(',') :
  [];

// CORS
app.use(
  cors({
    origin: allowedOrigins, 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
    credentials: true, 
  })
);

// JSOn body parser
app.use(bodyParser.json());

// Decode url body
app.use(bodyParser.urlencoded({ extended: true }));

// File static buat upload
app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

// Session login
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

// Route not found handler
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route tidak ditemukan' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server berjalan pada ${PORT}`);
});
