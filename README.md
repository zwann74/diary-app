# Diary App — Praktikum Pertemuan 3

- **Nama:** Zakwan Abdurrahman
- **NIM:** 2430511043
- **Kelas:** 4C - Teknik Informatika, Universitas Muhammadiyah Sukabumi

## Cara Menjalankan

1. `npm install`
2. `npx expo start`
3. Tekan `a` untuk membuka di Android Emulator, tekan `w` untuk membuka di browser, atau scan QR dengan Expo Go.

## Fitur yang Diselesaikan

- Design tokens terpusat (`src/styles/tokens.js`) untuk warna, spacing, radius, tipografi, dan breakpoint.
- `DiaryCard` reusable dengan `Pressable`, `accessibilityLabel`, dan tombol suka.
- `DiaryDetailModal` untuk menampilkan detail entri (gambar mood, isi, tombol Tutup).
- Layout responsif: 1 kolom di ponsel, 2 kolom saat lebar layar ≥ 600px.
- `SearchBar` untuk mencari entri berdasarkan judul, ringkasan, isi, atau tanggal.
- `EntryForm` untuk menambah entri baru (judul, tanggal, ringkasan).
- Data awal berisi 3 entri lengkap dengan ringkasan dan isi.
- Entri disimpan permanen dengan AsyncStorage, jadi tetap ada setelah aplikasi dimuat ulang.
- Hapus entri dengan konfirmasi di dalam modal detail.
- Edit entri langsung di modal detail, dengan validasi tanggal.
- Daftar diurutkan menurut tanggal, terbaru di atas.
- Status suka ikut tersimpan.

## Struktur Proyek

```
App.js
src/
  components/   DiaryCard, DiaryDetailModal, SearchBar, EntryForm
  data/         moods.js
  screens/      DiaryListScreen
  styles/       tokens.js
assets/moods/   gambar mood (JPG, maks 800px)
```

## Penjelasan Breakpoint

Diary App menggunakan hook `useWindowDimensions` untuk membaca lebar layar (`width`) secara realtime. Nilai ini dibandingkan dengan `BREAKPOINTS.tablet` (600px) yang disimpan di `tokens.js`.

- Ketika `width < 600`, variabel `twoCols` bernilai `false`, sehingga `FlatList` menampilkan 1 kolom (`numColumns={1}`).
- Ketika `width >= 600`, `twoCols` bernilai `true`, sehingga `FlatList` berpindah ke 2 kolom (`numColumns={2}`).

Prop `key={keyForCols}` dipasang pada `FlatList` karena React Native tidak mengizinkan `numColumns` berubah pada `FlatList` yang sudah tampil. Saat jumlah kolom berubah, `key` ikut berubah dan komponen dibuat ulang.

## Keterbatasan Saat Ini

- Data hanya tersimpan di perangkat atau browser itu, belum ada sinkronisasi atau cadangan.