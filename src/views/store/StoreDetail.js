import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import FormRow from "../../components/Inputs/FormRow";
import FormRowArea from "../../components/Inputs/FormRowArea";
import FormRowFile from "../../components/Inputs/FormRowFile";
import { getImage } from "../../features/images/imageSlice";
import {
  getUserStore,
  handleStoreChange,
  updateStore,
} from "../../features/stores/storeSlice";
import Loading from "../../utils/Loading";

export default function StoreDetail() {
  const {
    user,
    name,
    description,
    editStoreId,
    photoUrl,
    storeAddress,
    rating,
    isStoreLoading,
  } = useSelector((selector) => selector.store);
  const { image, isDoneGettingImage } = useSelector((store) => store.image);
  const dispatch = useDispatch();
  const [choseImage, setChosenImage] = useState("")

  useEffect(() => {
    dispatch(getUserStore());
  }, []);

  useEffect(() => {
    if (isDoneGettingImage) {
      dispatch(
        updateStore({
          storeId: editStoreId,
          store: {
            id: editStoreId,
            address: storeAddress,
            name,
            description,
            photoUrl: image || null,
          },
        })
      );
    }
  }, [isDoneGettingImage])
  
  if (isStoreLoading) {
    return <Loading />;
  }

  const handleStoreDetailInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
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
  const handleStoreFileUpload = async (e) => {
    const file = e.target.files[0];
    const name = e.target.name;
    const value = await convertToBase64(file);
    dispatch(handleStoreChange({ name, value }));
    setChosenImage(file);
  };

  const handleStoreDetailSubmit = (e) => {
    e.preventDefault();
    if (!name || !storeAddress || !description) {
      toast.error("Please fill out all fields");
      return;
    }
    dispatch(getImage({ tmpImage: choseImage }));
  };

  return (
    <>
      <div className="relative bg-gray-100 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div className="flex items-center justify-center">
            <form className="bg-white shadow-xl p-7 rounded-lg w-1/2">
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
                      Chọn ảnh sản phẩm
                    </span>
                  </span>
                )}

                <input
                  type="file"
                  name="photoUrl"
                  className="hidden"
                  onChange={handleStoreFileUpload}
                />
              </label>
              <div className="py-4">
                <FormRow
                  type="text"
                  name="name"
                  labelText="Tên cửa hàng"
                  value={name}
                  style="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  handleChange={handleStoreDetailInput}
                />
              </div>
              <div>
                <label>Tên chủ cửa hàng: </label>
                <label className="text-gray-500">
                  {user?.fullName === null ? "Annoymous" : user.fullName}
                </label>
              </div>
              <div>
                <label>Email: </label>
                <label className="text-gray-500">{user?.email}</label>
              </div>
              <div className="py-4">
                <FormRowArea
                  name="description"
                  labelText="Mô tả"
                  value={description}
                  style="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  handleChange={handleStoreDetailInput}
                />
              </div>
              <div className="py-4">
                <FormRow
                  type="text"
                  name="storeAddress"
                  labelText="Địa chỉ"
                  value={storeAddress}
                  style="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  handleChange={handleStoreDetailInput}
                />
              </div>
              <div className="flex justify-between items-center pt-10">
                <div>
                  <label>Đánh giá: </label>
                  {rating} ⭐
                </div>
                <button
                  type="submit"
                  disabled={isStoreLoading}
                  onClick={handleStoreDetailSubmit}
                  className={
                    isStoreLoading
                      ? "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
                      : "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  }
                >
                  {isStoreLoading ? (
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
                      Loading...
                    </>
                  ) : (
                    "Lưu"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
