const express = require('express');
const handler = require('./handler');
const ChatbotHandler = require('./ChatbotHandler');
const router = express.Router();
const fileUpload = require('express-fileupload');

// Konfigurasi express-fileupload middleware
const fileUploadMiddleware = fileUpload({
    createParentPath: true,
    limits: { 
        fileSize: 5 * 1024 * 1024 // 5MB max-file-size
    },
    abortOnLimit: true,
    useTempFiles: false,
    debug: process.env.NODE_ENV === 'development'
});

// Inisialisasi chatbot handler
const chatbotHandler = new ChatbotHandler();

// Routes for portfolio CRUD
router.get('/portfolio', handler.getPortfolios);
router.get('/portfolio/:id', handler.getPortfolioById);
router.post('/portfolio', fileUploadMiddleware, handler.createPortfolio);
router.put('/portfolio/:id', fileUploadMiddleware, handler.updatePortfolio);
router.delete('/portfolio/:id', handler.deletePortfolio);

// Routes for order CRUD
router.get('/order', handler.getOrder);
router.get('/order/:id', handler.getOrdersById);
router.post('/order', handler.createOrder);
router.put('/order/:id', handler.updateOrder);
router.delete('/order/:id', handler.deleteOrder);

// Authentication routes
router.post('/login', handler.loginHandler);
router.post('/logout', handler.logout);

// Chatbot routes
router.post('/chatbot', async (req, res) => {
    try {
        const { message, language, eventName } = req.body;

        // Set language if provided
        if (language) {
            chatbotHandler.setLanguage(language);
        }

        // If eventName is provided, get specific event cost
        if (eventName) {
            const response = chatbotHandler.getEventCost(eventName);
            return res.json(response);
        }

        // Get response from chatbot
        const response = await chatbotHandler.getResponse(message);
        res.json(response);
    } catch (error) {
        console.error('Error processing chatbot request:', error);
        res.status(500).json({ 
            status: 'error',
            message: 'Terjadi kesalahan pada server',
            error: error.message 
        });
    }
});

// Error handling middleware
router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        status: 'error',
        message: 'Terjadi kesalahan pada server',
        error: err.message
    });
});

module.exports = router;
