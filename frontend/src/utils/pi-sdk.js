// src/utils/pi-sdk.js

// Pastikan ini hanya dijalankan di browser
if (typeof window !== "undefined" && window.Pi) {
  window.Pi.init({
    version: "2.0",
    sandbox: true, // ubah ke false jika sudah production
  });
}
