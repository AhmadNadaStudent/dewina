# DEWINA - Dewey Intelligent Navigator

Aplikasi panduan klasifikasi Dewey Decimal Classification (DDC) berbasis web yang dirancang untuk mendukung pembelajaran dan pengambilan keputusan klasifikasi bahan perpustakaan secara bertahap, transparan, dan terstruktur.

**Inovasi dari:** Perpustakaan Digital, Universitas Negeri Malang (UM)

---

## Tim Pengembang & Pembimbing

- **Dosen Pembimbing / Pengarah:**
  - Dr. Sokhibul Ansor, S.Sos., M.Hum.
- **Tim Pengembang & Pencipta:**
  - Novelia Eka Damayanti
  - Ahmad Nada Fadilla Wildansyah
  - Mohammad Affan Ghoffar
  - Rachmad Al Huda

---

## Fitur Utama

1. **Halaman Awal (Landing Page)**: Gerbang utama pengenalan identitas sistem dan prinsip klasifikasi DDC (*Discipline-First*, *Analisis Subjek*, *Konsistensi*).
2. **Pemandu Klasifikasi (Wizard)**: Panduan langkah demi langkah menentukan nomor DDC yang tepat (Subjek & Judul &rarr; Disiplin Ilmu &rarr; Topik Spesifik &rarr; Bentuk Karya &rarr; Wilayah Geografis &rarr; Hasil Notasi & Penalaran).
3. **DDC Tree Explorer**: Penjelajah pohon hierarki kelas DDC lengkap (000–900) dengan fitur pencarian cepat.
4. **Riwayat Klasifikasi**: Log keputusan klasifikasi untuk menjaga konsistensi dan standarisasi bahan pustaka.
5. **Studi Kasus**: Latihan dan contoh penerapan klasifikasi nyata beserta analisisnya.
6. **Tentang Kami (About)**: Informasi visi pengembangan, profil dosen pembimbing, dan tim pencipta dari Universitas Negeri Malang.

---

## Menjalankan Aplikasi

1. Pasang dependensi:
   ```bash
   npm install
   ```

2. Jalankan development server:
   ```bash
   npm run dev
   ```
   Aplikasi dapat diakses di `http://localhost:5173`.

3. Build untuk produksi:
   ```bash
   npm run build
   ```
