const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();
const multer = require('multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authMiddleware = require('./authMiddleware');

console.log('Handler module loaded');

// Mendapatkan URL dan Kunci Layanan Supabase dari variabel lingkungan
const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

// Pengecekan keamanan dasar untuk variabel lingkungan
if (!supabaseUrl || !supabaseKey) {
    console.error("Error: SUPABASE_URL dan SUPABASE_SERVICE_KEY seharusnya ada di environment variables.");
    process.exit(1);
}

// Inisialisasi Klien Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

// --- Konfigurasi Multer ---
// Menggunakan penyimpanan memori (file disimpan sebagai buffer di RAM sebelum diunggah ke Supabase Storage)
const storage = multer.memoryStorage();
// Menginisialisasi Multer dengan konfigurasi storage
const upload = multer({ storage: storage });

// =================================================================
// --- Portfolio Handlers (CRUD dengan Supabase Storage) ---
// =================================================================

/**
 * Mendapatkan semua portofolio.
 * Melakukan query ke database dan membuat Signed URL untuk setiap gambar 
 * karena bucket 'gambar-event' bersifat private.
 */
exports.getPortfolios = async (req, res) => {
    const bucketName = 'gambar-event';
    // 1. Ambil data portofolio dari tabel
    const { data, error } = await supabase.from('portfolios').select('*');
    if (error) return res.status(500).json({ error: error.message });
    
    // 2. Membuat Signed URL untuk setiap entri (diperlukan untuk mengakses file private)
    const portfoliosWithSignedUrls = await Promise.all(data.map(async (portfolio) => {
        // Asumsi imageUrl di database menyimpan nama file (path)
        const storedUrl = portfolio.imageUrl;
        const urlParts = storedUrl.split('/');
        const fileName = urlParts[urlParts.length - 1];

        // Membuat Signed URL yang berlaku selama 60 detik (TTL)
        const { data: signedUrlData, error: signedUrlError } = await supabase.storage
            .from(bucketName)
            .createSignedUrl(fileName, 60); 

        if (signedUrlError) {
             console.error(`Error membuat Signed URL untuk ${fileName}:`, signedUrlError);
             return { ...portfolio, imageUrl: null, urlError: 'Gagal membuat URL akses gambar' }; 
        }
        
        // Mengganti imageUrl lama dengan Signed URL yang baru
        return { ...portfolio, imageUrl: signedUrlData.signedUrl };
    }));
    
    res.json(portfoliosWithSignedUrls);
};

/**
 * Mendapatkan portofolio berdasarkan ID.
 * Mirip dengan getPortfolios, tetapi hanya untuk satu entri.
 */
exports.getPortfolioById = async (req, res) => {
    const { id } = req.params;
    const bucketName = 'gambar-event';
    
    // 1. Ambil data tunggal dari tabel berdasarkan ID
    const { data, error } = await supabase.from('portfolios').select('*').eq('id', id).single();
    if (error) return res.status(404).json({ message: 'Portfolio tidak ditemukan' });

    // 2. Ekstraksi nama file untuk pembuatan Signed URL
    const storedUrl = data.imageUrl;
    const urlParts = storedUrl.split('/');
    const fileName = urlParts[urlParts.length - 1]; 
    
    // 3. Membuat Signed URL
    const { data: signedUrlData, error: signedUrlError } = await supabase.storage
        .from(bucketName)
        .createSignedUrl(fileName, 60);
        
    if (signedUrlError) {
        console.error(`Error membuat Signed URL untuk ${fileName}:`, signedUrlError);
        return res.status(500).json({ message: 'Gagal membuat URL akses untuk gambar' });
    }
    
    // 4. Mengganti URL
    const finalData = { ...data, imageUrl: signedUrlData.signedUrl };

    res.json(finalData);
};

/**
 * Membuat portofolio baru.
 * Menggunakan Multer untuk menangani upload file dan Supabase untuk menyimpan metadata dan file.
 */
exports.createPortfolio = (req, res) => {
    // Middleware Multer untuk menangani field 'imageUrl'
    upload.single('imageUrl')(req, res, async (err) => {
        if (err) return res.status(500).json({ error: err.message });

        const { eventName } = req.body;
        // Validasi input
        if (!eventName) return res.status(400).json({ error: 'Event name harus terisi' });
        if (!req.file) {
            return res.status(400).json({ error: 'Image file harus terisi' });
        }

        try {
            // Test koneksi database (opsional, untuk memastikan database aktif)
            const { data: testData, error: testError } = await supabase
                .from('portfolios')
                .select('*')
                .limit(1);
                
            if (testError) {
                console.error('Database connection test error:', testError);
                return res.status(500).json({ 
                    error: 'Database connection error', 
                    details: testError 
                });
            }

            const file = req.file;
            // Membuat nama file unik berdasarkan timestamp
            const fileName = `${Date.now()}_${file.originalname}`;

            // 1. Insert metadata awal (dengan nama file sementara/unik) ke database
            const { data: insertData, error: insertError } = await supabase
                .from('portfolios')
                .insert([{ 
                    eventName,
                    imageUrl: fileName // sementara menggunakan nama file unik
                }])
                .select(); // Mengembalikan data yang baru di-insert

            if (insertError) {
                console.error('Insert error:', insertError);
                return res.status(500).json({ 
                    error: 'Database insert error', 
                    details: insertError 
                });
            }

            // 2. Upload file ke Supabase Storage
            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('gambar-event')
                .upload(fileName, file.buffer, { 
                    contentType: file.mimetype,
                    upsert: true // Memungkinkan update jika nama file sudah ada
                });

            if (uploadError) {
                console.error('File upload error:', uploadError);
                return res.status(500).json({ 
                    error: 'File upload error', 
                    details: uploadError 
                });
            }

            // 3. Dapatkan URL Public (untuk digunakan sebagai path storage)
            const { data: publicUrlData } = supabase.storage
                .from('gambar-event')
                .getPublicUrl(fileName);

            // 4. Update row di database dengan URL Public yang lengkap
            const { data: updateData, error: updateError } = await supabase
                .from('portfolios')
                .update({ imageUrl: publicUrlData.publicUrl })
                .eq('id', insertData[0].id)
                .select();

            if (updateError) {
                console.error('Update error:', updateError);
                return res.status(500).json({ 
                    error: 'URL update error', 
                    details: updateError 
                });
            }

            res.status(201).json({ 
                message: 'Portfolio berhasil dibuat',
                data: updateData
            });

        } catch (error) {
            console.error('Unexpected error:', error);
            res.status(500).json({ 
                error: 'Terjadi error tak terduga',
                details: error.message
            });
        }
    });
};

/**
 * Mengubah data portofolio.
 * Mendukung perubahan eventName dan/atau penggantian file gambar.
 */
exports.updatePortfolio = (req, res) => {
    const { id } = req.params;
    upload.single('imageUrl')(req, res, async (err) => {
        if (err) return res.status(500).json({ error: err.message });

        const { eventName } = req.body;
        let imageUrl = null;
        const bucketName = 'gambar-event';

        // Jika ada file baru yang diupload
        if (req.file) {
            const file = req.file;
            const fileName = `${Date.now()}_${file.originalname}`;

            try {
                // 1. Upload file baru ke Supabase Storage
                const { data: uploadData, error: uploadError } = await supabase.storage
                    .from(bucketName)
                    .upload(fileName, file.buffer, { contentType: file.mimetype });

                if (uploadError) throw uploadError;

                // 2. Dapatkan URL Public untuk file baru
                const { data: publicUrlData } = supabase.storage
                    .from(bucketName)
                    .getPublicUrl(fileName);
                imageUrl = publicUrlData.publicUrl;
            } catch (uploadError) {
                return res.status(500).json({ error: uploadError.message });
            }
        }

        // Siapkan objek data untuk diupdate di database
        const updateData = imageUrl ? { eventName, imageUrl } : { eventName };
        
        try {
            // 3. Update data di tabel 'portfolios'
            const { error } = await supabase.from('portfolios').update(updateData).eq('id', id);
            if (error) throw error;

            res.json({ message: 'Portfolio berhasil diubah' });
        } catch (dbError) {
            res.status(500).json({ error: dbError.message });
        }
    });
};

/**
 * Menghapus portofolio berdasarkan ID.
 * Catatan: Handler ini hanya menghapus metadata dari tabel, tidak menghapus file dari Storage.
 */
exports.deletePortfolio = async (req, res) => {
    const { id } = req.params;
    try {
        // Hapus entri dari tabel 'portfolios'
        const { error } = await supabase.from('portfolios').delete().eq('id', id);
        if (error) throw error;
        res.json({ message: 'Portfolio berhasil dihapus' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// =================================================================
// --- Order Handlers ---
// =================================================================

/**
 * Mendapatkan semua pesanan (Orders).
 * AKAN DILINDUNGI DENGAN authMiddleware agar memerlukan Bearer Token.
 */
// Original: exports.getOrder = async (req, res) => { ... }
// Implementasi: exports.getOrder = [authMiddleware, async (req, res) => { ... }] di file rute
exports.getOrder = async (req, res) => {
    const { data, error } = await supabase.from('orders').select('*');
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
};

/**
 * Mendapatkan pesanan berdasarkan ID.
 * Membutuhkan otentikasi (Bearer Token) - umumnya digunakan di sisi admin.
 */
exports.getOrdersById = async (req, res) => {
    const { id } = req.params;
    const { data, error } = await supabase.from('orders').select('*').eq('id', id).single();
    if (error) return res.status(404).json({ message: 'Pesanan tidak ditemukan' });
    res.json(data);
};

/**
 * Membuat pesanan baru (Order).
 * Ini adalah rute publik (tidak memerlukan otentikasi) untuk formulir pemesanan/reservasi.
 */
exports.createOrder = async (req, res) => {
    const { name, email, subject, date, message, no_telepon, jenis_paket } = req.body;
    try {
        const { error } = await supabase.from('orders').insert([
            { name, email, subject, date, message, no_telepon, jenis_paket },
        ]);
        if (error) throw error;
        res.status(201).json({ message: 'Pesanan berhasil dibuat' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Mengubah data pesanan.
 * Membutuhkan otentikasi (Bearer Token) - hanya bisa dilakukan oleh admin.
 */
exports.updateOrder = async (req, res) => {
    const { id } = req.params;
    const { name, email, subject, date, message, no_telepon, jenis_paket } = req.body;
    try {
        const { error } = await supabase.from('orders').update({
            name, email, subject, date, message, no_telepon, jenis_paket,
        }).eq('id', id);
        if (error) throw error;
        res.json({ message: 'Pesanan berhasil diubah' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Menghapus pesanan.
 * AKAN DILINDUNGI DENGAN authMiddleware agar memerlukan Bearer Token.
 */
// Original: exports.deleteOrder = async (req, res) => { ... }
// Implementasi: exports.deleteOrder = [authMiddleware, async (req, res) => { ... }] di file rute
exports.deleteOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const { error } = await supabase.from('orders').delete().eq('id', id);
        if (error) throw error;
        res.json({ message: 'Pesanan berhasil dihapus' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// =================================================================
// --- Login/Auth Handlers ---
// =================================================================

/**
 * Handler untuk proses Login Admin.
 * Memverifikasi kredensial (username dan password) dan membuat JWT jika sukses.
 */
exports.loginHandler = async (req, res) => {
    const { username, password } = req.body;
    
    // 1. Cari admin berdasarkan username
    const { data: admins, error } = await supabase.from('admins').select('*').eq('username', username);
    
    if (error || admins.length === 0) 
        return res.status(401).json({ message: 'Username atau Password Salah' });

    const admin = admins[0];
    
    // 2. Bandingkan password yang diinput dengan hash password di database
    const isMatch = await bcrypt.compare(password, admin.password);
    
    if (!isMatch) 
        return res.status(401).json({ message: 'Username atau Password Salah' });

    // 3. Buat JWT jika autentikasi berhasil
    const token = jwt.sign(
        { id: admin.id, username: admin.username }, 
        process.env.JWT_SECRET, 
        { expiresIn: '1h' } // Token kadaluarsa dalam 1 jam
    );
    
    res.status(200).json({ message: 'Login berhasil', token });
};

/**
 * Handler Logout (hanya menginformasikan client bahwa sesi sudah berakhir).
 * Sesi sejati diakhiri oleh client dengan menghapus token.
 */
exports.logout = (req, res) => {
    res.status(200).json({ message: "Logout berhasil" });
};

// Ekspor Modul
module.exports = {
    getPortfolios: exports.getPortfolios,
    getPortfolioById: exports.getPortfolioById,
    createPortfolio: exports.createPortfolio,
    updatePortfolio: exports.updatePortfolio,
    deletePortfolio: exports.deletePortfolio,
    getOrder: exports.getOrder,
    getOrdersById: exports.getOrdersById,
    createOrder: exports.createOrder,
    updateOrder: exports.updateOrder,
    deleteOrder: exports.deleteOrder,
    loginHandler: exports.loginHandler,
    logout: exports.logout,
    authMiddleware: authMiddleware,
};