import { lazy } from "react";

// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Pelanggan = lazy(() => import("../pages/DataMaster/Pelanggan"));
const TambahPelanggan = lazy(() =>
  import("../pages/DataMaster/Pelanggan/Tambah")
);
const EditPelanggan = lazy(() => import("../pages/DataMaster/Pelanggan/Edit"));
const Perusahaan = lazy(() => import("../pages/DataMaster/Perusahaan"));
const TambahPerusahaan = lazy(() =>
  import("../pages/DataMaster/Perusahaan/Tambah")
);
const EditPerusahaan = lazy(() =>
  import("../pages/DataMaster/Perusahaan/Edit")
);
const Tujuan = lazy(() => import("../pages/DataMaster/Tujuan"));
const TambahTujuan = lazy(() => import("../pages/DataMaster/Tujuan/Tambah"));
const EditTujuan = lazy(() => import("../pages/DataMaster/Tujuan/Edit"));
const Marine = lazy(() => import("../pages/DataMaster/Marine"));
const TambahMarine = lazy(() => import("../pages/DataMaster/Marine/Tambah"));
const EditMarine = lazy(() => import("../pages/DataMaster/Marine/Edit"));
const Driver = lazy(() => import("../pages/DataMaster/Driver"));
const Charts = lazy(() => import("../pages/Charts"));
const Buttons = lazy(() => import("../pages/Buttons"));
const Modals = lazy(() => import("../pages/Modals"));
const Tables = lazy(() => import("../pages/Tables"));
const Page404 = lazy(() => import("../pages/404"));
const Blank = lazy(() => import("../pages/Blank"));

/**
 * ⚠ These are internal routes!
 * They will be rendered inside the app, using the default `containers/Layout`.
 * If you want to add a route to, let's say, a landing page, you should add
 * it to the `App`'s router, exactly like `Login`, `CreateAccount` and other pages
 * are routed.
 *
 * If you're looking for the links rendered in the SidebarContent, go to
 * `routes/sidebar.js`
 */
const routes = [
  {
    path: "/dashboard", // the url
    component: Dashboard, // view rendered
  },
  // Route Pelanggan
  {
    path: "/pelanggan",
    component: Pelanggan,
  },
  {
    path: "/pelanggan/tambah",
    component: TambahPelanggan,
  },
  {
    path: "/pelanggan/edit/:id",
    component: EditPelanggan,
  },
  // Route Perusahaan
  {
    path: "/perusahaan",
    component: Perusahaan,
  },
  {
    path: "/perusahaan/tambah",
    component: TambahPerusahaan,
  },
  {
    path: "/perusahaan/edit/:id",
    component: EditPerusahaan,
  },
  // Route Tujuan
  {
    path: "/tujuan",
    component: Tujuan,
  },
  {
    path: "/tujuan/tambah",
    component: TambahTujuan,
  },
  {
    path: "/tujuan/edit/:id",
    component: EditTujuan,
  },

  // Route Marine
  {
    path: "/marine",
    component: Marine,
  },
  {
    path: "/marine/tambah",
    component: TambahMarine,
  },
  {
    path: "/marine/edit/:id",
    component: EditMarine,
  },
  {
    path: "/driver",
    component: Driver,
  },
  {
    path: "/tables",
    component: Tables,
  },
  {
    path: "/404",
    component: Page404,
  },
  {
    path: "/blank",
    component: Blank,
  },
];

export default routes;
