import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Error = () => {
  const { user } = useSelector((store) => store.user);
  const [routing, setRouting] = useState("");

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
        setRouting("/admin/admin-dashboard");
      } else if (priorityRole === 1) {
        setRouting("/staff/staff-dashboard");
      } else if (priorityRole === 2) {
        setRouting("/store/store-dashboard");
      }
    } else {
      setRouting("/");
    }
  }, []);

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gray-100">
      <div className="px-40 py-20 bg-white rounded-md shadow-xl">
        <div className="flex flex-col items-center">
          <h1 className="font-bold text-blue-600 text-9xl">401</h1>

          <h6 className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
            <span className="text-red-500">Oops!</span> Missing permission
          </h6>

          <p className="mb-8 text-center text-gray-500 md:text-lg">
            You’re unauthorized to access the page.
          </p>

          <Link
            to={routing}
            className="px-6 py-2 text-sm font-semibold text-blue-800 bg-blue-100"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error;
