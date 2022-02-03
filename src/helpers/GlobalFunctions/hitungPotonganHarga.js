const hitungPotonganHarga = (diskon, hargaTujuan) => {
  return ((diskon / 100) * hargaTujuan).toLocaleString("id", {
    style: "currency",
    currency: "IDR",
  });
};

export default hitungPotonganHarga;
