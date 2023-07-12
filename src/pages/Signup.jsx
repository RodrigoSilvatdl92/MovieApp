import fundo from "../data/fundo.jpg";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

import { useFormik } from "formik";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { basicSchema } from "../schemas/schemaSignUp";

import { signUp } from "../store/authReducer";

function Signup() {
  {
    /* icons para mostrar pw's*/
  }
  const [passwordIconVisible, setPasswordIconVisible] = useState(false);
  const [confirmedPasswordIconVisible, setConfirmedPasswordIconVisible] =
    useState(false);

  const onToggle = () => {
    {
      setPasswordIconVisible((lastState) => !lastState);
    }
  };

  const onToggle2 = () => {
    {
      setConfirmedPasswordIconVisible((lastState) => !lastState);
    }
  };

  {
    /* onSubmit no Form */
  }
  const onSubmit = async (values, actions) => {
    console.log(actions);
    const { email, password, confirmedPassword } = formik.values;

    if (confirmedPassword === password) {
      try {
        await signUp(email, password);
        actions.resetForm();
      } catch (error) {
        console.log(error.message);
      }
    }
  };
  {
    /*  form Formik */
  }
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmedPassword: "",
    },
    validationSchema: basicSchema,
    onSubmit,
  });
  console.log(formik);
  console.log(formik.errors);

  return (
    <>
      <div className="absolute w-full h-screen">
        <img
          className=" hidden sm:block absolute object-cover w-full h-full"
          src={fundo}
          alt="/"
        />

        {/* linha 15: filtro preto no ecran todo, l16 div para ocupar o ecran todo, l17 div preta para ter o form a meio do ecran e com marg-top de 40px, a partir criar uma div para ter o form dentro com margim automatica para alinhar os inputs por essa div */}
        <div className="absolute top-0 left-0 bg-black/40 w-full h-screen"></div>
        <div className="absolute w-full h-full">
          <div className="max-w-[450px] h-[650px] bg-black/70 mx-auto mt-40">
            <div className="max-w-[320px] mx-auto py-16">
              <h1 className="text-3xl text-white font-bold">Sign Up</h1>
              <form
                onSubmit={formik.handleSubmit}
                className="w-full flex flex-col py-4"
              >
                {/* input do email */}
                <input
                  id="email"
                  className={
                    formik.errors.email && formik.touched.email
                      ? "p-3 my-2 bg-gray-700 rounded text-white border-2 border-red-600"
                      : "p-3 my-2 bg-gray-700 rounded text-white"
                  }
                  type="text"
                  placeholder="Enter a valid email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.email && formik.touched.email && (
                  <p className="text-xs text-red-600">
                    {formik.errors.email.charAt(0).toUpperCase() +
                      formik.errors.email.slice(1)}
                  </p>
                )}
                {/* input Password */}
                <div className="w-full relative">
                  <input
                    id="password"
                    className={
                      formik.errors.password && formik.touched.password
                        ? "p-3 my-2 bg-gray-700 rounded text-white border-2 border-red-600 w-full"
                        : "p-3 my-2 bg-gray-700 rounded text-white w-full"
                    }
                    type={passwordIconVisible ? "text" : "password"}
                    placeholder="Password..."
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.password && formik.touched.password && (
                    <p className="text-xs text-red-600">
                      {formik.errors.password.charAt(0).toUpperCase() +
                        formik.errors.password.slice(1)}
                    </p>
                  )}

                  {passwordIconVisible ? (
                    <AiFillEyeInvisible
                      className="text-white absolute z-10 top-6 right-2 cursor-pointer"
                      onClick={onToggle}
                    />
                  ) : (
                    <AiFillEye
                      className="text-white absolute z-10 top-6 right-2 cursor-pointer"
                      onClick={onToggle}
                    />
                  )}
                </div>
                {/* input ConfirmedPassword */}
                <div className="w-full relative">
                  <input
                    id="confirmedPassword"
                    className={
                      formik.errors.confirmedPassword &&
                      formik.touched.confirmedPassword
                        ? "p-3 my-2 bg-gray-700 rounded text-white border-2 border-red-600 w-full"
                        : "p-3 my-2 bg-gray-700 rounded text-white w-full"
                    }
                    type={confirmedPasswordIconVisible ? "text" : "password"}
                    placeholder="Confirm Password..."
                    value={formik.values.confirmedPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.confirmedPassword &&
                    formik.touched.confirmedPassword && (
                      <p className="text-xs text-red-600">
                        {formik.errors.confirmedPassword
                          .charAt(0)
                          .toUpperCase() +
                          formik.errors.confirmedPassword.slice(1)}
                      </p>
                    )}
                  {confirmedPasswordIconVisible ? (
                    <AiFillEyeInvisible
                      className="text-white absolute z-10 top-6 right-2 cursor-pointer"
                      onClick={onToggle2}
                    />
                  ) : (
                    <AiFillEye
                      className="text-white absolute z-10 top-6 right-2 cursor-pointer"
                      onClick={onToggle2}
                    />
                  )}
                </div>
                <button
                  disabled={formik.isSubmitting}
                  className={
                    formik.isSubmitting
                      ? "text-white bg-red-600 rounded p-2 mt-4 font-bold opacity-25 "
                      : "text-white bg-red-600 rounded p-2 mt-4 font-bold"
                  }
                >
                  Sign Up
                </button>
                <p className="mt-4 text-gray-400">
                  Already Signed up?
                  <Link to="/signin" className="ml-2 text-white font-bold">
                    Sign In
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
