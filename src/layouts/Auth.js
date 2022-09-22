import React from "react";
import { Routes, Route } from "react-router-dom";
// components

import AuthNavbar from "../components/Navbars/AuthNavbar";
import FooterSmall from "../components/Footers/FooterSmall";

// views

import Login from "../views/auth/Login";
import Register from "../views/auth/Register";

export default function Auth() {
  return (
    <>
      <AuthNavbar transparent />
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
          <div
            className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
            style={{
              backgroundImage:
                "url(" +
                require("../assets/img/register_bg_2.png").default +
                ")",
            }}
          ></div>
          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Routes>
          <FooterSmall absolute />
        </section>
      </main>
    </>
  );
}
