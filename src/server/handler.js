const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Konfigurasi Supabase Client
const supabaseUrl = 'https://xhosbwvwvpnctmprlaay.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Portfolio Handlers
exports.getPortfolios = async (req, res) => {
    try {
        const { data, error } = await supabase.from('portfolios').select('*');
        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getPortfolioById = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase
            .from('portfolios')
            .select('*')
            .eq('id', id)
            .single();
            
        if (error) {
            return res.status(404).json({ message: 'Portfolio not found' });
        }
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createPortfolio = async (req, res) => {
    try {
        const { eventName } = req.body;
        const imageFile = req.files?.image;

        if (!eventName || !imageFile) {
            return res.status(400).json({
                status: 'error',
                message: 'Event name dan image harus diisi'
            });
        }

        if (imageFile.size > 5 * 1024 * 1024) {
            return res.status(400).json({
                status: 'error',
                message: 'Ukuran file tidak boleh lebih dari 5MB'
            });
        }

        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        if (!allowedTypes.includes(imageFile.mimetype)) {
            return res.status(400).json({
                status: 'error',
                message: 'Format file harus jpg, jpeg, atau png'
            });
        }

        const fileName = `${Date.now()}-${imageFile.name}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
            .from('gambar-event')
            .upload(fileName, imageFile.data, {
                contentType: imageFile.mimetype
            });

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
            .from('gambar-event')
            .getPublicUrl(fileName);

        const { data: portfolioData, error: portfolioError } = await supabase
            .from('portfolios')
            .insert([{ eventName, imageUrl: publicUrl }])
            .select();

        if (portfolioError) throw portfolioError;

        res.status(201).json({
            status: 'success',
            message: 'Portfolio berhasil dibuat',
            data: portfolioData
        });

    } catch (error) {
        console.error('Create portfolio error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Terjadi kesalahan server',
            error: error.message
        });
    }
};

exports.updatePortfolio = async (req, res) => {
    try {
        const { id } = req.params;
        const { eventName } = req.body;
        const imageFile = req.files?.image;

        let updateData = { eventName };

        if (imageFile) {
            if (imageFile.size > 5 * 1024 * 1024) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Ukuran file tidak boleh lebih dari 5MB'
                });
            }

            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
            if (!allowedTypes.includes(imageFile.mimetype)) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Format file harus jpg, jpeg, atau png'
                });
            }

            const fileName = `${Date.now()}-${imageFile.name}`;

            const { error: uploadError } = await supabase.storage
                .from('gambar-event')
                .upload(fileName, imageFile.data, {
                    contentType: imageFile.mimetype
                });

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('gambar-event')
                .getPublicUrl(fileName);

            updateData.imageUrl = publicUrl;
        }

        const { error } = await supabase
            .from('portfolios')
            .update(updateData)
            .eq('id', id);

        if (error) throw error;

        res.json({ 
            status: 'success',
            message: 'Portfolio updated successfully' 
        });
    } catch (error) {
        console.error('Update portfolio error:', error);
        res.status(500).json({ 
            status: 'error',
            message: 'Failed to update portfolio',
            error: error.message 
        });
    }
};

exports.deletePortfolio = async (req, res) => {
    try {
        const { id } = req.params;
        const { error } = await supabase.from('portfolios').delete().eq('id', id);
        if (error) throw error;
        res.json({ message: 'Portfolio deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Order Handlers
exports.createOrder = async (req, res) => {
    try {
        const { name, email, subject, date, message, no_telepon, jenis_paket } = req.body;
        const { error } = await supabase
            .from('orders')
            .insert([{ name, email, subject, date, message, no_telepon, jenis_paket }]);
        if (error) throw error;
        res.status(201).json({ message: 'Order created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getOrder = async (req, res) => {
    try {
        const { data, error } = await supabase.from('orders').select('*');
        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getOrdersById = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .eq('id', id)
            .single();
        if (error) return res.status(404).json({ message: 'Order not found' });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, subject, date, message, no_telepon, jenis_paket } = req.body;
        const { error } = await supabase
            .from('orders')
            .update({ name, email, subject, date, message, no_telepon, jenis_paket })
            .eq('id', id);
        if (error) throw error;
        res.json({ message: 'Order updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const { error } = await supabase.from('orders').delete().eq('id', id);
        if (error) throw error;
        res.json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.loginHandler = async (req, res) => {
    try {
        const { username, password } = req.body;
        const { data: admins, error } = await supabase
            .from('admins')
            .select('*')
            .eq('username', username);

        if (error || admins.length === 0) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const admin = admins[0];
        const isMatch = await bcrypt.compare(password, admin.password);
        
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const token = jwt.sign(
            { id: admin.id, username: admin.username }, 
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
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
