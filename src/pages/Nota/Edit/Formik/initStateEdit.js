const initStateEdit = (data) => ({
  id_marine: data ? data.id_marine : "",
  id_driver: data ? data.id_driver : "",
  id_tujuan: data ? data.id_tujuan : "",
  tgl_keberangkatan: data ? data.tgl_keberangkatan : "",
  keterangan: data ? data.keterangan : "",
  waktu_keberangkatan: data ? data.waktu_keberangkatan : "",
  harga: data ? data.harga : 0,
  diskon: data ? data.diskon : 0,
  id_status_spt: data ? data.id_status_spt : "",
  harga_tujuan: data ? data.harga_tujuan : 0,
  bayar: data ? data.bayar : 0,
});

export default initStateEdit;
