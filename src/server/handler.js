const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();
const multer = require('multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

console.log('Handler module loaded');

// Konfigurasi Supabase Client
const supabaseUrl = 'https://xhosbwvwvpnctmprlaay.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Konfigurasi penyimpanan file dengan Multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Portfolio Handlers
exports.getPortfolios = async (req, res) => {
    const { data, error } = await supabase.from('portfolios').select('*');
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
};

exports.getPortfolioById = async (req, res) => {
    const { id } = req.params;
    const { data, error } = await supabase.from('portfolios').select('*').eq('id', id).single();
    if (error) return res.status(404).json({ message: 'Portfolio not found' });
    res.json(data);
};

exports.createPortfolio = (req, res) => {
    upload.single('imageUrl')(req, res, async (err) => {
        if (err) return res.status(500).json({ error: err.message });

        const { eventName } = req.body;
        if (!eventName) return res.status(400).json({ error: 'Event name is required' });

        if (!req.file) {
            return res.status(400).json({ error: 'Image file is required' });
        }

        try {
            // Test koneksi database dengan query sederhana
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

            // Coba insert data tanpa upload file dulu
            const { data: insertData, error: insertError } = await supabase
                .from('portfolios')
                .insert([{ 
                    eventName,
                    imageUrl: 'temporary_url'
                }])
                .select();

            if (insertError) {
                console.error('Insert error:', insertError);
                return res.status(500).json({ 
                    error: 'Database insert error', 
                    details: insertError 
                });
            }

            // Jika insert berhasil, lanjut upload file
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

            // Update record dengan URL file yang benar
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
                message: 'Portfolio created successfully',
                data: updateData
            });

        } catch (error) {
            console.error('Unexpected error:', error);
            res.status(500).json({ 
                error: 'Unexpected error occurred',
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

            res.json({ message: 'Portfolio updated successfully' });
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
        res.json({ message: 'Portfolio deleted successfully' });
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
    if (error) return res.status(404).json({ message: 'Order not found' });
    res.json(data);
};

exports.createOrder = async (req, res) => {
    const { name, email, subject, date, message, no_telepon, jenis_paket } = req.body;
    try {
        const { error } = await supabase.from('orders').insert([
            { name, email, subject, date, message, no_telepon, jenis_paket },
        ]);
        if (error) throw error;
        res.status(201).json({ message: 'Order created successfully' });
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
        res.json({ message: 'Order updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const { error } = await supabase.from('orders').delete().eq('id', id);
        if (error) throw error;
        res.json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Login Handlers
exports.loginHandler = async (req, res) => {
    const { username, password } = req.body;
    const { data: admins, error } = await supabase.from('admins').select('*').eq('username', username);
    if (error || admins.length === 0) return res.status(401).json({ message: 'Invalid username or password' });

    const admin = admins[0];
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid username or password' });

    const token = jwt.sign({ id: admin.id, username: admin.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
};

exports.logout = (req, res) => {
    res.status(200).json({ message: "Logout successful" });
};

// Ekspor Semua Fungsi
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
};

