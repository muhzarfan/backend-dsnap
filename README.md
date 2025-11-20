# 🤝 Backend Website DSNAP

Repositori ini merupakan REST API untuk website DSNAP. DSNAP adalah perusahaan yang menyediakan jasa event organizer. Untuk melihat lebih lanjut informasi tentang perusahaan ini dapat mengakses link [Website DSNAP](https://snapsindo.vercel.app/). Website ini menyediakan fitur lihat informasi jasa yang ditawarkan dan pemesanan serta CRUD bagi admin untuk mengelola project/portfolio dan pemesanan dari klien. Website DSNAP juga tersedia Chatbot untuk tanya jawab seputar informasi DSNAP.

## Software yang Digunakan
- **Node.js**  
- **Express.js**  
- **Database** menggunakan PostgreSQL pada Supabase

## Instalasi & Menjalankan Server

1. Clone repositori:
   ```bash
   https://github.com/muhzarfan/backend-dsnap.git
   cd backend-dsnap
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Jalankan server:
   ```bash
   npm start
   ```
   atau jika menggunakan nodemon:
   ```bash
   npm run dev
   ```

4. Server akan berjalan di:
   ```
   http://localhost:4000
   ```

---

## Autentikasi
Sebagian besar endpoint membutuhkan **token JWT** yang diperoleh saat login. Token dikirimkan melalui header:

```
Authorization: Bearer <token>
```

---

## Dokumentasi Endpoint API

### 1. Login Admin
**Request**
```http
POST /api/login
```
**Body**
```json
{
  "username": "johndoe",
  "password": "password123"
}
```

**Response**
```json
{
    "message": "Login berhasil",
    "token": "token-dengan-karakter-random"
}
```

---

### 2. Logout Admin
**Request**
```http
POST /api/logout
```

**Response**
```json
{
    "message": "Logout berhasil"
}
```

---

### 3. GET Data Projects / Portfolio
**Request**
```http
GET /api/portfolio
```

**Response**
```json
{
    {
        "id": 1,
        "eventName": "Motion Ime",
        "imageUrl": "https://link-gambar.com/motionime.jpg"
    },
    // data selanjutnya
}
```

---

### 4. GET Data Project / Portfolio Berdasarkan ID
**Request**
```http
GET /api/pengumuman/:id
```

**Response**
```json
{
    {
        "id": 1,
        "eventName": "Motion Ime",
        "imageUrl": "https://link-gambar.com/motionime.jpg"
    }
}
```

---

### 5. Buat Data Project / Portfolio (Hanya Untuk Admin)
**Request**
```http
POST /api/pengumuman
Authorization: Bearer <token>
```
**Body**
```
{
  "eventName": "Judul Event",
  "imageUrl": "upload-gambar-dalam-form-data-dengan-format-file.jpg"
}
```

**Response**
```json
{
    "message": "Portfolio berhasil dibuat",
    "data": [
        {
            "id": 1,
            "eventName": "Judul Event",
            "imageUrl": "https://link-gambar.com/upload-gambar-dalam-form-data-dengan-format-file.jpg"
        }
    ]
}
```

---

### 6. Edit Portfolio (Hanya Untuk Admin)
**Request**
```http
PUT /api/pengumuman/:id
Authorization: Bearer <token>
```

**Body**
```
{
  "eventName": "Ganti Nama Event",
  "imageUrl": "gambar-baru.jpg"
}
```

**Response**
```json
{
    "message": "Portfolio berhasil diubah",
    "data": [
        {
            "id": 1,
            "eventName": "Ganti Nama Event",
            "imageUrl": "https://link-gambar.com/gambar-baru.jpg"
        }
    ]
}
```

---

### 7. Hapus Project / Portfolio (Hanya Untuk Admin)
**Request**
```http
DELETE /api/pengumuman/:id
Authorization: Bearer <token>
```

**Response**
```json
{
    "message": "Portfolio berhasil dihapus"
}
```

---

### 8. Lihat Produk
**Request**
```http
GET /api/produk
```

**Response**
```json
[
    {
        "id": 1,
        "name": "ABC",
        "email": "abcindonesia@gmail.com",
        "subject": "ABC x Bigbang Festival",
        "date": "2025-01-30T00:00:00+00:00",
        "message": "Kami ingin memesan jasa untuk event bigbang festival @ Jiexpo Kemayoran",
        "no_telepon": "081234567890",
        "jenis_paket": "Medium"
    },
    // data selanjutnya
]
```

---

### 9. Lihat Produk Berdasarkan ID
**Request**
```http
GET /api/produk/:id
```

**Response**
```json
{
  "id": 1,
  "name": "ABC",
  "email": "abcindonesia@gmail.com",
  "subject": "ABC x Bigbang Festival",
  "date": "2025-01-30T00:00:00+00:00",
  "message": "Kami ingin memesan jasa untuk event bigbang festival @ Jiexpo Kemayoran",
  "no_telepon": "081234567890",
  "jenis_paket": "Medium"
}
```

---

### 10. Buat Order (Bagi Klien)
**Request**
```http
POST /api/produk/
```

**Body**
```
{
  "name": "Abah Zhongli",
  "email": "morax@gmail.com",
  "subject": "Lantern Rite",
  "date": "2025-01-15",
  "message": "Membutuhkan event organizer yang berpengalaman dalam acara besar",
  "no_telepon": "08123456789",
  "jenis_paket": "Medium"
}
```

**Response**
```json
{
    "message": "Pesanan berhasil dibuat"
}
```

---

### 11. Edit Order (Hanya Untuk Admin)
**Request**
```http
PUT /api/produk/:id
Authorization: Bearer <token>
```

**Body**
```
{
  "name": "Abah Zhongli Morax",
  "email": "morax@gmail.com",
  "subject": "Lantern Rite",
  "date": "2025-11-20",
  "message": "Membutuhkan event organizer yang berpengalaman dalam acara besar",
  "no_telepon": "08123456789",
  "jenis_paket": "Medium"
}
```

**Response**
```json
{
    "message": "Pesanan berhasil diubah"
}
```

---

### 12. Hapus Order Berdasarkan ID (Hanya Untuk Admin)
**Request**
```http
DELETE /api/produk/:id
Authorization: Bearer <token>
```

**Response**
```json
{
    "message": "Pesanan berhasil dihapus"
}
```

### 12. Chatbot
**Request**
```http
POST /api/chatbot
```

**Body**
```
{
  "message": "apa itu dsnap?",
  "language": "indonesia" // "indonesia" atau "english"
}
```

**Response**
```json
{
    "response": "D'SNAP adalah sebuah Event Organizer yang menyediakan berbagai layanan dalam aktivasi acara/brand strategis untuk klien. D'SNAP mulai beroperasi pada bulan Mei 2010 dan kini berlokasi di @ Radio Dalam, Jakarta, dengan 20 karyawan (Divisi Akun, Produksi, Konsep, & Kreatif). Setiap anggota tim berkomitmen untuk memberikan karya berkualitas tinggi yang mencerminkan nilai-nilai inti perusahaan: kreativitas, inovasi, dan kepuasan klien😊"
}
```
