import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import GoogleImage from "../../assets/img/google.svg";
import bg from "../../assets/img/login_bg.jpg";
import {
  clearAllUsersState,
  getUser,
  handleUserChange,
  loginGoogle,
  loginUser,
} from "../../features/users/userSlice";
import { auth } from "../../utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  getReasonByEmail,
  handleReasonChange,
} from "../../features/reasons/reasonSlice";
import ReasonModal from "../../components/Cards/Report/ReasonModal";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

export default function Login() {
  const {
    token,
    email,
    password,
    isUserLoading,
    user,
    isDoneGettingUser,
    error,
  } = useSelector((store) => store.user);
  const { reason, isDoneLoadingReason } = useSelector((store) => store.reason);
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
    if (error === "auth/user-disabled") {
      dispatch(getReasonByEmail({ email: { email } }));
    }
  }, [error]);
  useEffect(() => {
    if (isDoneLoadingReason) {
      ShowModal();
      dispatch(
        handleReasonChange({
          name: "isDoneLoadingReason",
          value: false,
        })
      );
    }
  }, [isDoneLoadingReason]);

  async function ShowModal() {
    const MySwal = withReactContent(Swal);
    await MySwal.fire({
      title: "Thông tin chi tiết",
      html: <ReasonModal reason={reason} />,
      showConfirmButton: false,
      showCloseButton: true,
    });
  }

  useEffect(() => {
    if (token && !user) {
      dispatch(getUser());
    } else if (token && user) {
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
        dispatch(clearAllUsersState());
      }
    }
  }, [token]);
  useEffect(() => {
    if (isDoneGettingUser) {
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
              Đăng nhập vào tài khoản của bạn
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
                placeholder="E-mail"
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
                placeholder="Mật khẩu"
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
            <div className="text-gray-400">Hoặc</div>
            <hr className="w-10" />
          </div>
          <div className="mt-3 mb-5">
            Đăng nhập bằng tài khoản google
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
}
