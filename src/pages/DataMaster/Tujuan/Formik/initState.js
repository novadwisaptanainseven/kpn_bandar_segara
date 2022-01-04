const initState = (data) => {
  return {
    id_tujuan: data ? data.id_tujuan : "",
    nm_tujuan: data ? data.nm_tujuan : "",
    harga: data ? data.harga : 0,
  };
};

export default initState;
