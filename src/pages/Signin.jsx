import fundo from "../data/fundo.jpg";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { login, setError } from "../store/authReducer"; // função para fazer login
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../store/authReducer";
import { selectError } from "../store/authReducer";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

function Signin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);
  const hasError = useSelector(selectError);

  const [passwordIsVisible, setPasswordIsVisible] = useState(false);

  const tooglePassword = () => {
    setPasswordIsVisible((lastState) => !lastState);
  };

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();
    try {
      dispatch(login(user, password));
    } catch (error) {
      console.log(error.message);
      dispatch(setError("erro no Login"));
    }
  };

  useEffect(() => {
    {
      /* se tiveremos um user logado vai para a homePage */
    }
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser]);

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
              <h1 className="text-3xl text-white font-bold ">Sign In</h1>
              <form
                onSubmit={submitHandler}
                className="w-full flex flex-col py-4"
              >
                {/* Email  */}
                <input
                  onChange={(event) => {
                    {
                      /*limpar o erro( mensagem a vermelho) quando reintroduzimos dados nos inputs do login  */
                    }
                    dispatch(setError(""));
                    setUser(event.target.value);
                  }}
                  className="p-3 my-2 bg-gray-700 rounded text-white"
                  type="text"
                  placeholder="Email or Phone number.."
                />
                {/* Password  */}
                <div className="w-full relative">
                  <input
                    onChange={(event) => {
                      dispatch(setError(""));
                      setPassword(event.target.value);
                    }}
                    className="p-3 my-2 bg-gray-700 rounded text-white w-full"
                    type={passwordIsVisible ? "text" : "password"}
                    placeholder="Password..."
                  />
                  {passwordIsVisible ? (
                    <AiFillEyeInvisible
                      className="absolute text-white top-6 right-2 cursor-pointer"
                      onClick={tooglePassword}
                    />
                  ) : (
                    <AiFillEye
                      className="absolute text-white top-6 right-2 cursor-pointer"
                      onClick={tooglePassword}
                    />
                  )}
                  {/* se o os dados de login tiverem errados aparece esta mensagem abaixo */}
                  {hasError && (
                    <p className="text-red-500 text-xs">
                      Username and/or Password is wrong
                    </p>
                  )}
                </div>
                <button className="text-white bg-red-600 rounded p-2 mt-4 font-bold ">
                  Sign In
                </button>
                <p className="mt-4 text-gray-400">
                  New to MovieApp?
                  <Link to="/signup" className="ml-2 text-white font-bold">
                    Sign up now
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

export default Signin;
