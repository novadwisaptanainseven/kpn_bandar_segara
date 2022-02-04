/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const routes = [
  {
    path: "/app/dashboard", // the url
    icon: "HomeIcon", // the component being exported from icons/index.js
    name: "Dashboard", // name that appear in Sidebar
  },
  {
    icon: "MenuIcon",
    name: "Data Master",
    routes: [
      // submenu
      {
        path: "/app/perusahaan",
        name: "Perusahaan",
      },
      {
        path: "/app/pelanggan",
        name: "Pelanggan",
      },
      {
        path: "/app/tujuan",
        name: "Tujuan",
      },
      {
        path: "/app/marine",
        name: "Marine",
      },
      {
        path: "/app/driver",
        name: "Driver",
      },
    ],
  },
  {
    path: "/app/nota",
    icon: "MoneyIcon",
    name: "Nota Transaksi",
  },
  {
    path: "/app/spt",
    icon: "MailIcon",
    name: "SPT",
  },
  // {
  //   path: "/app/riwayat-nota",
  //   icon: "MoneyIcon",
  //   name: "Riwayat Cetak Nota",
  // },
  {
    path: "/app/users",
    icon: "PeopleIcon",
    name: "Data Users",
  },
  {
    icon: "OutlineCogIcon",
    name: "Pengaturan Konten",
    routes: [
      // submenu
      {
        path: "/app/pengaturan",
        name: "Informasi Umum",
      },
      {
        path: "/app/galeri",
        name: "Foto Galeri",
      },
      {
        path: "/app/pelayanan",
        name: "Pelayanan",
      },
      {
        path: "/app/kontak",
        name: "Kontak",
      },
    ],
  },
];

export default routes;
