const initState = (buatNota) => {
  return {
    id_nota: "",
    id_spt: "",
    harga: buatNota ? buatNota.data_spt.harga : 0,
    diskon: 0,
    bayar: 0,
    tgl_nota: "",
    id_status_nota: 2,
  };
};

export default initState;
