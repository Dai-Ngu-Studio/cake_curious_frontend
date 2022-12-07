/*eslint-disable*/
import React from "react";
import { Link, NavLink } from "react-router-dom";

// import NotificationDropdown from "../Dropdowns/NotificationDropdown";
import UserDropdown from "../Dropdowns/UserDropdown";
import logoText from "../../assets/img/cake-curious-logo-text-line.png";
import userTemp from "../../assets/img/user-sidebar-temp.png";
import { useSelector } from "react-redux";
export default function Sidebar({ props }) {
  const { user } = useSelector((store) => store.user);
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  return (
    <div className="">
      <nav className="bg-emerald-600 rounded-r-3xl md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <i className="fas fa-bars"></i>
          </button>
          {/* Brand */}
          <Link
            className="font-bold text-white text-2xl text-center pt-5"
            to={props.dashboardLink}
          >
            <img src={logoText} className=""></img>
          </Link>
          {/* User */}
          <ul className="md:hidden items-center flex flex-wrap list-none">
            <li className="inline-block relative">
              {/* <NotificationDropdown /> */}
            </li>
            <li className="inline-block relative">
              <UserDropdown />
            </li>
          </ul>
          {/* Collapse */}
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link
                    className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                    to={props.dashboardLink}
                  >
                    Cake Curious
                  </Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="bg-slate-300 rounded-full w-32 h-32 overflow-hidden">
                <img
                  src={user?.photoUrl || userTemp}
                  referrerPolicy="no-referrer"
                  className="w-full"
                />
              </div>
            </div>
            <div className="text-center text-white font-bold py-10">
              Chào mừng trở lại, {user?.displayName}
            </div>
            <h6 className="md:min-w-full text-slate-300 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              {props.title}
            </h6>
            {/* Navigation */}

            <ul className="md:flex-col md:min-w-full flex flex-col">
              {props.links.map((item) => (
                <li className="items-center" key={item.name}>
                  <NavLink
                    className={({ isActive }) =>
                      "text-xs uppercase py-3 font-bold block hover:text-emerald-600 hover:bg-white pl-5 m-1 rounded-lg text-white " +
                      (isActive ? "bg-emerald-500" : "")
                    }
                    to={item.linkTo}
                  >
                    <i className={item.style}></i> {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
            {/* Divider */}
          </div>
        </div>
      </nav>
    </div>
  );
}
