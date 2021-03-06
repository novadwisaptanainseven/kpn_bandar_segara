import React, { createContext, useReducer } from "react";
import initState from "./initStates/initState";
import reducer from "./reducers/reducer";

export const GlobalContext = createContext({});

export const GlobalProvider = ({ children }) => {
  // Login
  const [loginState, loginDispatch] = useReducer(reducer, initState);
  // Data Profile User
  const [profileUserState, profileUserDispatch] = useReducer(
    reducer,
    initState
  );
  // Dashboard State
  const [dashboardState, dashboardDispatch] = useReducer(reducer, initState);
  // Pelanggan State
  const [pelangganState, pelangganDispatch] = useReducer(reducer, initState);
  // Perusahaan State
  const [perusahaanState, perusahaanDispatch] = useReducer(reducer, initState);
  // Tujuan State
  const [tujuanState, tujuanDispatch] = useReducer(reducer, initState);
  // Marine State
  const [marineState, marineDispatch] = useReducer(reducer, initState);
  // Driver State
  const [driverState, driverDispatch] = useReducer(reducer, initState);
  // SPT State
  const [sptState, sptDispatch] = useReducer(reducer, initState);
  // Nota State
  const [notaState, notaDispatch] = useReducer(reducer, initState);
  // Pengguna State
  const [penggunaState, penggunaDispatch] = useReducer(reducer, initState);
  // Konten State
  const [kontenState, kontenDispatch] = useReducer(reducer, initState);
  // Data Cetak Nota State
  const [cetakNotaState, cetakNotaDispatch] = useReducer(reducer, initState);
  // Data List Cetak Nota
  const [listCetakNotaState, listCetakNotaDispatch] = useReducer(
    reducer,
    initState
  );
  // Data Cetak SPT State
  const [cetakSptState, cetakSptDispatch] = useReducer(reducer, initState);

  // Galeri
  const [galeriState, galeriDispatch] = useReducer(reducer, initState);

  // Riwayat Nota
  const [riwayatNotaState, riwayatNotaDispatch] = useReducer(reducer, initState);

  // Pelayanan
  const [pelayananState, pelayananDispatch] = useReducer(reducer, initState);

  // Kontak
  const [kontakState, kontakDispatch] = useReducer(reducer, initState);

  const dataGlobal = {
    loginState,
    loginDispatch,
    profileUserState,
    profileUserDispatch,
    dashboardState,
    dashboardDispatch,
    pelangganState,
    pelangganDispatch,
    perusahaanState,
    perusahaanDispatch,
    tujuanState,
    tujuanDispatch,
    marineState,
    marineDispatch,
    driverState,
    driverDispatch,
    sptState,
    sptDispatch,
    notaState,
    notaDispatch,
    penggunaState,
    penggunaDispatch,
    kontenState,
    kontenDispatch,
    cetakNotaState,
    cetakNotaDispatch,
    cetakSptState,
    cetakSptDispatch,
    listCetakNotaState,
    listCetakNotaDispatch,
    galeriState,
    galeriDispatch,
    riwayatNotaState,
    riwayatNotaDispatch,
    pelayananState,
    pelayananDispatch,
    kontakState,
    kontakDispatch,
  };

  return (
    <GlobalContext.Provider value={dataGlobal}>
      {children}
    </GlobalContext.Provider>
  );
};
