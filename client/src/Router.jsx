import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Register from "./components/auth/Register";

const Router = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<div>Login</div>} />
        <Route path="/todolist" element={<div>To do list</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
