import React, { useContext, Suspense, useEffect, lazy, useState } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import routes from "../routes";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Main from "../containers/Main";
import ThemedSuspense from "../components/ThemedSuspense";
import { SidebarContext } from "../context/SidebarContext";
import { useHistory } from "react-router-dom";

import swal2 from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { checkSession } from "../context/actions/Auth";
import { GlobalContext } from "../context/Provider";
import { getKonten } from "../context/actions/Konten";

const Swal = withReactContent(swal2);

const Page404 = lazy(() => import("../pages/404"));

function Layout() {
  const history = useHistory();
  const [isLogin, setIsLogin] = useState(false);
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
  let location = useLocation();
  const { profileUserDispatch, kontenState, kontenDispatch } =
    useContext(GlobalContext);

  useEffect(() => {
    closeSidebar();
  }, [location]);

  // Cek Session / apakah sudah login ?
  useEffect(() => {
    checkSession(history, Swal, setIsLogin, profileUserDispatch);
  }, [history, Swal, profileUserDispatch]);

  // Get data konten
  useEffect(() => {
    getKonten(kontenDispatch);
  }, [kontenDispatch]);

  return (
    <>
      {isLogin && (
        <div
          className={`flex h-screen bg-gray-50 dark:bg-gray-900 ${
            isSidebarOpen && "overflow-hidden"
          }`}
        >
          <Sidebar />

          <div className="flex flex-col flex-1 w-full">
            <Header />
            {/* Cek jika sudah login, maka tampilkan render main */}
            <Main>
              <Suspense fallback={<ThemedSuspense />}>
                <Switch>
                  {routes.map((route, i) => {
                    return route.component ? (
                      <Route
                        key={i}
                        exact={true}
                        path={`/simantra${route.path}`}
                        render={(props) => <route.component {...props} />}
                      />
                    ) : null;
                  })}
                  <Redirect exact from="/simantra" to="/simantra/login" />
                  <Route component={Page404} />
                </Switch>
              </Suspense>
            </Main>
          </div>
        </div>
      )}
    </>
  );
}

export default Layout;
