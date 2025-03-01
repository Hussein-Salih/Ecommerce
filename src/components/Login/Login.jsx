import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { AuthContext } from "../../context/AuthContext/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { setToken } = useContext(AuthContext);

  let [errMsg, setErrMsg] = useState(null);
  let [successMsg, setSuccessMsg] = useState(null);
  let [loadingButton, setLoadingButton] = useState(false);

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .required("Your Email is Required")
      .email("Please enter a valid Email"),
    password: yup
      .string()
      .required("Your Password is Required")
      .matches(
        /^[A-z0-9_@%$!]{6,30}$/,
        "Password must consist of 6-30 characters"
      ),
  });

  async function login(values) {
    setErrMsg(null);
    setSuccessMsg(null);
    setLoadingButton(true);
    try {
      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );
      setSuccessMsg(res.data.message);
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);

      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (err) {
      setErrMsg(err.response.data.message);
    } finally {
      setLoadingButton(false);
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: login,
    validationSchema,
  });

  return (
    <div className="bg-white dark:bg-gray-800 py-10 min-h-[59.5vh]">
      <form
        onSubmit={formik.handleSubmit}
        className="max-w-sm mx-auto bg-gray-50 dark:bg-gray-700 p-8 box-content rounded-3xl"
      >
        <p className="text-center text-2xl font-medium mb-5 border-b-2 border-blue-400 pb-2 dark:text-gray-200">
          Enter your Account
        </p>
  
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-800 dark:text-gray-200"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="outline-green-400 transition-all shadow-xs bg-gray-50 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 text-gray-900 dark:text-gray-100 text-sm rounded-lg focus:ring-green-400 focus:border-green-400 block w-full p-2.5"
            placeholder="..."
            required
          />
  
          {formik.errors.email && formik.touched.email ? (
            <div
              className="flex items-center p-4 my-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-red-900 dark:text-red-200"
              role="alert"
            >
              <svg
                className="shrink-0 inline w-4 h-4 me-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
  
              <span className="sr-only">Info</span>
              <div>
                <span className="font-medium">Name Alert!</span>{" "}
                {formik.errors.email}
              </div>
            </div>
          ) : null}
        </div>
  
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-800 dark:text-gray-200"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="outline-green-400 transition-all shadow-xs bg-gray-50 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 text-gray-900 dark:text-gray-100 text-sm rounded-lg focus:ring-green-400 focus:border-green-400 block w-full p-2.5"
            placeholder="..."
            required
          />
  
          {formik.errors.password && formik.touched.password ? (
            <div
              className="flex items-center p-4 my-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-red-900 dark:text-red-200"
              role="alert"
            >
              <svg
                className="shrink-0 inline w-4 h-4 me-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
  
              <span className="sr-only">Info</span>
              <div>
                <span className="font-medium">Name Alert!</span>{" "}
                {formik.errors.password}
              </div>
            </div>
          ) : null}
        </div>
  
        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="text-white transition-all cursor-pointer bg-blue-400 hover:bg-blue-500 focus:ring-3 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            {loadingButton ? "Logging you in..." : "Log In"}
          </button>
          <Link to='/forgot' className="text-[0.8rem] hover:underline dark:text-gray-200">forgot your password?</Link>
  
          {errMsg ? (
            <p className="text-sm font-bold text-red-400 capitalize">
              {errMsg}
            </p>
          ) : null}
          {successMsg ? (
            <p className="text-sm font-bold text-green-400 capitalize">
              {successMsg}
            </p>
          ) : null}
        </div>
      </form>
    </div>
  );
}