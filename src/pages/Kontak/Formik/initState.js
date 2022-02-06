const initState = (data) => {
  return {
    id_kontak: data ? data.id_kontak : "",
    nm_kontak: data ? data.nm_kontak : "",
    keterangan: data ? data.keterangan : "",
    link: data ? data.link : "",
    icon: "",
  };
};

export default initState;
