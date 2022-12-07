import React from "react";
import { Outlet } from "react-router-dom";
// import AuthNavbar from "../components/Navbars/AuthNavbar";
// import FooterSmall from "../components/Footers/FooterSmall";
// views

import Login from "../views/auth/Login";
import Register from "../views/auth/Register";

export default function Auth() {
  return (
    <>
      {/* <AuthNavbar transparent /> */}
      <main>
        <section className="">
          {/* <div
            className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
            style={{
              backgroundImage: "url(" + backgroundImage + ")",
            }}
          ></div> */}
          <Outlet />
          {/* <FooterSmall absolute /> */}
        </section>
      </main>
    </>
  );
}
