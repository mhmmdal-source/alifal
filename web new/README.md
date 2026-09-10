# THE DARK KNIGHT — Personal Portfolio

Portfolio personal bertema Batman (Gotham City x Batcave x Futuristic) yang
cinematic, immersive, 3D, dan fully responsive. Murni HTML + CSS + JavaScript
tanpa framework — cepat dan ringan.

## Struktur Folder

```
portfolio-batman/
├── index.html          # Struktur halaman (semantic HTML5)
├── style.css           # Seluruh styling + animasi + responsive
├── script.js           # Seluruh interaksi (modular, data-driven)
├── README.md
└── assets/
    └── images/
        ├── profile.jpg      # Foto profil
        ├── background.jpg   # Background hero
        └── project-1..6.jpg # Thumbnail project
```

## Cara Menjalankan

1. Letakkan semua file sesuai struktur folder di atas.
2. Buka `index.html` langsung di browser (double-click), atau
3. Disarankan via local server agar semua fitur optimal:

```bash
# Python
cd portfolio-batman
python -m http.server 8000
# buka http://localhost:8000
```

## Cara Kustomisasi

### Mengganti Foto
Ganti file di `assets/images/` dengan nama yang sama (ukuran disarankan:
profil 600x600, project 900x620, background 1600x900).

### Mengganti Nama / Role / Bio
Cari dan ganti `YOUR NAME`, role, dan teks bio di dalam `index.html`
(bagian hero, about, footer).

### Mengganti Project
Edit array `PROJECTS` di bagian atas `script.js` — judul, deskripsi,
challenge, solution, result, tech, link demo & GitHub semuanya di sana.
Tambah/kurangi object untuk menambah/mengurangi project.

### Mengganti Social Media
Cari `yourusername` di `index.html` (ada di section Contact dan Footer)
ganti dengan username GitHub / LinkedIn / Instagram Anda.

### Mengatur Warna
Edit CSS variables di bagian `:root` pada `style.css`:

```css
--accent: #f0b428;   /* warna aksen utama (kuning Batman) */
--bg-primary: #07090c;
--text-primary: #eef1f5;
```

### Mengatur Efek 3D
- Intensitas tilt: ubah nilai `max` (default 10) di `init3DInteractions()` pada `script.js`.
- Parallax hero: ubah koefisien `6` dan `5` di fungsi yang sama.
- Matikan semua efek berat: aktifkan `prefers-reduced-motion` di OS/browser,
  website otomatis menyesuaikan.

## Fitur

- Loading screen cinematic, scroll progress bar, custom cursor (desktop)
- Particles canvas (pause saat tab tidak aktif), Gotham skyline SVG
- Bat-signal interaction, 3D tilt cards, magnetic buttons, scroll reveal
- Skill bars animated, counters, timeline, project modal (ESC / klik luar)
- Form validation dengan error & success state
- Responsive penuh + dukungan `prefers-reduced-motion`

## Aksesibilitas

Semantic HTML5, aria-label, keyboard navigation (modal bisa dibuka dengan
Enter/Space dan ditutup dengan ESC), visible focus, kontras memadai.
