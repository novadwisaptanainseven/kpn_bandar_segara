const initState = (data) => {
  return {
    id_pelanggan: data ? data.id_pelanggan : "",
    id_spt: data ? data.id_spt : "",
    no_spt: data ? data.no_spt : "",
    nm_pelanggan: data ? data.nm_pelanggan : "",
    id_marine: data ? data.id_marine : "",
    id_tujuan: data ? data.id_tujuan : "",
    id_driver: data ? data.id_driver : "",
    keterangan: data ? data.keterangan : "",
    tgl_keberangkatan: data ? data.tgl_keberangkatan : "",
    waktu_keberangkatan: data ? data.waktu_keberangkatan : "",
    diskon: data ? data.diskon : "",
    harga: data ? data.harga : "",
  };
};

export default initState;
