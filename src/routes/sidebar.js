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
        path: "/app/pelanggan",
        name: "Pelanggan",
      },
      {
        path: "/app/perusahaan",
        name: "Perusahaan",
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
    path: "/app/cards",
    icon: "MailIcon",
    name: "SPT",
  },
  {
    path: "/app/buttons",
    icon: "MoneyIcon",
    name: "Nota Transaksi",
  },
  {
    path: "/app/modals",
    icon: "PeopleIcon",
    name: "Data Users",
  },
  {
    path: "/app/tables",
    icon: "OutlineCogIcon",
    name: "Pengaturan",
  },
];

export default routes;
