import React, { useEffect, useState } from "react";
import ProfileImage from "../../assets/img/team-1-800x800.jpg";
import { useDispatch, useSelector } from "react-redux";
import { clearStore } from "../../features/users/userSlice";
import { Link } from "react-router-dom";
import { FaSignOutAlt, FaUser } from "react-icons/fa";
const UserDropdown = () => {
  const [isDropDownExpanded, setToggleDropDown] = useState(false);
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
        onClick={() => {
          setToggleDropDown(!isDropDownExpanded);
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
          (isDropDownExpanded ? "absolute " : "hidden ") +
          "right-14 top-16 z-10 w-fit mt-4 bg-white border border-gray-100 rounded-md shadow-slate-900/25 shadow-xl"
        }
      >
        <Link
          to={routing}
          className={
            "text-sm m-1 p-2  flex text-blueGray-700 justify-center items-center gap-2 hover:bg-sky-300 rounded-md"
          }
          // onClick={() => setToggleDropDown(false)}
        >
          <FaUser className="flex justify-center items-center" />
          <p>Profile</p>
        </Link>
        <div className="h-0 my-1 border border-solid border-blueGray-100" />
        <button
          type="button"
          className="text-sm m-1 p-2 text-blueGray-700 flex gap-2 justify-center items-center hover:bg-sky-300 rounded-md"
          onClick={() => dispatch(clearStore("Logging out..."))}
        >
          <FaSignOutAlt className="flex justify-center items-center" />
          Logout
        </button>
      </div>
    </>
  );
};

export default UserDropdown;
