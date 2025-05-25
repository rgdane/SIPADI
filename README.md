# SIPADI - Sistem Informasi Pengelolaan Arsip Digital

SIPADI merupakan aplikasi berbasis web yang dirancang untuk mempermudah proses manajemen arsip berdasarkan kategori. Sistem ini memungkinkan pengguna untuk mengelola arsip secara efisien, menampilkan statistik arsip, dan melakukan pencarian/filtering arsip secara dinamis.

---

## 🚀 Fitur Utama

- Autentikasi pengguna (login, logout)
- Dashboard statistik arsip berdasarkan kategori
- Manajemen data pengguna, kategori, dan arsip
- Filter dan pencarian arsip berdasarkan kategori dan tanggal
- UI responsif menggunakan **React.js** dan **Ant Design**
- Backend API menggunakan **Laravel 10**
- Penyimpanan data menggunakan **MySQL**

---

## ⚙️ Spesifikasi Teknis

### Frontend
- **React.js** (Vite)
- **Ant Design** untuk komponen UI
- **React Router v6** untuk navigasi
- **Axios** untuk komunikasi API
- **Context API** untuk manajemen autentikasi

### Backend
- **Laravel 10**
- **Sanctum** untuk autentikasi API
- **MySQL** sebagai database
- Struktur REST API

---

## 🛠️ Cara Install dan Menjalankan Aplikasi

### 1. Clone Repository

```bash
git clone https://github.com/rgdane/SIPADI.git
cd SIPADI
```

---

### 2. Setup Backend (Laravel via Laragon)

```bash
cd backend
composer install
copy .env.example .env
php artisan key:generate

# Konfigurasi database di .env
DB_DATABASE=db_sipadi
DB_USERNAME=root
DB_PASSWORD=(sesuaikan dengan kebutuhan)

# Migrasi dan seeding
php artisan migrate --seed

# Jalankan server Laravel
php artisan serve
```

---

### 3. Setup Frontend (React.js)

```bash
cd frontend
npm install
```

#### Konfigurasi `.env` frontend:

Buat file `.env` di direktori frontend:

```env
VITE_API_URL=http://localhost:8000/api
VITE_BASE_URL=http://localhost:8000
```

---

### 4. Menjalankan Frontend

```bash
npm run dev
```

Akses aplikasi di: [http://localhost:5173](http://localhost:5173)

---

## 📁 Struktur Proyek

```bash
SIPADI/
│
├── backend/              # Laravel API
│   └── ...
│
└── frontend/             # React + Ant Design
    ├── components/
    ├── pages/
    ├── services/
    └── ...
```

---

## 📜 Lisensi

Aplikasi ini dikembangkan untuk keperluan akademik dan internal pemerintahan desa. Silakan gunakan dan modifikasi sesuai kebutuhan.