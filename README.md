# 📚 LibroSphere - Modern Library Management System

[![Laravel Version](https://img.shields.io/badge/Laravel-12.x-red.svg)](https://laravel.com)
[![Inertia.js](https://img.shields.io/badge/Inertia.js-React-purple.svg)](https://inertiajs.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-blue.svg)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**LibroSphere** adalah platform manajemen perpustakaan berbasis web yang dirancang untuk menjembatani efisiensi operasional staf dengan pengalaman interaktif anggota. Dibangun dengan *Monolith Stack* modern (Laravel, Inertia, React) untuk memastikan performa maksimal dan kemudahan pemeliharaan.

---

## 🛠 Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Backend** | Laravel 12 (PHP 8.2+) |
| **Frontend** | React 18 + Inertia.js |
| **Styling** | Tailwind CSS + Shadcn/ui |
| **Database** | MySQL 8.0 / PostgreSQL |
| **Caching** | Redis (Optional for Session & Cache) |
| **Real-time** | Laravel Reverb / Pusher (Optional for Notif) |

---

## ✨ Fitur Unggulan

### 🛡️ Role-Based Access Control (RBAC)
* **Super Admin:** Kendali penuh sistem & audit log.
* **Pustakawan:** Manajemen sirkulasi (Check-in/Out) & inventaris.
* **Anggota:** Akses OPAC, riwayat pinjam, dan reservasi mandiri.

### 📖 Manajemen Buku & Sirkulasi
* **Smart Cataloging:** Integrasi Google Books API untuk penarikan data via ISBN.
* **Granular Inventory:** Pelacakan unit fisik buku secara individu (Book Items).
* **Automated Fines:** Kalkulasi denda keterlambatan secara otomatis oleh sistem.
* **QR/Barcode Ready:** Mendukung scanner untuk mempercepat proses sirkulasi.

---

## 🏗️ Arsitektur Database



Sistem ini memisahkan antara **Metadata Buku** dan **Item Fisik** untuk mendukung skenario satu judul dengan banyak salinan (copies).

* `books` (Bibliografi): Menyimpan Judul, Penulis, ISBN, Cover.
* `book_items` (Unit): Menyimpan Kode Barcode unik, Status (Tersedia/Rusak/Hilang), dan Posisi Rak.
* `loans`: Logika transaksi peminjaman dengan relasi ke `users` dan `book_items`.

---

## 🚀 Instalasi Lokal

### Prasyarat
* PHP >= 8.2
* Composer
* Node.js & NPM
* MySQL / PostgreSQL

### Langkah-langkah

1.  **Clone & Masuk Folder**
    ```bash
    git clone [https://github.com/username/librosphere.git](https://github.com/username/librosphere.git)
    cd librosphere
    ```

2.  **Instalasi Dependensi**
    ```bash
    composer install
    npm install
    ```

3.  **Environment Setup**
    ```bash
    cp .env.example .env
    php artisan key:generate
    ```
    *Sesuaikan `DB_DATABASE`, `DB_USERNAME`, dan `DB_PASSWORD` di file `.env`.*

4.  **Database Migration & Seeding**
    ```bash
    php artisan migrate --seed
    ```

5.  **Running Server**
    Gunakan terminal terpisah atau jalankan secara paralel:
    ```bash
    # Terminal 1 (Backend)
    php artisan serve

    # Terminal 2 (Frontend)
    npm run dev
    ```

---

## 📈 Roadmap Pengembangan
- [ ] Integrasi WhatsApp Gateway untuk pengingat jatuh tempo.
- [ ] Export laporan ke format Excel & PDF.
- [ ] Fitur E-Book reader (PDF viewer) untuk koleksi digital.
- [ ] Mobile App menggunakan React Native (Long-term).

---

## 📝 Lisensi
Didistribusikan di bawah Lisensi MIT. Lihat `LICENSE` untuk informasi lebih lanjut.

---
Dikembangkan dengan ❤️ oleh [Muhzinur Rizki]