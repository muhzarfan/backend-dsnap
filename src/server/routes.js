const express = require('express');
const handler = require('./handler');
const ChatbotHandler = require('./ChatbotHandler');
const router = express.Router();

const chatbotHandler = new ChatbotHandler();

// Routes for portfolio CRUD
router.get('/portfolio', handler.getPortfolios);
router.get('/portfolio/:id', handler.getPortfolioById);
router.post('/portfolio', handler.createPortfolio);
router.put('/portfolio/:id', handler.updatePortfolio);
router.delete('/portfolio/:id', handler.deletePortfolio);

// Routes for order CRUD
router.get('/order', handler.getOrder);
router.get('/order/:id', handler.getOrdersById);
router.post('/order', handler.createOrder);
router.put('/order/:id', handler.updateOrder);
router.delete('/order/:id', handler.deleteOrder);

// Route for login
router.post('/login', handler.loginHandler);

// Route for logout
router.post('/logout', handler.logout);

// Router for chatbot
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
            res.json(response);
            return;
        }

        // Get response from chatbot
        const response = await chatbotHandler.getResponse(message);

        res.json(response);
    } catch (error) {
        console.error('Error processing chatbot request:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: error.message
        });
    }
});

module.exports = router;