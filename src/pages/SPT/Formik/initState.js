const initState = (data) => {
  return {
    id_pelanggan: data ? data.id_pelanggan : "",
    id_spt: data ? data.id_spt : "",
    id_marine: data ? data.id_marine : "",
    id_tujuan: data ? data.id_tujuan : "",
    id_driver: data ? data.id_driver : "",
    nm_kapal: data ? data.nm_kapal : "",
    tgl_spt: data ? data.tgl_spt : "",
  };
};

export default initState;
