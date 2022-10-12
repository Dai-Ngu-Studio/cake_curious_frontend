import React, { useEffect, useState } from "react";
import { createPopper } from "@popperjs/core";
import ProfileImage from "../../assets/img/team-1-800x800.jpg";
import { useDispatch, useSelector } from "react-redux";
import { clearStore } from "../../features/users/userSlice";
import { Link } from "react-router-dom";

const UserDropdown = () => {
  // dropdown props
  // const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  // const btnDropdownRef = React.createRef();
  // const popoverDropdownRef = React.createRef();
  // const openDropdownPopover = () => {
  //   createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
  //     placement: "bottom-start",
  //   });
  //   setDropdownPopoverShow(true);
  // };
  // const closeDropdownPopover = () => {
  //   setDropdownPopoverShow(false);
  // };
  const [toggleDropDown, setToggleDropDown] = useState(false);
  const dispatch = useDispatch();
  const [routing, setRouting] = useState("");
  const { user } = useSelector((store) => store.user);

  useEffect(() => {
    if (user) {
      let priorityRole = 99;
      for (let i = 0; i < user.hasRoles.length; i++) {
        var roleId = user.hasRoles[i].roleId;
        if (roleId < priorityRole) {
          priorityRole = roleId;
        }
      }
      if (priorityRole === 0) {
        setRouting("/admin/profile");
      } else if (priorityRole === 1) {
        setRouting("/staff/profile");
      } else if (priorityRole === 2) {
        setRouting("/store/profile");
      }
    }
  }, []);

  return (
    <>
      <button
        className="text-blueGray-500 block"
        type="button"
        onClick={(e) => {
          e.preventDefault();
          !toggleDropDown ? setToggleDropDown(true) : setToggleDropDown(false);
        }}
      >
        <div className="items-center flex">
          <span className="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
            <img
              alt="..."
              className="w-full rounded-full align-middle border-none shadow-lg"
              src={user.photoUrl || ProfileImage}
            />
          </span>
        </div>
      </button>
      <div
        className={
          (toggleDropDown ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        <Link
          to={routing}
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={() => setToggleDropDown(false)}
        >
          Profile
        </Link>
        {/* <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={(e) => e.preventDefault()}
        >
          Another action
        </a>
        <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={(e) => e.preventDefault()}
        >
          Something else here
        </a> */}
        <div className="h-0 my-2 border border-solid border-blueGray-100" />
        <button
          type="button"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={() => dispatch(clearStore("Logging out..."))}
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default UserDropdown;
