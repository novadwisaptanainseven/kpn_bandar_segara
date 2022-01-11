const initState = (buatNota) => {
  return {
    id_nota: buatNota ? buatNota.data_nota.id_nota : "",
    id_spt: buatNota ? buatNota.data_nota.id_spt : "",
    harga: buatNota ? buatNota.data_nota.harga : 0,
    diskon: buatNota ? buatNota.data_nota.diskon : 0,
    bayar: buatNota ? buatNota.data_nota.bayar : 0,
    tgl_nota: buatNota ? buatNota.data_nota.tgl_nota : "",
    id_status_nota: buatNota ? buatNota.data_nota.id_status_nota : "",
  };
};

export default initState;
