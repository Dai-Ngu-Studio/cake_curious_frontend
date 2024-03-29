import React, { useEffect, useState } from "react";

import Footer from "../components/Footers/Footer";
import userTemp from "../assets/img/user.png";

import { useDispatch, useSelector } from "react-redux";
import { auth } from "../utils/firebase";
import {
  linkWithCredential,
  onAuthStateChanged,
  PhoneAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  unlink,
} from "firebase/auth";
import { toast } from "react-toastify";
import {
  getAccountForUpdating,
  handleAccountChange,
  updateAccount,
} from "../features/accounts/accountSlice";
import Loading from "../utils/Loading";
import { clearImageValues, getImage } from "../features/images/imageSlice";
import moment from "moment";
import {
  addUserToLocalStorage,
  removeCaptchaFromLocalStorage,
} from "../utils/localStorage";

export default function Profile() {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const {
    displayName,
    fullName,
    photoUrl,
    gender,
    profilePhoneNumber,
    address,
    citizenshipDate,
    citizenshipNumber,
    dateOfBirth,
    account,
    OTP,
    isAccountLoading,
    isAccountDoneUpdating,
  } = useSelector((store) => store.account);
  const { image, isDoneGettingImage } = useSelector((store) => store.image);

  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationId, setVerificationId] = useState(null);
  const [chosenImage, setChosenImage] = useState("");
  const [verifier, setVerifier] = useState("");
  const [provider, setProvider] = useState("");
  const [firebaseUser, setFirebaseUser] = useState({});

  onAuthStateChanged(auth, (user) => {
    if (user) {
      if (typeof user.providerData[1] !== "undefined") {
        setProvider(user.providerData[1].providerId);
        setFirebaseUser(user);
      }
    }
  });
  useEffect(() => {
    dispatch(getAccountForUpdating({ userId: user?.id }));
  }, []);
  useEffect(() => {
    if (isAccountDoneUpdating) {
      dispatch(clearImageValues());
      addUserToLocalStorage(account);
      dispatch(
        handleAccountChange({ name: "isAccountDoneUpdating", value: false })
      );
    }
  }, [isAccountDoneUpdating]);

  const handleFieldSubmit = (e) => {
    e.preventDefault();
    dispatch(getImage({ tmpImage: chosenImage }));
  };
  useEffect(() => {
    if (isDoneGettingImage) {
      dispatch(
        updateAccount({
          userId: user?.id,
          user: {
            displayName,
            photoUrl: image || null,
            fullName,
            gender,
            dateOfBirth: moment(dateOfBirth).toISOString(),
            address,
            citizenshipNumber,
            citizenshipDate: moment(citizenshipDate).toISOString(),
          },
        })
      );
    }
  }, [isDoneGettingImage]);

  // Gọi hàm này để gửi mã OTP
  const SendOtp = async (e) => {
    e.preventDefault();
    if (profilePhoneNumber.length !== 11) {
      // bên firebase cần sđt phải có mã quốc gia (+84)
      // nên lúc update sđt mới thì nhớ nhập cả +84 vô
      toast.warning("Yêu cầu số điện thoại là 11 chữ số");
      return;
    }
    try {
      const appVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
        },
        auth
      );
      setVerifier(appVerifier);
      try {
        const result = await signInWithPhoneNumber(
          auth,
          profilePhoneNumber,
          appVerifier
        );
        setVerificationId(result.verificationId);
        setIsVerifying(true);
      } catch (error) {
        if (error.code === "auth/too-many-requests") {
          toast.warning(
            "Bạn đã yêu cầu OTP quá nhiều lần. Xin hãy thử lại lần sau"
          );
        }
        removeCaptchaFromLocalStorage();
      }
    } catch (error) {
      console.log(error);
      if (error.code === "auth/no-such-provider") {
        toast.warning(
          "Tài khoản này hiện tại không có liên kết với số điện thoại nào cả"
        );
      }
    }
  };

  // Sau khi mã OTP được gửi về
  const UnlinkPhoneAndValidateOtp = async (e) => {
    e.preventDefault();
    if (OTP.length === 6) {
      const phoneCredential = PhoneAuthProvider.credential(verificationId, OTP);
      // xác nhận sđt thành công
      if (phoneCredential.providerId === "phone") {
        const resp = await unlink(firebaseUser, provider);
        // unlink thành công
        if (typeof resp.providerData[1] === "undefined") {
          // link sđt mới
          try {
            const resp = await linkWithCredential(
              auth.currentUser,
              phoneCredential
            );
            setProvider(resp.providerId);
          } catch (error) {
            if (error.code === "auth/provider-already-linked") {
              toast.warning("Tài khoản bạn đăng nhập đã có số điện thoại");
            } else if (error.code === "auth/invalid-verification-code") {
              toast.warning("Mã OTP không hợp lệ");
            } else if (
              error.code === "auth/account-exists-with-different-credential"
            ) {
              toast.warning(
                "Số điện thoại này đang được dùng ở 1 cửa hàng khác. Vui lòng nhập số khác hoặc kiểm tra lại"
              );
            } else if (error.code === "auth/code-expired") {
              toast.warning("Mã OTP hết hạn");
            }
            removeCaptchaFromLocalStorage();
          }
        }
      }
    }
  };
  const handleUpdatePhone = (e) => {
    e.preventDefault();
    if (provider === "phone") {
      dispatch(
        updateAccount({
          userId: user?.id,
          user: {
            phoneNumber: profilePhoneNumber,
          },
        })
      );
    }
  };

  // gửi lại OTP
  const handleResendOTP = async (e) => {
    e.preventDefault();
    if (profilePhoneNumber.length !== 11) {
      toast.warning("Yêu cầu số điện thoại là 11 chữ số");
      return;
    }
    try {
      const result = await signInWithPhoneNumber(
        auth,
        profilePhoneNumber,
        verifier
      );
      setVerificationId(result.verificationId);
      setIsVerifying(true);
    } catch (error) {
      if (error.code === "auth/too-many-requests") {
        toast.error(
          "Bạn đã yêu cầu OTP quá nhiều lần. Xin hãy thử lại lần sau"
        );
      }
      removeCaptchaFromLocalStorage();
    }
  };

  if (isAccountLoading) {
    return <Loading />;
  }

  const handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleAccountChange({ name, value }));
  };
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const name = e.target.name;
    const value = await convertToBase64(file);
    dispatch(handleAccountChange({ name, value }));
    setChosenImage(file);
  };

  let priorityRole = 99;
  if (user) {
    for (let i = 0; i < user.hasRoles.length; i++) {
      var roleId = user.hasRoles[i].roleId;
      if (roleId < priorityRole) {
        priorityRole = roleId;
      }
    }
  }
  return (
    <>
      <main className="profile-page">
        <section className="relative block h-500-px">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </section>
        <section className="relative py-16 bg-blueGray-200">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative">
                      <img
                        alt="..."
                        src={photoUrl || userTemp}
                        className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                </div>
                <div id="recaptcha-container"></div>
                <div className="flex justify-center">
                  <div className=" p-5 mt-10">
                    <div className="flex items-center text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                      <div className="w-32 text-right mr-2">Tên đầy đủ</div>
                      <input
                        type="text"
                        value={fullName || ""}
                        name="fullName"
                        onChange={handleUserInput}
                      />
                    </div>
                    <div className="flex items-center text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                      <div className="w-32 text-right mr-2">Tên hiển thị</div>
                      <input
                        type="text"
                        value={displayName || ""}
                        name="displayName"
                        onChange={handleUserInput}
                      />
                    </div>
                    <div className="flex items-center text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                      <div className="w-32 text-right mr-2">Giới tính</div>
                      <input
                        type="text"
                        value={gender || ""}
                        name="gender"
                        onChange={handleUserInput}
                      />
                    </div>
                    <div className="flex items-center text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                      <div className="w-32 text-right mr-2">Ngày sinh</div>
                      <input
                        type="date"
                        value={dateOfBirth || ""}
                        name="dateOfBirth"
                        onChange={handleUserInput}
                      />
                    </div>
                    <div className="flex items-center text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                      <div className="w-32 text-right mr-2">Số điện thoại</div>
                      <input
                        type="text"
                        value={profilePhoneNumber || ""}
                        name="profilePhoneNumber"
                        onChange={handleUserInput}
                      />
                    </div>
                    <div className="flex items-center text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                      <div className="w-32 text-right mr-2">Địa chỉ</div>
                      <input
                        type="text"
                        value={address || ""}
                        name="address"
                        onChange={handleUserInput}
                      />
                    </div>
                    <div className="flex items-center text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                      <div className="w-32 text-right mr-2">
                        Ngày đăng ký CMND/CCCD
                      </div>
                      <input
                        type="date"
                        value={citizenshipDate || ""}
                        name="citizenshipDate"
                        onChange={handleUserInput}
                      />
                    </div>
                    <div className="flex items-center text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                      <div className="w-32 text-right mr-2">Số CMND/CCCD</div>
                      <input
                        type="text"
                        value={citizenshipNumber || ""}
                        name="citizenshipNumber"
                        onChange={handleUserInput}
                      />
                    </div>

                    <div className="mb-2 text-blueGray-600 mt-10">
                      <i className="fa-sharp fa-solid fa-user mr-2 text-lg text-blueGray-400"></i>
                      Chức danh -{" "}
                      {(() => {
                        if (priorityRole === 0) {
                          return "Quản trị viên";
                        } else if (priorityRole === 1) {
                          return "Nhân viên";
                        } else if (priorityRole === 2) {
                          return "Chủ cửa hàng";
                        }
                      })()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
