import { lazy } from "react";

// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Pelanggan = lazy(() => import("../pages/DataMaster/Pelanggan"));
const TambahPelanggan = lazy(() =>
  import("../pages/DataMaster/Pelanggan/Tambah")
);
const EditPelanggan = lazy(() => import("../pages/DataMaster/Pelanggan/Edit"));
const DetailPelanggan = lazy(() =>
  import("../pages/DataMaster/Pelanggan/Detail")
);
const Perusahaan = lazy(() => import("../pages/DataMaster/Perusahaan"));
const TambahPerusahaan = lazy(() =>
  import("../pages/DataMaster/Perusahaan/Tambah")
);
const EditPerusahaan = lazy(() =>
  import("../pages/DataMaster/Perusahaan/Edit")
);
const DetailPerusahaan = lazy(() =>
  import("../pages/DataMaster/Perusahaan/Detail")
);
const Tujuan = lazy(() => import("../pages/DataMaster/Tujuan"));
const TambahTujuan = lazy(() => import("../pages/DataMaster/Tujuan/Tambah"));
const EditTujuan = lazy(() => import("../pages/DataMaster/Tujuan/Edit"));
const DetailTujuan = lazy(() => import("../pages/DataMaster/Tujuan/Detail"));
const Marine = lazy(() => import("../pages/DataMaster/Marine"));
const TambahMarine = lazy(() => import("../pages/DataMaster/Marine/Tambah"));
const EditMarine = lazy(() => import("../pages/DataMaster/Marine/Edit"));
const DetailMarine = lazy(() => import("../pages/DataMaster/Marine/Detail"));
const Driver = lazy(() => import("../pages/DataMaster/Driver"));
const TambahDriver = lazy(() => import("../pages/DataMaster/Driver/Tambah"));
const EditDriver = lazy(() => import("../pages/DataMaster/Driver/Edit"));
const DetailDriver = lazy(() => import("../pages/DataMaster/Driver/Detail"));

// Transaksi
const Transaksi = lazy(() => import("../pages/Transaksi"));

// SPT
const SPT = lazy(() => import("../pages/SPT"));
const TambahSPT = lazy(() => import("../pages/SPT/Tambah"));
const DetailSPT = lazy(() => import("../pages/SPT/Detail"));
const EditSPT = lazy(() => import("../pages/SPT/Edit"));
const CetakSPT = lazy(() => import("../pages/SPT/Cetak"));
const PreviewCetakSpt = lazy(() =>
  import("../pages/SPT/Cetak/PreviewCetakSpt")
);

// Nota
const BuatNota = lazy(() => import("../pages/Nota/BuatNota"));
const Nota = lazy(() => import("../pages/Nota"));
const DetailNota = lazy(() => import("../pages/Nota/Detail"));
const EditNota = lazy(() => import("../pages/Nota/Edit"));
const CetakNota = lazy(() => import("../pages/Nota/Cetak"));
const PreviewCetakNota = lazy(() =>
  import("../pages/Nota/Cetak/PreviewCetakNota")
);

// Riwayat Cetak Nota
const RiwayatNota = lazy(() => import("../pages/RiwayatNota"));
const DetailRiwayatNota = lazy(() => import("../pages/RiwayatNota/Detail"));
const CetakRiwayatNota = lazy(() => import("../pages/RiwayatNota/Cetak"));

// Users
const Users = lazy(() => import("../pages/Users"));
const TambahUsers = lazy(() => import("../pages/Users/Tambah"));
const EditUsers = lazy(() => import("../pages/Users/Edit"));
const DetailUsers = lazy(() => import("../pages/Users/Detail"));

// Pengaturan
const Pengaturan = lazy(() => import("../pages/Pengaturan"));
const Page404 = lazy(() => import("../pages/404"));
const Blank = lazy(() => import("../pages/Blank"));

// Galeri
const Galeri = lazy(() => import("../pages/Galeri"));
const DetailGaleri = lazy(() => import("../pages/Galeri/Detail"));

