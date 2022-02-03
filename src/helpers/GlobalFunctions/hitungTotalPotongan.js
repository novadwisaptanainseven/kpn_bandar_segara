const hitungTotalPotongan = (nota) => {
  const totPotongan = nota.data_spt.reduce(add, 0);

  function add(accumulator, a) {
    const potonganHarga = (a.diskon / 100) * a.harga_tujuan;
    return accumulator + potonganHarga;
  }

  return totPotongan.toLocaleString("id", {
    style: "currency",
    currency: "IDR",
  });
};

export default hitungTotalPotongan;
