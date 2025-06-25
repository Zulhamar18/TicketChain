export const createPayment = async (amount, memo = "Pembayaran Tiket", metadata = {}) => {
  try {
    const payment = await window.Pi.createPayment({
      amount: amount,
      memo: memo,
      metadata: metadata,
    });

    payment.onReadyForServerApproval(async (paymentId) => {
      console.log("Siap untuk server approval, Payment ID:", paymentId);
      // Kirim ke backend di sini jika diperlukan
    });

    payment.onReadyForServerCompletion((paymentId, txid) => {
      console.log("Transaksi berhasil. Payment ID:", paymentId, "TXID:", txid);
    });

    payment.onCancel(() => {
      console.warn("Pembayaran dibatalkan oleh pengguna.");
    });

    payment.onError((error) => {
      console.error("Terjadi kesalahan dalam pembayaran:", error);
    });
  } catch (error) {
    console.error("Gagal membuat pembayaran:", error);
  }
};
