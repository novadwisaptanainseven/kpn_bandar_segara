const initState = (data) => {
  return {
    title_website: data ? data.title_website : "",
    deskripsi_aplikasi: data ? data.deskripsi_aplikasi : "",
    // no_hp: data ? data.no_hp : "",
    // instagram: data ? data.instagram : "",
    alamat: data ? data.alamat : "",
    logo: "",
    nm_perusahaan: data ? data.nm_perusahaan : "",
    tentang_kami: data ? data.tentang_kami : "",
    link_map: data ? data.link_map : "",
  };
};

export default initState;
