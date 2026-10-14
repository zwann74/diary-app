
# Diary App — Praktikum Pertemuan 3

* [X] **Nama:** Zakwan Abdurrahman
  **NIM:** 2430511043
  **Kelas:** 4C - Teknik Informatika, Universitas Muhammadiyah Sukabumi

## Cara Menjalankan

1. `npm install`
2. `npx expo start`
3. Tekan `a` untuk membuka di Android Emulator, atau scan QR dengan Expo Go.

## Fitur yang Diselesaikan

- Design tokens terpusat (`src/styles/tokens.js`) untuk warna, spacing, radius, tipografi, breakpoint
- DiaryCard reusable dengan Pressable, accessibilityLabel, dan mode list/grid
- DiaryDetailModal untuk menampilkan detail entri (hero image, isi, tombol Tutup)
- Layout responsif: 1 kolom di ponsel, 2 kolom saat lebar layar ≥ 600px
- Data diary (5 entri) lengkap dengan preview dan body

## Penjelasan Breakpoint

* [ ] Diary App menggunakan hook `useWindowDimensions` untuk membaca lebar layar (`width`) secara realtime. Nilai ini dibandingkan dengan `BREAKPOINTS.tablet` (600px) yang disimpan di `tokens.js`. Ketika `width < 600`, variabel `twoCols` bernilai `false` sehingga `FlatList` menampilkan 1 kolom (`numColumns={1}`). Ketika `width >= 600`, `twoCols` menjadi `true` dan `FlatList` berpindah ke 2 kolom (`numColumns={2}`). Agar perpindahan ini tidak membuat layout berantakan, prop `key={keyForCols}` dipasang pada `FlatList` sehingga React akan me-remount komponen setiap kali jumlah kolom berubah, bukan sekadar mengubah style di tempat.
