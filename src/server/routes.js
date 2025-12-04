const express = require('express');
const handler = require('./handler');
const ChatbotHandler = require('./ChatbotHandler');
const router = express.Router();
const { validateOrder, validatePortfolio } = require('./validator');
const chatbotHandler = new ChatbotHandler();

// == MIDDLEWARE VALIDASI ==

/**
 * Middleware untuk memvalidasi data Order (Pesanan) dari req.body
 */
const validateOrderMiddleware = (req, res, next) => {
    // Memvalidasi req.body dengan skema validateOrder
    const { error } = validateOrder(req.body); 
    if (error) {
        // Jika validasi gagal, kirim respons 400 Bad Request
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

const validatePortfolioMiddleware = (req, res, next) => {
    // Hanya ambil field yang ada di skema (eventName) dari req.body
    const { eventName } = req.body; 
    
    // Perhatikan: Kita hanya memvalidasi field yang DIBUTUHKAN Joi, 
    // bukan field file seperti imageUrl
    const { error } = validatePortfolio({ eventName, imageUrl: 'http://temp.url' });

    if (error) {
        // Jika validasi gagal, kirim respons 400 Bad Request
        return res.status(400).json({ error: error.details[0].message });
    }
    next(); // Lanjutkan ke handler jika validasi sukses
};

// == ROUTES PORTFOLIO ==

// GET /portfolio
router.get('/portfolio', handler.getPortfolios);

// GET /portfolio/:id
router.get('/portfolio/:id', handler.getPortfolioById);

// POST /portfolio
router.post('/portfolio', handler.authMiddleware, validatePortfolioMiddleware, handler.createPortfolio);

// PUT /portfolio/:id:
router.put('/portfolio/:id', handler.authMiddleware, validatePortfolioMiddleware, handler.updatePortfolio);

// DELETE /portfolio/:id
router.delete('/portfolio/:id', handler.authMiddleware, handler.deletePortfolio);

// == ROUTES ORDER ==

// GET /order
router.get('/order', handler.authMiddleware, handler.getOrder);

// GET /order/:id
router.get('/order/:id', handler.authMiddleware, handler.getOrdersById);

// POST /order
router.post('/order', validateOrderMiddleware, handler.createOrder);

// PUT /order/:id
router.put('/order/:id', handler.authMiddleware, handler.updateOrder);

// DELETE /order/:id
router.delete('/order/:id', handler.authMiddleware, handler.deleteOrder);

// == ROUTES AUTENTIKASI ==

// POST /login
router.post('/login', handler.loginHandler);

// POST /logout
router.post('/logout', handler.logout);

//  == ROUTES CHATBOT ==

/**
 * POST /chatbot: Menangani permintaan chatbot dari pengguna.
 * Logika: Mengatur bahasa, mencari biaya acara spesifik, atau mencari jawaban umum.
 */
router.post('/chatbot', async (req, res) => {
    try {
        const { message, language, eventName } = req.body;

        // 1. Set Bahasa: Jika 'language' disediakan, ubah bahasa chatbot.
        if (language) {
            chatbotHandler.setLanguage(language);
        }

        // 2. Cari Biaya Acara Spesifik: Jika 'eventName' disediakan.
        if (eventName) {
            const response = chatbotHandler.getEventCost(eventName);
            res.json(response);
            return; // Hentikan eksekusi dan kirim respons biaya acara
        }

        // 3. Respon Umum: Jika hanya 'message' yang disediakan (menggunakan TF-IDF).
        const response = await chatbotHandler.getResponse(message);

        res.json(response);
    } catch (error) {
        console.error('Error saat melakukan chatbot request:', error);
        // Kirim respons error 500 jika terjadi kegagalan server
        res.status(500).json({
            error: 'Internal server error',
            message: error.message
        });
    }
});

module.exports = router;