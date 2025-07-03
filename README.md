# 🎮 PlayLogix  
*Fullstack Game Review Platform – Vue.js, Node.js, PostgreSQL, TypeScript*

PlayLogix adalah aplikasi web fullstack untuk katalog, ulasan, dan manajemen video game. Aplikasi ini mendukung fungsi autentikasi, manajemen akun pengguna, dasbor admin, dan pengelolaan ulasan game secara real-time. Dibangun menggunakan teknologi modern seperti Vue 3, Express.js, dan PostgreSQL.

---

## 🔧 Tech Stack

- **Frontend**: Vue 3, Pinia, Vue Router, TailwindCSS, TypeScript  
- **Backend**: Node.js, Express.js, TypeScript  
- **Database**: PostgreSQL (via Prisma ORM)  
- **Authentication**: JWT (token disimpan di local storage)  
- **Validation**: Zod  

---

## 📦 Fitur Utama

### 🔐 Autentikasi
- Registrasi & login pengguna
- Token JWT disimpan di localStorage
- Middleware otorisasi backend untuk membatasi akses

### 🕹️ Manajemen Game & Review
- Beranda menampilkan daftar game (GET)
- Tambah, ubah, dan hapus ulasan per game (POST, PUT, DELETE)
- Pembaruan data ulasan secara real-time di sisi klien

### 👤 Manajemen Akun
- Upload gambar profil
- Ganti nama dan email pengguna
- Tampilan responsif untuk perangkat mobile

### 🛡️ Admin Dashboard
- Hanya pengguna dengan peran **ADMIN** dapat mengakses halaman dashboard
- Admin dapat melihat seluruh pengguna dan menghapus akun tertentu
- Proteksi rute backend untuk non-admin

---

## 🧩 Struktur Data (Model)

- `Game`
- `Review`
- `Console`
- `GameConsole` (pivot table)
- `Genre`
- `GameGenre` (pivot table)

---

## 🗂️ State Management
Menggunakan **Pinia**, seluruh store disimpan di direktori `stores/`.

---

## 📱 Responsif
Dirancang dengan **TailwindCSS** agar antarmuka nyaman digunakan di perangkat mobile dan desktop.

---

## 🚀 Deployment (Opsional)
Jika menggunakan CI/CD:
- **Frontend**: Vercel  
- **Backend**: Railway  
- **CI/CD**: GitHub Actions

---

## 📌 Instalasi Lokal

```bash
# Clone repository
git clone https://github.com/username/playlogix.git
cd playlogix

# Install dependencies
npm install

# Jalankan frontend & backend secara terpisah
cd frontend
npm run dev

cd ../backend
npm run dev
