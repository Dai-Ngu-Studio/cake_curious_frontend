import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import GoogleImage from "../../assets/img/google.svg";
import bg from "../../assets/img/login_bg.jpg";
import {
  getUser,
  handleUserChange,
  loginGoogle,
  loginUser,
} from "../../features/users/userSlice";

export default function Login() {
  const { token, email, password, isUserLoading, user } = useSelector(
    (store) => store.user
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleUserChange({ name, value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.warning("Please fill out all fields");
      return;
    }
    dispatch(loginUser({ email: email, password: password }));
  };
  const handleGoogleSignIn = (e) => {
    e.preventDefault();
    dispatch(loginGoogle());
  };

  useEffect(() => {
    if (token) {
      dispatch(getUser());
    }
  }, [token]);
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
        navigate("/admin/admin-dashboard");
      } else if (priorityRole === 1) {
        navigate("/staff/staff-dashboard");
      } else if (priorityRole === 2) {
        navigate("/store/store-dashboard");
      } else if (priorityRole === 3) {
        navigate("/auth/register");
      }
    }
  }, [user]);
  return (
    <div
      className="flex-row md:grid grid-cols-5 bg-no-repeat bg-cover text-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="col-span-3 min-h-screen hidden md:inline-block	"></div>
      <div className="col-span-2 grid place-items-center  bg-white">
        <div className="w-2/3">
          <div>
            <div className="text-2xl font-bold">Đăng nhập vào Kênh quản lý</div>
            <div className="text-gray-600 pt-2 text">
              Please sign in to your account
            </div>
          </div>
          <div className="grid place-items-start pt-10">
            <div className="w-full bg-gradient-to-t from-black/25 via-transparent rounded-full h-12 p-px">
              <input
                name="email"
                type="email"
                className="w-full h-full border-none rounded-full"
                value={email}
                onChange={handleUserInput}
                placeholder="E-mail Address"
              />
            </div>
          </div>
          <div className="grid place-items-start mt-5">
            <div className="w-full bg-gradient-to-t from-black/25 via-transparent rounded-full h-12 p-px">
              <input
                name="password"
                type="password"
                className="w-full h-full border-none rounded-full"
                value={password}
                onChange={handleUserInput}
                placeholder="Password"
              />
            </div>
          </div>
          <button
            className="text-lg w-full pt-4 pb-4 mt-10 text-gray-900 bg-gradient-to-r from-amber-400 to-amber-600 hover:bg-gradient-to-bl hover:shadow-xl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-full px-5 py-2.5 text-center mr-2 mb-2"
            onClick={handleSubmit}
          >
            {isUserLoading ? (
              <>
                <svg
                  role="status"
                  className="inline w-4 h-4 mr-3 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
                Đang xử lý...
              </>
            ) : (
              "Đăng nhập"
            )}
          </button>
          <br />

          <div className="flex justify-center items-center h-10">
            <hr className="w-10" />
            <div className="text-gray-400">OR</div>
            <hr className="w-10" />
          </div>
          <div className="mt-3 mb-5">
            Hông thích Email và password ?
            {/* <Link to="/register" className="text-blue-600">
              Register now.
            </Link>{" "} */}
          </div>
          <div
            className="flex justify-center items-center cursor-pointer px-12 py-3 mt-5 font-semibold text-gray-900 bg-white border-2 border-gray-500 rounded-full shadow outline-none hover:bg-blue-50 hover:border-blue-400 hover:shadow-lg focus:outline-none"
            onClick={handleGoogleSignIn}
          >
            <img src={GoogleImage} />
            <p className="pl-5">Đăng nhập bằng Google</p>
          </div>
        </div>
      </div>
    </div>
  );
  // return (
  //   <>
  //     <div className="container mx-auto px-4 h-full">
  //       <div className="flex content-center items-center justify-center h-full">
  //         <div className="w-full lg:w-4/12 px-4">
  //           <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
  //             <div className="rounded-t mb-0 px-6 py-6">
  //               <div className="text-center mb-3">
  //                 <h6 className="text-blueGray-500 text-sm font-bold">
  //                   Sign in with
  //                 </h6>
  //               </div>
  //               <div className="btn-wrapper text-center">
  //                 <button
  //                   className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center text-xs ease-linear transition-all duration-150"
  //                   type="submit"
  //                   onClick={handleGoogleSignIn}
  //                 >
  //                   <img alt="..." className="w-5 mr-1" src={GoogleImage} />
  //                   Google
  //                 </button>
  //               </div>
  //               <hr className="mt-6 border-b-1 border-blueGray-300" />
  //             </div>
  //             <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
  //               <div className="text-blueGray-400 text-center mb-3 font-bold">
  //                 <small>Or sign in with credentials</small>
  //               </div>
  //               <form>
  //                 <div className="relative w-full mb-3">
  //                   <label
  //                     className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
  //                     htmlFor="grid-password"
  //                   >
  //                     Email
  //                   </label>
  //                   <input
  //                     name="email"
  //                     value={email}
  //                     onChange={handleUserInput}
  //                     type="email"
  //                     className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
  //                     placeholder="Email"
  //                   />
  //                 </div>

  //                 <div className="relative w-full mb-3">
  //                   <label
  //                     className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
  //                     htmlFor="grid-password"
  //                   >
  //                     Password
  //                   </label>
  //                   <input
  //                     type="password"
  //                     name="password"
  //                     value={password}
  //                     onChange={handleUserInput}
  //                     className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
  //                     placeholder="Password"
  //                   />
  //                 </div>

  //                 <div className="text-center mt-6">
  //                   <button
  //                     className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
  //                     type="submit"
  //                     onClick={handleSubmit}
  //                   >
  //                     {isUserLoading ? (
  //                       <>
  //                         <svg
  //                           role="status"
  //                           className="inline w-4 h-4 mr-3 text-white animate-spin"
  //                           viewBox="0 0 100 101"
  //                           fill="none"
  //                           xmlns="http://www.w3.org/2000/svg"
  //                         >
  //                           <path
  //                             d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
  //                             fill="#E5E7EB"
  //                           />
  //                           <path
  //                             d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
  //                             fill="currentColor"
  //                           />
  //                         </svg>
  //                         Loading...
  //                       </>
  //                     ) : (
  //                       " Sign In"
  //                     )}
  //                   </button>
  //                 </div>
  //               </form>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </>
  // );
}
