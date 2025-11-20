const express = require('express');
const handler = require('./handler');
const ChatbotHandler = require('./ChatbotHandler');
const router = express.Router();

const chatbotHandler = new ChatbotHandler();

// Routes portfolio CRUD
router.get('/portfolio', handler.getPortfolios);
router.get('/portfolio/:id', handler.getPortfolioById);
router.post('/portfolio', handlers.authMiddleware, handler.createPortfolio);
router.put('/portfolio/:id', handlers.authMiddleware, handler.updatePortfolio);
router.delete('/portfolio/:id', handlers.authMiddleware, handler.deletePortfolio);

// Routes order CRUD
router.get('/order', handler.getOrder);
router.get('/order/:id', handler.getOrdersById);
router.post('/order', handlers.authMiddleware, handler.createOrder);
router.put('/order/:id', handlers.authMiddleware, handler.updateOrder);
router.delete('/order/:id', handlers.authMiddleware, handler.deleteOrder);

// Route login
router.post('/login', handler.loginHandler);

// Route logout
router.post('/logout', handler.logout);

// Router chatbot
router.post('/chatbot', async (req, res) => {
    try {
        const { message, language, eventName } = req.body;

        if (language) {
            chatbotHandler.setLanguage(language);
        }

        if (eventName) {
            const response = chatbotHandler.getEventCost(eventName);
            res.json(response);
            return;
        }

        const response = await chatbotHandler.getResponse(message);

        res.json(response);
    } catch (error) {
        console.error('Error saat melakukan chatbot request:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: error.message
        });
    }
});

module.exports = router;
