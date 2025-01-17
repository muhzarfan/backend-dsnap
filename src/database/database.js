const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = 'https://xhosbwvwvpnctmprlaay.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;

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
        console.log('Successfully connected to Supabase');
    } catch (err) {
        console.error('Error connecting to Supabase:', err.message);
        process.exit(1);
    }
}

testConnection();

module.exports = supabase;
