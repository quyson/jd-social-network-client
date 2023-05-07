import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./login";
import Signup from "./signup";
import Logout from "./logout";
import Check from "./check";

const Router = () => {
  return (
    <BrowserRouter>
      <Logout />
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/check" element={<Check />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
