import { scanFile } from "@openhealthnz-credentials/pdf-image-qr-scanner";
import {
  linkWithCredential,
  PhoneAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import moment from "moment/moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FormRow from "../../components/Inputs/FormRow";
import FormRowArea from "../../components/Inputs/FormRowArea";
import { handleAccountChange } from "../../features/accounts/accountSlice";
import { getImage } from "../../features/images/imageSlice";
import { handleStoreChange } from "../../features/stores/storeSlice";
import { getUser, handleUserChange, updateUserRole } from "../../features/users/userSlice";
import { auth } from "../../utils/firebase";
import { removeCaptchaFromLocalStorage } from "../../utils/localStorage";
import LeftSvg from "./LeftSvg";
import Swal from "sweetalert2";

export default function Register() {
  const { user, token, isUserRoleDoneUpdating } = useSelector((store) => store.user);

  const { phoneNumber, OTP } = useSelector((store) => store.account);
  const { name, description, photoUrl, storeAddress } = useSelector(
    (selector) => selector.store
  );
  const [step, setStep] = useState(1);

  const { image, isDoneGettingImage } = useSelector((store) => store.image);
  const [verifier, setVerifier] = useState("") 
  const [provider, setProvider] = useState("");
  const [chosenImage, setChosenImage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationId, setVerificationId] = useState(null);
  const [result, setResult] = useState({
    fullName: "",
    gender: "",
    dateOfBirth: "",
    address: "",
    citizenshipNumber: "",
    citizenshipDate: "",
  });
  const [error, setError] = useState("");

  const handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleAccountChange({ name, value }));
    dispatch(handleStoreChange({ name, value }));
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
    dispatch(handleStoreChange({ name, value }));
    setChosenImage(file);
  };

  useEffect(() => {
    // call this useEffect to set isDoneGettingUser state back to it default state
    dispatch(handleUserChange({name: "isDoneGettingUser", value: false}))
    // navigate back to login page if token is not found and user decide to forward to next page
    if (!token) {
      navigate("/auth/login");
    }
  }, []);
  useEffect(() => {
    if (isUserRoleDoneUpdating) {
      dispatch(getUser());
    }
  }, [isUserRoleDoneUpdating]);
  useEffect(() => {
    if (user) {
      let priorityRole = 99;
      for (let i = 0; i < user.hasRoles.length; i++) {
        var roleId = user.hasRoles[i].roleId;
        if (roleId < priorityRole) {
          priorityRole = roleId;
        }
      }

      if (priorityRole === 2) {
        removeCaptchaFromLocalStorage();
        navigate("/store/store-dashboard");
      }
    }
  }, [user]);
  useEffect(() => {}, [step]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (phoneNumber.length < 12) {
      toast.warning("Required phone number to be 12 digits");
      return;
    }
    if (
      !result.fullName ||
      !result.gender ||
      !result.dateOfBirth ||
      !result.address ||
      !result.citizenshipNumber ||
      !result.citizenshipDate ||
      !name ||
      !storeAddress
    ) {
      toast.warning("Please fill out all fields");
      return;
    }
    const appVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
      },
      auth
    );
    setVerifier(appVerifier)
    try {
      const result = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        appVerifier
      );
      setVerificationId(result.verificationId);
      setIsVerifying(true);   
    } catch (error) {
      if (error.code === "auth/too-many-requests") {
        toast.error("You requested too many time. Please try again later");
      }
      removeCaptchaFromLocalStorage();
    }
  };
  const ValidateOtp = async () => {
    if (OTP.length === 6) {
      const phoneCredential = PhoneAuthProvider.credential(verificationId, OTP);
      try {
        const resp = await linkWithCredential(
          auth.currentUser,
          phoneCredential
        );
        setProvider(resp.providerId)
        // if (resp.providerId === "phone") {
        //   dispatch(
        //     updateUserRole({
        //       request: {
        //         name,
        //         description,
        //         photoUrl: image || null,
        //         storeAddress,
        //         fullName: result.fullName,
        //         gender: result.gender,
        //         dateOfBirth: moment(result.dateOfBirth).toISOString(),
        //         address: result.address,
        //         citizenshipNumber: result.citizenshipNumber,
        //         citizenshipDate: moment(result.citizenshipDate).toISOString(),
        //         phoneNumber: resp.user.phoneNumber,
        //       },
        //     })
        //   );
        // }
      } catch (error) {
        if (error.code === "auth/provider-already-linked") {
          toast.error("Tài khoản bạn đăng nhập đã có sđt");
        } else if (error.code === "auth/invalid-verification-code") {
          toast.error("Mã OTP không hợp lệ");
        } else if (
          error.code === "auth/account-exists-with-different-credential"
        ) {
          toast.error(
            "Số điện thoại này đang được dùng ở 1 cửa hàng khác. Vui lòng nhập số khác hoặc kiểm tra lại"
          );
        } else if (error.code === "auth/code-expired") {
          toast.error("Mã OTP hết hạn");
        }
        removeCaptchaFromLocalStorage();
      }
    }
  };

  // dùng để gọi gửi lại OTP
  const handleResendOTP = async (e) => {
    e.preventDefault();
    if (phoneNumber.length < 12) {
      toast.warning("Required phone number to be 12 digits");
      return;
    }
    if (
      !result.fullName ||
      !result.gender ||
      !result.dateOfBirth ||
      !result.address ||
      !result.citizenshipNumber ||
      !result.citizenshipDate ||
      !name ||
      !storeAddress
    ) {
      toast.warning("Please fill out all fields");
      return;
    }
    try {
      const result = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        verifier
      );
      setVerificationId(result.verificationId);
      setIsVerifying(true);
    } catch (error) {
      if (error.code === "auth/too-many-requests") {
        toast.error("You requested too many time. Please try again later");
      }
      removeCaptchaFromLocalStorage();
    }
  };

  // tách ra gọi api ở chỗ này //
  const handleFieldSubmit = (e) => {
    if (provider === "phone") {
      dispatch(getImage({ tmpImage: chosenImage }));
    }
  }
  useEffect(() => {
    if (isDoneGettingImage) {
      dispatch(
        updateUserRole({
          request: {
            name,
            description,
            photoUrl: image || null,
            storeAddress,
            fullName: result.fullName,
            gender: result.gender,
            dateOfBirth: moment(result.dateOfBirth).toISOString(),
            address: result.address,
            citizenshipNumber: result.citizenshipNumber,
            citizenshipDate: moment(result.citizenshipDate).toISOString(),
          },
        })
      );
    }
  }, [isDoneGettingImage]);
  // ----------------------------------- //

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    processFile(file);
  };

  // đã xử lý trường hợp cccd mới chứa số cccd/cmnd cũ
  const processFile = async (file) => {
    setError("");
    try {
      const qrCode = await scanFile(file);
      // It returns null if no QR code is found
      if (qrCode === null) {
        setError(
          "Không thể xác minh QR code, vui lòng thử lại với ảnh rõ ràng"
        );
        return;
      }
      const length = qrCode.replaceAll("||", "|").split("|").length;
      console.log(length)
      if (length === 7) {
        const [
          citizenshipNumber,
          oldCitizenshipNumber,
          fullName,
          dateOfBirth,
          gender,
          address,
          citizenshipDate,
        ] = qrCode.replaceAll("||", "|").split("|");
        setResult((prevState) => ({
          fullName: fullName,
          gender: gender,
          dateOfBirth: moment(dateOfBirth, "DDMMYYYY").format("MM-DD-YYYY"),
          address: address,
          citizenshipNumber: citizenshipNumber,
          citizenshipDate: moment(citizenshipDate, "DDMMYYYY").format(
            "MM-DD-YYYY"
          ),
        }));
      } else if (length === 6) {
        const [
          citizenshipNumber,
          fullName,
          dateOfBirth,
          gender,
          address,
          citizenshipDate,
        ] = qrCode.replaceAll("||", "|").split("|");
        console.log(citizenshipNumber)
        setResult((prevState) => ({
          fullName: fullName,
          gender: gender,
          dateOfBirth: moment(dateOfBirth, "DDMMYYYY").format("MM-DD-YYYY"),
          address: address,
          citizenshipNumber: citizenshipNumber,
          citizenshipDate: moment(citizenshipDate, "DDMMYYYY").format(
            "MM-DD-YYYY"
          ),
        }));
      }
      Swal.fire(
        "Nhận thông tin CCCD thành công!",
        "Thông tin CCCD của bạn đã được nhập!",
        "success"
      );
      setStep(2);
    } catch (e) {
      console.log(e)
      if (e instanceof Event) {
        setError("Vui lòng thử lại với ảnh rõ ràng hơn");
      } else {
        setError("Lỗi xác nhận ảnh");
      }
    }
  };
  return (
    <>
      <div className="min-w-screen min-h-screen bg-gray-900 flex items-center justify-center px-5 py-5">
        <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-3/4 overflow-hidden">
          <div className="md:flex w-full">
            <div className="hidden md:flex items-center w-1/2 bg-emerald-500 py-10 px-10">
              <LeftSvg />
            </div>
            <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
              <div className="text-center mb-10">
                <h1 className="font-bold text-3xl text-gray-900">
                  ĐĂNG KÝ BÁN HÀNG
                </h1>
                <p>Vui lòng nhập thông tin để đăng ký</p>
              </div>
              <div>
                {step === 1 && (
                  <>
                    <label className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                      <span className="flex items-center space-x-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6 text-gray-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                        <span className="font-medium text-gray-600">
                          Chọn ảnh mặt trước CCCD có QR để xác nhận thông tin
                          <div className="text-red-500">{error}</div>
                        </span>
                      </span>
                      <input
                        type="file"
                        name="file_upload"
                        className="hidden"
                        onChange={handleFileInput}
                      />
                    </label>
                    <div className="relative w-full mb-3">
                      <div className="grid grid-cols-2 gap-5 py-2">
                        <FormRow
                          type="text"
                          labelText="Họ và tên"
                          name="fullName"
                          value={result.fullName}
                          style="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          // handleChange={handleUserInput}
                          disabled={true}
                        />
                        <FormRow
                          type="text"
                          labelText="Giới tính"
                          name="gender"
                          value={result.gender}
                          style="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          // handleChange={handleUserInput}
                          disabled={true}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-5 py-2">
                        <FormRow
                          type="text"
                          labelText="Ngày sinh"
                          name="dateOfBirth"
                          value={result.dateOfBirth}
                          style="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          // handleChange={handleUserInput}
                          disabled={true}
                        />
                        <FormRow
                          type="text"
                          labelText="Địa chỉ"
                          name="address"
                          value={result.address}
                          style="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          // handleChange={handleUserInput}
                          disabled={true}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-5 py-2">
                        <FormRow
                          type="text"
                          labelText="Số CCCD"
                          name="citizenshipNumber"
                          value={result.citizenshipNumber}
                          style="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          // handleChange={handleUserInput}
                          disabled={true}
                        />
                        <FormRow
                          type="text"
                          labelText="Ngày đăng ký CCCD"
                          name="citizenshipDate"
                          value={result.citizenshipDate}
                          style="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          // handleChange={handleUserInput}
                          disabled={true}
                        />
                      </div>
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <div className="flex justify-center items-center">
                      <hr className="w-10" />
                      <div className="text-gray-400">Thông tin cửa hàng</div>
                      <hr className="w-10" />
                    </div>
                    <div className="grid grid-cols-2 gap-5 py-2">
                      <FormRow
                        type="text"
                        labelText="Số điện thoại"
                        name="phoneNumber"
                        value={phoneNumber}
                        style="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Phone Number"
                        handleChange={handleUserInput}
                      />
                      <FormRow
                        type="text"
                        labelText="Tên cửa hàng"
                        name="name"
                        value={name}
                        style="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        handleChange={handleUserInput}
                      />
                    </div>
                    <div className="relative w-full mb-3">
                      <label className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                        {photoUrl ? (
                          <img src={photoUrl} className="" />
                        ) : (
                          <span className="flex items-center space-x-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-6 h-6 text-gray-600"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                              />
                            </svg>
                            <span className="font-medium text-gray-600">
                              Chọn ảnh cửa hàng
                            </span>
                          </span>
                        )}

                        <input
                          type="file"
                          name="photoUrl"
                          className="hidden"
                          onChange={handleFileUpload}
                        />
                      </label>
                      <FormRow
                        type="text"
                        labelText="Địa chỉ cửa hàng"
                        name="storeAddress"
                        value={storeAddress}
                        style="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        handleChange={handleUserInput}
                      />
                      <FormRowArea
                        type="text"
                        labelText="Mô tả cho cửa hàng"
                        name="description"
                        value={description}
                        style="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        handleChange={handleUserInput}
                      />
                    </div>

                    <div className="text-center mt-6">
                      <button
                        className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        type="button"
                        onClick={handleSubmit}
                      >
                        Xác minh
                      </button>
                    </div>
                    {/* tui tạo thêm nút gửi lại OTP */}
                    <div className="text-center mt-6">
                      <button
                        className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        type="button"
                        onClick={handleResendOTP}
                      >
                        Gửi lại OTP
                      </button>
                    </div>
                    {/* -------------------------- */}
                    {/* tạo thêm nút lưu để tách việc gọi xác minh sđt và gọi api */}
                    <div className="text-center mt-6">
                      <button
                        className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        type="button"
                        onClick={handleFieldSubmit}
                      >
                        Lưu
                      </button>
                    </div>
                    {/* -------------------------------------- */}
                    <div id="recaptcha-container"></div>

                    {isVerifying && (
                      <>
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Mã xác nhận OTP
                        </label>
                        <input
                          type="text"
                          name="OTP"
                          value={OTP}
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="OTP"
                          onChange={handleUserInput}
                        />
                        <div className="text-center mt-6">
                          <button
                            className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                            type="button"
                            onClick={ValidateOtp}
                          >
                            Xác nhận mã OTP này!
                          </button>
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
