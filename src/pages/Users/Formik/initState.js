const initState = (data = "") => {
  return {
    id_user: data ? data.id_user : "",
    nama: data ? data.nama : "",
    username: data ? data.username : "",
    password: "",
    foto: undefined,
  };
};

export default initState;
