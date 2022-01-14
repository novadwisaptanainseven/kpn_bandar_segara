const initState = (data) => {
  return {
    title_website: data ? data.title_website : "",
    deskripsi_aplikasi: data ? data.deskripsi_aplikasi : "",
    logo: "",
  };
};

export default initState;
