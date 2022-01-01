import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import ImageLight from "../assets/img/login-office.jpeg";
import ImageDark from "../assets/img/login-office-dark.jpeg";
import { Label, Input, Button, HelperText } from "@windmill/react-ui";
import { useHistory } from "react-router-dom";
import { GlobalContext } from "../context/Provider";
import { CLEAN_UP } from "../context/actionTypes";
import { checkToken, login } from "../context/actions/Auth";

import swal2 from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Swal = withReactContent(swal2);

function Login() {
  const history = useHistory();
  const { loginState, loginDispatch } = useContext(GlobalContext);
  const { loading, error } = loginState;
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    // Untuk menampilkan alert ketika user belum logout
    checkToken(history, Swal);

    return () => {
      loginDispatch({
        type: CLEAN_UP,
      });
    };
  }, [loginDispatch]);

  const handleFormSubmit = () => {
    // Lakukan proses login

    login(values, loginDispatch);
    console.log(values);
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src={ImageLight}
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src={ImageDark}
              alt="Office"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Bandar Segara
              </h1>

              {error.pesan && (
                <div className="mb-2 p-4 text-sm text-gray-100 bg-red-500 rounded-lg shadow-md">
                  {error.pesan}
                </div>
              )}

              {error.validation_errors && (
                <div className="mb-2 p-4 text-sm text-gray-100 bg-red-500 rounded-lg shadow-md">
                  <span className="block">{error.validation_errors.username}</span>
                  <span>{error.validation_errors.password}</span>
                </div>
              )}

              <Label>
                <span>Username</span>
                <Input
                  className="mt-1"
                  type="username"
                  name="username"
                  placeholder="Username"
                  value={values.username}
                  onChange={(e) => handleChange(e)}
                />
              </Label>

              <Label className="mt-4">
                <span>Password</span>
                <Input
                  className="mt-1"
                  type="password"
                  name="password"
                  placeholder="***************"
                  value={values.password}
                  onChange={(e) => handleChange(e)}
                />
              </Label>

              <Button
                className="mt-4"
                block
                onClick={handleFormSubmit}
                disabled={loading ? true : false}
              >
                {loading ? "Loading..." : "Masuk"}
              </Button>

              <hr className="my-8" />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Login;