// Pelayanan
const Pelayanan = lazy(() => import("../pages/Pelayanan"));
const TambahPelayanan = lazy(() => import("../pages/Pelayanan/Tambah"));
const EditPelayanan = lazy(() => import("../pages/Pelayanan/Edit"));
const DetailPelayanan = lazy(() => import("../pages/Pelayanan/Detail"));

// Kontak
const Kontak = lazy(() => import("../pages/Kontak"));
const TambahKontak = lazy(() => import("../pages/Kontak/Tambah"));
const EditKontak = lazy(() => import("../pages/Kontak/Edit"));
const DetailKontak = lazy(() => import("../pages/Kontak/Detail"));

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
  {
    path: "/pelanggan/detail/:id",
    component: DetailPelanggan,
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
  {
    path: "/perusahaan/detail/:id",
    component: DetailPerusahaan,
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
  {
    path: "/tujuan/detail/:id",
    component: DetailTujuan,
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
    path: "/marine/detail/:id",
    component: DetailMarine,
  },
  // Route Driver
  {
    path: "/driver",
    component: Driver,
  },
  {
    path: "/driver/tambah",
    component: TambahDriver,
  },
  {
    path: "/driver/edit/:id",
    component: EditDriver,
  },
  {
    path: "/driver/detail/:id",
    component: DetailDriver,
  },

  // Route Transaksi
  {
    path: "/transaksi",
    component: Transaksi,
  },

  // Route SPT
  {
    path: "/spt",
    component: SPT,
  },
  {
    path: "/spt/buat",
    component: TambahSPT,
  },
  {
    path: "/spt/detail/:id",
    component: DetailSPT,
  },
  {
    path: "/spt/edit/:id",
    component: EditSPT,
  },
  {
    path: "/spt/cetak/:id",
    component: CetakSPT,
  },
  {
    path: "/spt/:id/buat-nota",
    component: BuatNota,
  },
  {
    path: "/spt/preview-cetak",
    component: PreviewCetakSpt,
  },

  // Route Nota
  {
    path: "/nota",
    component: Nota,
  },
  {
    path: "/nota/detail/:id",
    component: DetailNota,
  },
  {
    path: "/nota/edit/:id",
    component: EditNota,
  },
  {
    path: "/nota/transaksi",
    component: BuatNota,
  },
  {
    path: "/nota/cetak/:id",
    component: CetakNota,
  },
  {
    path: "/nota/preview-cetak",
    component: PreviewCetakNota,
  },

  // Route Riwayat Cetak Nota
  {
    path: "/riwayat-nota",
    component: RiwayatNota,
  },
  {
    path: "/riwayat-nota/detail/:id",
    component: DetailRiwayatNota,
  },
  {
    path: "/riwayat-nota/cetak/:id",
    component: CetakRiwayatNota,
  },

  // Route Users
  {
    path: "/users",
    component: Users,
  },
  {
    path: "/users/tambah",
    component: TambahUsers,
  },
  {
    path: "/users/edit/:id",
    component: EditUsers,
  },
  {
    path: "/users/detail/:id",
    component: DetailUsers,
  },

  // Route Pengaturan
  {
    path: "/pengaturan",
    component: Pengaturan,
  },
  {
    path: "/404",
    component: Page404,
  },
  {
    path: "/blank",
    component: Blank,
  },

  // Route Galeri
  {
    path: "/galeri",
    component: Galeri,
  },
  {
    path: "/galeri/detail/:id",
    component: DetailGaleri,
  },

  // Route Pelayanan
  {
    path: "/pelayanan",
    component: Pelayanan,
  },
  {
    path: "/pelayanan/tambah",
    component: TambahPelayanan,
  },
  {
    path: "/pelayanan/edit/:id",
    component: EditPelayanan,
  },
  {
    path: "/pelayanan/detail/:id",
    component: DetailPelayanan,
  },

  // Route Kontak
  {
    path: "/kontak",
    component: Kontak,
  },
  {
    path: "/kontak/tambah",
    component: TambahKontak,
  },
  {
    path: "/kontak/edit/:id",
    component: EditKontak,
  },
  {
    path: "/kontak/detail/:id",
    component: DetailKontak,
  },
];

export default routes;
