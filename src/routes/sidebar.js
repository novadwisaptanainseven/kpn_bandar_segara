/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const routes = [
  {
    path: "/simantra/dashboard", // the url
    icon: "HomeIcon", // the component being exported from icons/index.js
    name: "Dasbor", // name that appear in Sidebar
  },
  {
    icon: "MenuIcon",
    name: "Data Master",
    routes: [
      // submenu
      {
        path: "/simantra/perusahaan",
        name: "Perusahaan",
      },
      {
        path: "/simantra/pelanggan",
        name: "Pengguna",
      },
      {
        path: "/simantra/tujuan",
        name: "Tujuan",
      },
      {
        path: "/simantra/marine",
        name: "Marine",
      },
      {
        path: "/simantra/driver",
        name: "Driver",
      },
    ],
  },
  {
    path: "/simantra/nota",
    icon: "MoneyIcon",
    name: "Nota Transaksi",
  },
  {
    path: "/simantra/spt",
    icon: "MailIcon",
    name: "SPT",
  },
  {
    path: "/simantra/riwayat-nota",
    icon: "MoneyIcon",
    name: "Riwayat Cetak Nota",
  },
  {
    path: "/simantra/users",
    icon: "PeopleIcon",
    name: "Data Admin",
  },
  {
    icon: "OutlineCogIcon",
    name: "Pengaturan Konten",
    routes: [
      // submenu
      {
        path: "/simantra/pengaturan",
        name: "Informasi Umum",
      },
      {
        path: "/simantra/galeri",
        name: "Foto Galeri",
      },
      {
        path: "/simantra/pelayanan",
        name: "Pelayanan",
      },
      {
        path: "/simantra/kontak",
        name: "Kontak",
      },
    ],
  },
];

export default routes;
