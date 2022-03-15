const hitungTotalHarga = (nota) => {
  const totHarga = nota.data_spt.reduce(add, 0);
  function add(accumulator, a) {
    return accumulator + parseInt(a.harga);
  }

  return totHarga.toLocaleString("id", {
    style: "currency",
    currency: "IDR",
  });
};

export default hitungTotalHarga;
