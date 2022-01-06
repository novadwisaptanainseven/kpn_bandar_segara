const initState = (data) => {
  return {
    id_driver: data ? data.id_driver : "",
    nm_driver: data ? data.nm_driver : "",
  };
};

export default initState;
