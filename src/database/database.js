const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Mendapatkan URL Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

// Menampilkan pesan kesalahan jika ada variabel yang hilang
if (!supabaseUrl || !supabaseKey) {
    console.error("Error: Variabel SUPABASE_URL atau SUPABASE_SERVICE_KEY tidak ditemukan di environment.");
    process.exit(1);
}

// Membuat instance klien Supabase baru
const supabase = createClient(supabaseUrl, supabaseKey, {
    // Opsi konfigurasi otentikasi
    auth: {
        autoRefreshToken: false, // Menonaktifkan refresh token otomatis
        persistSession: false  // Menonaktifkan penyimpanan sesi (memastikan koneksi tanpa sesi persisten)
    }
});

/**
 * Fungsi untuk menguji koneksi ke Supabase.
 * Melakukan query sederhana ke tabel 'admins' untuk memverifikasi koneksi.
 */
async function testConnection() {
    try {
        // Mencoba memilih satu baris dari tabel pada Supabase
        const { data, error } = await supabase.from('admins').select('*').limit(1);
        // Memeriksa jika ada error selama query
        if (error) {
            throw error;
        }
        // Menampilkan pesan sukses jika koneksi berhasil
        console.log('Berhasil terhubung ke Supabase');
    } catch (err) {
        // Menangkap dan menampilkan error koneksi
        console.error('Error saat terhubung ke Supabase:', err.message);
        process.exit(1);
    }
}

// Menjalankan tes koneksi saat skrip dimuat
testConnection();

module.exports = supabase;

