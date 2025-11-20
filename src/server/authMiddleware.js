const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET; 

const authMiddleware = (req, res, next) => {
    if (!secretKey) {
        console.error("JWT_SECRET is not defined in environment variables.");
        return res.status(500).json({ error: "Server configuration error." });
    }
    
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: "Unauthorized: Token tidak tersedia" });
    }

    try {
        const decoded = jwt.verify(token, secretKey); 
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ error: "Token invalid atau kadaluarsa" });
    }
};

module.exports = authMiddleware;
