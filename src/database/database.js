const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Error: SUPABASE_URL dan SUPABASE_ANON_KEY seharusnya ada di environment variables.");
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
