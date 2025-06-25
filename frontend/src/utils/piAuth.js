export async function authenticate() {
  if (!window.Pi) {
    alert("Harap buka aplikasi ini di dalam Pi Browser.");
    return null;
  }

  try {
    const scopes = ['username', 'payments'];
    const authResult = await window.Pi.authenticate(scopes, onIncompletePaymentFound);

    console.log("User:", authResult.user);
    console.log("Access Token:", authResult.accessToken);

    return authResult;
  } catch (error) {
    console.error("Autentikasi gagal:", error);
    return null;
  }
}

function onIncompletePaymentFound(payment) {
  console.log("Pembayaran belum selesai ditemukan:", payment);
}
