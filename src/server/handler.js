const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();
const multer = require('multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authMiddleware = require('./authMiddleware');

console.log('Handler module loaded');

// Koneksi supabase
const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Error: SUPABASE_URL dan SUPABASE_SERVICE_KEY seharusnya ada di environment variables.");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Simpan File pada Multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Portfolio Handlers
exports.getPortfolios = async (req, res) => {
    const bucketName = 'gambar-event';
    const { data, error } = await supabase.from('portfolios').select('*');
    if (error) return res.status(500).json({ error: error.message });
    
    // Membuat signed URL karena bucket private
    const portfoliosWithSignedUrls = await Promise.all(data.map(async (portfolio) => {
        const storedUrl = portfolio.imageUrl;
        const urlParts = storedUrl.split('/');
        const fileName = urlParts[urlParts.length - 1];

        const { data: signedUrlData, error: signedUrlError } = await supabase.storage
            .from(bucketName)
            .createSignedUrl(fileName, 60); 

        if (signedUrlError) {
             console.error(`Error membuat Signed URL untuk ${fileName}:`, signedUrlError);
             return { ...portfolio, imageUrl: null, urlError: 'Gagal membuat URL akses gambar' }; 
        }
        
        return { ...portfolio, imageUrl: signedUrlData.signedUrl };
    }));
    
    res.json(portfoliosWithSignedUrls);
};

exports.getPortfolioById = async (req, res) => {
    const { id } = req.params;
    const bucketName = 'gambar-event';
    const { data, error } = await supabase.from('portfolios').select('*').eq('id', id).single();
    if (error) return res.status(404).json({ message: 'Portfolio tidak ditemukan' });

    const storedUrl = data.imageUrl;
    const urlParts = storedUrl.split('/');
    const fileName = urlParts[urlParts.length - 1]; 
    
    const { data: signedUrlData, error: signedUrlError } = await supabase.storage
        .from(bucketName)
        .createSignedUrl(fileName, 60);
        
    if (signedUrlError) {
        console.error(`Error membuat Signed URL untuk ${fileName}:`, signedUrlError);
        return res.status(500).json({ message: 'Gagal membuat URL akses untuk gambar' });
    }
    
    const finalData = { ...data, imageUrl: signedUrlData.signedUrl };

    res.json(finalData);
};

exports.createPortfolio = (req, res) => {
    upload.single('imageUrl')(req, res, async (err) => {
        if (err) return res.status(500).json({ error: err.message });

        const { eventName } = req.body;
        if (!eventName) return res.status(400).json({ error: 'Event name harus terisi' });

        if (!req.file) {
            return res.status(400).json({ error: 'Image file harus terisi' });
        }

        try {
            // Test koneksi database
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
            const fileName = `${Date.now()}_${file.originalname}`;

            const { data: insertData, error: insertError } = await supabase
                .from('portfolios')
                .insert([{ 
                    eventName,
                    imageUrl: fileName
                }])
                .select();

            if (insertError) {
                console.error('Insert error:', insertError);
                return res.status(500).json({ 
                    error: 'Database insert error', 
                    details: insertError 
                });
            }

            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('gambar-event')
                .upload(fileName, file.buffer, { 
                    contentType: file.mimetype,
                    upsert: true 
                });

            if (uploadError) {
                console.error('File upload error:', uploadError);
                return res.status(500).json({ 
                    error: 'File upload error', 
                    details: uploadError 
                });
            }

            const { data: publicUrlData } = supabase.storage
                .from('gambar-event')
                .getPublicUrl(fileName);

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

exports.updatePortfolio = (req, res) => {
    const { id } = req.params;
    upload.single('imageUrl')(req, res, async (err) => {
        if (err) return res.status(500).json({ error: err.message });

        const { eventName } = req.body;
        let imageUrl = null;

        if (req.file) {
            const file = req.file;
            const fileName = `${Date.now()}_${file.originalname}`;
            const bucketName = 'gambar-event';

            try {
                const { data: uploadData, error: uploadError } = await supabase.storage
                    .from(bucketName)
                    .upload(fileName, file.buffer, { contentType: file.mimetype });

                if (uploadError) throw uploadError;

                const { data: publicUrlData } = supabase.storage
                    .from(bucketName)
                    .getPublicUrl(fileName);
                imageUrl = publicUrlData.publicUrl;
            } catch (uploadError) {
                return res.status(500).json({ error: uploadError.message });
            }
        }

        const updateData = imageUrl ? { eventName, imageUrl } : { eventName };
        try {
            const { error } = await supabase.from('portfolios').update(updateData).eq('id', id);
            if (error) throw error;

            res.json({ message: 'Portfolio berhasil diubah' });
        } catch (dbError) {
            res.status(500).json({ error: dbError.message });
        }
    });
};

exports.deletePortfolio = async (req, res) => {
    const { id } = req.params;
    try {
        const { error } = await supabase.from('portfolios').delete().eq('id', id);
        if (error) throw error;
        res.json({ message: 'Portfolio berhasil dihapus' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Order Handlers
exports.getOrder = async (req, res) => {
    const { data, error } = await supabase.from('orders').select('*');
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
};

exports.getOrdersById = async (req, res) => {
    const { id } = req.params;
    const { data, error } = await supabase.from('orders').select('*').eq('id', id).single();
    if (error) return res.status(404).json({ message: 'Pesanan tidak ditemukan' });
    res.json(data);
};

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

// Login Handlers
exports.loginHandler = async (req, res) => {
    const { username, password } = req.body;
    const { data: admins, error } = await supabase.from('admins').select('*').eq('username', username);
    if (error || admins.length === 0) return res.status(401).json({ message: 'Username atau Password Salah' });

    const admin = admins[0];
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: 'Username atau Password Salah' });

    const token = jwt.sign({ id: admin.id, username: admin.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login berhasil', token });
};

exports.logout = (req, res) => {
    res.status(200).json({ message: "Logout berhasil" });
};

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

