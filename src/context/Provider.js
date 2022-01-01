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

  const dataGlobal = {
    loginState,
    loginDispatch,
    profileUserState,
    profileUserDispatch,
    dashboardState,
    dashboardDispatch,
    pelangganState,
    pelangganDispatch,
  };

  return (
    <GlobalContext.Provider value={dataGlobal}>
      {children}
    </GlobalContext.Provider>
  );
};
