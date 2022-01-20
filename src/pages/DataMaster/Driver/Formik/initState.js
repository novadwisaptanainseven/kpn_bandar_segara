const initState = (data) => {
  return {
    id_driver: data ? data.id_driver : "",
    nm_driver: data ? data.nm_driver : "",
    keterangan: data ? data.keterangan : "",
  };
};

export default initState;
