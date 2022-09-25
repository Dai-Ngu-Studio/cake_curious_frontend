/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/img/cake_curious_logo.png";

// components

export default function LandingNavbar(props) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <nav className="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-1 bg-black/50">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          <Link
            className="flex flex-row text-white text-sm font-bold leading-relaxed mr-4 whitespace-nowrap uppercase"
            to="/"
          >
            <img src={logo} className="h-12" />
            <div className="flex h-12 pl-2 text-sm items-center">
              <div>
                <p className="">Dành cho</p>
                <p className="">cửa hàng</p>
              </div>
            </div>
          </Link>
          <button
            className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
            type="button"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <i className="text-white fas fa-bars"></i>
          </button>
        </div>
        <div
          className={
            "lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none" +
            (navbarOpen ? " block rounded shadow-lg" : " hidden")
          }
          id="example-navbar-warning"
        >
          <ul className="flex flex-col lg:flex-row list-none lg:ml-auto text-white font-bold leading-relaxed mr-4 whitespace-nowrap gap-10">
            <li className="flex items-center">Trang chủ</li>
            <li className="flex items-center">Giải pháp</li>
            <li className="flex items-center">Đăng ký</li>
            <li className="flex items-center border-2 px-3 py-2 m-1 rounded-lg border-green-500 bg-green-500">
              Đăng nhập
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
