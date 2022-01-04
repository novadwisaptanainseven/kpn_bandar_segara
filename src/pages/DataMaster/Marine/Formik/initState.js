const initState = (data) => {
  return {
    id_marine: data ? data.id_marine : "",
    nm_marine: data ? data.nm_marine : "",
  };
};

export default initState;
