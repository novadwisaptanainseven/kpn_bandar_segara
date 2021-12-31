import React, { createContext, useReducer } from "react";
import initState from "./initStates/initState";
import reducer from "./reducers/reducer";

export const GlobalContext = createContext({});

export const GlobalProvider = ({ children }) => {
  // Login
  const [loginState, loginDispatch] = useReducer(reducer, initState);

  return (
    <GlobalContext.Provider
      value={{
        loginState,
        loginDispatch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
