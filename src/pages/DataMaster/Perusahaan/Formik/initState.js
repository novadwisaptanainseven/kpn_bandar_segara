const initState = (data) => {
  return {
    nm_perusahaan: data ? data.nm_perusahaan : "",
    id_perusahaan: data ? data.id_perusahaan : "",
    keterangan: data ? data.keterangan : "",
  };
};

export default initState;
