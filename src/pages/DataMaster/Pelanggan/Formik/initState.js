const initState = (data) => {
  return {
    nm_pelanggan: data ? data.nm_pelanggan : "",
    id_perusahaan: data ? data.id_perusahaan : "",
  };
};

export default initState;
