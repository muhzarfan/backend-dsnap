# 🤝 Backend Website DSNAP

Repositori ini berisi **REST API** untuk website DSNAP. DSNAP adalah perusahaan yang menyediakan layanan event organizer. Website ini memiliki fitur untuk melihat informasi layanan, melakukan pemesanan, serta menyediakan panel admin untuk mengelola portfolio dan pesanan. Website ini juga dilengkapi **Chatbot** untuk menjawab pertanyaan seputar DSNAP.

---

## 💻 Software yang Digunakan
- **Node.js**
- **Express.js**
- **PostgreSQL** (Supabase)

---

## ⚙️ Instalasi & Menjalankan Server

### 1. Clone repositori
```
https://github.com/muhzarfan/backend-dsnap.git
cd backend-dsnap
```

### 2. Install dependencies
```
npm install express body-parser express-session cors dotenv jsonwebtoken bcrypt natural @supabase/supabase-js multer joi
```

### 3. Jalankan server
```
npm start
```
atau dengan nodemon:
```
npm run dev
```

Server berjalan di:
```
http://localhost:4000
```

---

## 🔑 Autentikasi
Sebagian besar endpoint Admin membutuhkan **JWT Token**.

Header:
```
Authorization: Bearer <token>
```

---

## 📖 Dokumentasi Endpoint API

# 1. Login / Logout Admin

### POST /api/login — Publik
Body:
```json
{
  "username": "johndoe",
  "password": "password123"
}
```
Response:
```json
{
  "message": "Login berhasil",
  "token": "token-dengan-karakter-random"
}
```

### POST /api/logout — Publik (Penghapusan token dilakukan pada Frontend)
Response:
```json
{
  "message": "Logout berhasil"
}
```

---

# 2. Portfolio

### GET /api/portfolio — Publik
```json
[
  {
    "id": 1,
    "eventName": "Motion Ime",
    "imageUrl": "https://link-gambar.com/motionime.jpg"
  }
]
```

### GET /api/portfolio/:id — Publik
```json
{
  "id": 1,
  "eventName": "Motion Ime",
  "imageUrl": "https://link-gambar.com/motionime.jpg"
}
```

### POST /api/portfolio — Admin Only
Header:
```
Authorization: Bearer <token>
```
Body (multipart/form-data):
```
eventName: "Judul Event"
imageUrl: file gambar
```
Response:
```json
{
  "message": "Portfolio berhasil dibuat",
  "data": {
    "id": 2,
    "eventName": "Judul Event",
    "imageUrl": "https://link-gambar.com/nama-file.jpg"
  }
}
```

### PUT /api/portfolio/:id — Admin Only
Body:
```
eventName: "Nama Baru"
imageUrl: file (opsional)
```
Response:
```json
{
  "message": "Portfolio berhasil diubah"
}
```

### DELETE /api/portfolio/:id — Admin Only
Response:
```json
{
  "message": "Portfolio berhasil dihapus"
}
```

---

# 3. Order

### GET /api/order — Admin Only
```json
[
  {
    "id": 1,
    "name": "ABC",
    "email": "abcindonesia@gmail.com",
    "subject": "ABC x Bigbang Festival",
    "date": "2025-01-30T00:00:00+00:00",
    "jenis_paket": "Medium"
  }
]
```

### GET /api/order/:id — Admin Only
```json
{
  "id": 1,
  "name": "ABC",
  "email": "abcindonesia@gmail.com",
  "subject": "ABC x Bigbang Festival",
  "date": "2025-01-30T00:00:00+00:00",
  "message": "Event activation project",
  "no_telepon": "08123456789",
  "jenis_paket": "Medium"
}
```

### POST /api/order — Publik
Body:
```json
{
  "name": "Abah Zhongli",
  "email": "morax@gmail.com",
  "subject": "Lantern Rite",
  "date": "2025-01-15",
  "message": "Membutuhkan event organizer",
  "no_telepon": "08123456789",
  "jenis_paket": "Medium"
}
```
Response:
```json
{
  "message": "Pesanan berhasil dibuat",
  "id": 4
}
```

### PUT /api/order/:id — Admin Only
Body:
```json
{
  "name": "Abah Zhongli Morax",
  "email": "morax@gmail.com",
  "subject": "Lantern Rite Festival",
  "date": "2025-11-20",
  "message": "Update detail acara",
  "no_telepon": "08123456789",
  "jenis_paket": "Large"
}
```
Response:
```json
{
  "message": "Pesanan berhasil diubah"
}
```

### DELETE /api/order/:id — Admin Only
Response:
```json
{
  "message": "Pesanan berhasil dihapus"
}
```

---

# 4. Chatbot

### POST /api/chatbot — Publik
Body:
```json
{
  "message": "apa itu dsnap?",
  "language": "indonesia"
}
```
Response:
```json
{
  "response": "D'SNAP adalah sebuah Event Organizer..."
}
```

---
