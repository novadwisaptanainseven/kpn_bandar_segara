const initState = (data) => {
  return {
    id_pelayanan: data ? data.id_pelayanan : "",
    nm_pelayanan: data ? data.nm_pelayanan : "",
    icon: "",
  };
};

export default initState;
