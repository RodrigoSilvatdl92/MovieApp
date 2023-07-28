import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { selectCurrentUser } from "../store/authReducer";
import { useSelector } from "react-redux";
import { logOut } from "../store/authReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();

  const handlerLogOut = () => {
    dispatch(logOut());
    navigate("/");
  };

  const [displayAccount, setDisplayAccount] = useState(false);
  useEffect(() => {
    if (currentUser === null) {
      setDisplayAccount(false);
    } else {
      setDisplayAccount(true);
    }
  }, [currentUser]);

  return (
    <div className="absolute w-full">
      <div className="max-w-screen-xl m-auto mt-4 px-4 flex justify-between items-center z-[100] relative">
        <div>
          <Link to="/">
            <h1 className="text-red-600 text-xl md:text-4xl font-bold ">
              MovieApp
            </h1>
          </Link>
        </div>
        <div className="flex justify-between items-center">
          {/* f the user is null, the displayAccount will be true and this will show the Account .. if there is a user, the displayAccount will be false and this will show the Sign In */}
          {displayAccount === true ? (
            <Link to="/account">
              <button className="text-white mr-4 font-bold">Account</button>
            </Link>
          ) : (
            <Link to="/signin">
              <button className="text-white mr-4 font-bold">Sign In</button>
            </Link>
          )}
          {/* if we are logged in, the signUp button disappears and a LogOut appears in its place */}
          {displayAccount === true ? (
            <button
              className="bg-red-600 px-4 py-2 rounded p-1 text-white"
              onClick={handlerLogOut}
            >
              Log Out
            </button>
          ) : (
            <Link to="/signup">
              <button className="bg-red-600 px-6 py-2 rounded p-1 text-white">
                Sign Up
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
