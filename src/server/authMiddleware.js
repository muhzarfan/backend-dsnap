const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET; 

/**
 * Middleware otentikasi untuk memverifikasi JSON Web Token (JWT).
 * @param {object} req - Objek permintaan Express (Request)
 * @param {object} res - Objek respons Express (Response)
 * @param {function} next - Fungsi callback untuk meneruskan ke middleware/handler berikutnya
 */
const authMiddleware = (req, res, next) => {
    // Cek Secret Key Server
    if (!secretKey) {
        console.error("JWT_SECRET is not defined in environment variables.");
        // Respon error jika server belum dikonfigurasi dengan benar
        return res.status(500).json({ error: "Server configuration error." });
    }
    
    // Ekstraksi Token dari Header
    // Mencari header 'Authorization'. Format yang diharapkan: "Bearer <token>"
    // .split(' ')[1] mengambil bagian token setelah kata "Bearer"
    const token = req.headers.authorization?.split(' ')[1];

    // Pengecekan Ketersediaan Token
    if (!token) {
        // Respon error 401 Unauthorized jika token tidak ditemukan
        return res.status(401).json({ error: "Unauthorized: Token tidak tersedia" });
    }

    // Verifikasi Token
    try {
        // Verifikasi token menggunakan secret key
        const decoded = jwt.verify(token, secretKey); 
        // Menambahkan payload (data) dari token yang sudah didekode ke objek req.user
        // yang memungkinkan handler rute berikutnya mengakses data pengguna (seperti, ID pengguna)
        req.user = decoded;
        // Meneruskan kontrol ke middleware atau handler rute berikutnya
        next();
    } catch (error) {
        // Menangkap error jika token tidak valid (token salah atau kadaluarsa)
        return res.status(403).json({ error: "Token invalid atau kadaluarsa" });
    }
};

module.exports = authMiddleware;
