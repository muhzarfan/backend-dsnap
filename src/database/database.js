const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Error: Variabel SUPABASE_URL atau SUPABASE_SERVICE_KEY tidak ditemukan di environment.");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

async function testConnection() {
    try {
        const { data, error } = await supabase.from('admins').select('*').limit(1);
        if (error) {
            throw error;
        }
        console.log('Berhasil terhubung ke Supabase');
    } catch (err) {
        console.error('Error saat terhubung ke Supabase:', err.message);
        process.exit(1);
    }
}

testConnection();

module.exports = supabase;
