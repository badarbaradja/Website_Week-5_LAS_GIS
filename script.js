// script.js

// 1. Inisialisasi Peta
// Ganti koordinat [-6.200000, 106.816666] dengan titik tengah daerahmu
// Angka 13 adalah level zoom
const map = L.map('map').setView([-6.200000, 106.816666], 13);

// 2. Tambahkan Basemap (Peta Dasar)
// Kita pakai OpenStreetMap yang gratis
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// 3. Tambahkan Data GeoJSON dari file
fetch('data/data_umkm.geojson')
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            onEachFeature: function (feature, layer) {
                // Ambil properti dari GeoJSON
                const nama = feature.properties.nama_umkm;
                const deskripsi = feature.properties.deskripsi;
                const foto = feature.properties.path_foto; // pastikan nama kolom ini sama

                // Buat konten popup dengan foto (ini untuk nilai plus!)
                const popupContent = `
                    <h3>${nama}</h3>
                    <p>${deskripsi}</p>
                    <img src="data/${foto}" alt="${nama}" width="200px">
                `;
                
                layer.bindPopup(popupContent);
            }
        }).addTo(map);
    })
    .catch(err => console.error('Gagal memuat data GeoJSON:', err));