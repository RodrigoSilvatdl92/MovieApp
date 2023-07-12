import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Account from "./pages/Account";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import { PrivateRouteAccount } from "./components/PrivateRoutes";
import MovieDetails from "./pages/MovieDetails";

import { Routes, Route } from "react-router-dom";
import React from "react";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<PrivateRouteAccount />}>
          <Route path="/account" element={<Account />} />
        </Route>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/movie/:movieid" element={<MovieDetails />} />
      </Routes>
    </div>
  );
}

export default App;
