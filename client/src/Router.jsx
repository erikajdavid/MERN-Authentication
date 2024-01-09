import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import AuthContext from "./components/context/AuthContext";

const Router = () => {

  const { loggedIn } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" />
        { loggedIn === false && (
          <>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} /> 
          </>
        )}
        { loggedIn === true && <Route path="/todolist" element={<div>To do list</div>} />}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
