const initState = (data) => {
  return {
    nm_perusahaan: data ? data.nm_perusahaan : "",
    id_perusahaan: data ? data.id_perusahaan : "",
    almt_perusahaan: data ? data.almt_perusahaan : "",
  };
};

export default initState;
