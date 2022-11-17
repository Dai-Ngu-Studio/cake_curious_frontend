import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FormRow from "../../components/Inputs/FormRow";
import FormRowArea from "../../components/Inputs/FormRowArea";
import FormRowFile from "../../components/Inputs/FormRowFile";
import {
  handleAccountChange,
  updateAccount,
} from "../../features/accounts/accountSlice";
import { getImage } from "../../features/images/imageSlice";
import { addStore, handleStoreChange } from "../../features/stores/storeSlice";
import {
  getUser,
  handleUserChange,
  updateUserRole,
} from "../../features/users/userSlice";
import { auth } from "../../utils/firebase";
import { removeCaptchaFromLocalStorage } from "../../utils/localStorage";

export default function Register() {
  const { phoneNumber, OTP, user, isUserRoleDoneUpdating } = useSelector(
    (store) => store.user
  );
  const {
    fullName,
    gender,
    dateOfBirth,
    address,
    citizenshipNumber,
    citizenshipDate,
  } = useSelector((store) => store.account);
  const { name, description, photoUrl, storeAddress } = useSelector(
    (selector) => selector.store
  );
  const { image } = useSelector((store) => store.image);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isVerifying, setIsVerifying] = useState(false);

  const handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleUserChange({ name, value }));
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
    dispatch(getImage({ tmpImage: file }));
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (phoneNumber.length < 12) {
      toast.warning("Required phone number to be 12 digits");
      return;
    }
    if (
      !fullName ||
      !gender ||
      !dateOfBirth ||
      !address ||
      !citizenshipNumber ||
      !citizenshipDate ||
      !name ||
      !storeAddress
    ) {
      toast.warning("Please fill out all fields");
      return;
    }

    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
      },
      auth
    );
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setIsVerifying(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const ValidateOtp = () => {
    if (OTP.length === 6) {
      let confirmationResult = window.confirmationResult;
      confirmationResult
        .confirm(OTP)
        .then((result) => {
          // User signed in successfully.
          dispatch(
            addStore({
              name,
              description,
              photoUrl: image || null,
              address: storeAddress,
            })
          );
          dispatch(
            updateAccount({
              userId: user.id,
              user: {
                id: user.id,
                fullName,
                gender,
                dateOfBirth,
                address,
                citizenshipNumber,
                citizenshipDate,
              },
            })
          );
          dispatch(updateUserRole());
          // ...
        })
        .catch((error) => {
          // User couldn't sign in (bad verification code?)
          // ...
          console.log(error);
        });
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              {/* <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    Sign up with
                  </h6>
                </div>
                <div className="btn-wrapper text-center">
                  <button
                    className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center text-xs ease-linear transition-all duration-150"
                    type="button"
                  >
                    <img
                      alt="..."
                      className="w-5 mr-1"
                      src={require("../../assets/img/github.svg").default}
                    />
                    Github
                  </button>
                  <button
                    className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center text-xs ease-linear transition-all duration-150"
                    type="button"
                  >
                    <img
                      alt="..."
                      className="w-5 mr-1"
                      src={require("../../assets/img/google.svg").default}
                    />
                    Google
                  </button>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div> */}
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-blueGray-400 text-center mb-3 font-bold">
                  <small>User Information</small>
                </div>
                <form>
                  <div className="relative w-full mb-3">
                    <FormRow
                      type="text"
                      labelText="Full Name"
                      name="fullName"
                      value={fullName}
                      style="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      handleChange={handleUserInput}
                    />
                    <FormRow
                      type="text"
                      labelText="Gender"
                      name="gender"
                      value={gender}
                      style="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      handleChange={handleUserInput}
                    />
                    <FormRow
                      type="date"
                      labelText="Date Of Birth"
                      name="dateOfBirth"
                      value={dateOfBirth}
                      style="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      handleChange={handleUserInput}
                    />
                    <FormRow
                      type="text"
                      labelText="Address"
                      name="address"
                      value={address}
                      style="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      handleChange={handleUserInput}
                    />
                    <FormRow
                      type="text"
                      labelText="Citizenship Number"
                      name="citizenshipNumber"
                      value={citizenshipNumber}
                      style="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      handleChange={handleUserInput}
                    />
                    <FormRow
                      type="date"
                      labelText="Citizenship Date"
                      name="citizenshipDate"
                      value={citizenshipDate}
                      style="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      handleChange={handleUserInput}
                    />
                    <FormRow
                      type="text"
                      labelText="Phone"
                      name="phoneNumber"
                      value={phoneNumber}
                      style="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Phone Number"
                      handleChange={handleUserInput}
                    />
                  </div>
                  <div className="flex justify-center items-center h-10">
                    <hr className="w-10" />
                    <div className="text-gray-400">STORE INFO</div>
                    <hr className="w-10" />
                  </div>
                  <div className="relative w-full mb-3">
                    <FormRowFile
                      type="file"
                      name="photoUrl"
                      keyword="product-detail"
                      value={photoUrl}
                      handleChange={handleFileUpload}
                    />
                    <FormRow
                      type="text"
                      labelText="Store Name"
                      name="name"
                      value={name}
                      style="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      handleChange={handleUserInput}
                    />
                    <FormRow
                      type="text"
                      labelText="Store Address"
                      name="storeAddress"
                      value={storeAddress}
                      style="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      handleChange={handleUserInput}
                    />
                    <FormRowArea
                      type="text"
                      labelText="Description"
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
                      Save
                    </button>
                  </div>
                </form>
                <div id="recaptcha-container"></div>
                {isVerifying && (
                  <>
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Verification code
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
                        Verify OTP
                      </button>
                    </div>
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
