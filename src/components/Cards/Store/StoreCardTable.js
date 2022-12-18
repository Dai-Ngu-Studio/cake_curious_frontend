import { useEffect, useState } from "react";
import StoreImg from "../../../assets/img/no-store.png";
// components
import StatusCard from "../StatusCard";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../utils/Loading";
import {
  getAllStores,
  handleStoreChange,
  updateStore,
} from "../../../features/stores/storeSlice";
import ModalWrapper from "../ModalWrapper";
import {
  BsStarFill,
  BsEyeFill,
  BsCaretDownFill,
  BsCaretUpFill,
} from "react-icons/bs";
import StoreViewModal from "./StoreViewModal";
export default function StoreCardTable() {
  const [isOpenModal, setOpenModal] = useState(false);
  const [modalStore, setModalStore] = useState(null);
  const [isConfirmModal, setIsConfirmModal] = useState(false);
  const {
    stores,
    isStoreLoading,
    page,
    search,
    filter,
    sort,
    isStoreDoneUpdating,
  } = useSelector((selector) => selector.store);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllStores());
  }, [page, search, filter, sort, isStoreDoneUpdating]);

  if (isStoreLoading) {
    return <Loading />;
  }

  function updateFilter() {
    if (sort === "DescCreatedDate") {
      dispatch(handleStoreChange({ name: "sort", value: "AscCreatedDate" }));
    } else {
      dispatch(handleStoreChange({ name: "sort", value: "DescCreatedDate" }));
    }
  }

  const changeStoreStatus = (storeId, storeStatus) => {
    if (storeId) {
      if (storeStatus === 0) {
        dispatch(
          updateStore({
            storeId: storeId,
            store: {
              id: storeId,
              status: 1,
            },
          })
        );
      } else {
        dispatch(
          updateStore({
            storeId: storeId,
            store: {
              id: storeId,
              status: 0,
            },
          })
        );
      }
    }
  };

  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white"
        }
      >
        {stores.length === 0 ? (
          <div className="block w-full overflow-x-auto">
            <h2 className="text-center pb-3">
              Không có dữ liệu cửa hàng để hiển thị ...
            </h2>
          </div>
        ) : (
          <div className="block w-full overflow-x-auto">
            {/* Projects table */}
            <table className="items-center w-full bg-transparent border-collapse">
              <thead className="bg-white border-b-2">
                <tr>
                  <th className="px-6 align-middle py-3 text-xs uppercase font-semibold text-center w-32">
                    Ảnh
                  </th>
                  <th className="px-6 align-middle text-xs uppercase font-semibold text-left ">
                    Tên
                  </th>
                  <th className="px-6 align-middle text-xs uppercase font-semibold text-left ">
                    Chủ cửa hàng
                  </th>
                  <th className="px-6 align-middle text-xs uppercase font-semibold text-left ">
                    <div className="flex items-center">
                      <div>Đánh giá</div>
                      <BsStarFill className="ml-2 text-yellow-400 text-base" />
                    </div>
                  </th>
                  <th
                    className="items-center px-6 align-middle text-xs uppercase font-semibold text-left cursor-pointer"
                    onClick={() => {
                      updateFilter();
                    }}
                  >
                    <div className="flex items-center">
                      <div>Thời điểm đăng ký</div>
                      {sort === "DescCreatedDate" ? (
                        <BsCaretDownFill className="text-md ml-2" />
                      ) : (
                        <BsCaretUpFill className="text-md ml-2" />
                      )}
                    </div>
                  </th>
                  <th className="px-6 align-middle text-xs uppercase font-semibold text-left ">
                    Trạng thái
                  </th>
                </tr>
              </thead>
              <tbody>
                {stores.map((store, index) => {
                  if (store.user)
                    return (
                      <tr
                        key={store.id}
                        className={
                          "hover:bg-green-50 " +
                          (index % 2 === 1 ? "bg-gray-50" : "bg-white")
                        }
                      >
                        <th className="pl-6 align-middle p-1 text-left flex justify-center w-32">
                          <img
                            src={store.photoUrl || StoreImg}
                            className="rounded-lg"
                          ></img>
                        </th>
                        <td className="pl-6 align-middle p-4">{store.name}</td>
                        <td className="pl-6 p-4">
                          <div className="flex items-center">
                            {store.user.photoUrl && (
                              <img
                                src={store.user.photoUrl}
                                className="mr-2 h-12 w-12 rounded-full border"
                                referrerPolicy="no-referrer"
                              ></img>
                            )}
                            <div>{store.user.displayName}</div>
                          </div>
                        </td>
                        <td className="pl-6 align-middle p-4">
                          <div className="flex">{store.rating}</div>
                        </td>
                        <td className="pl-6 align-middle p-4">
                          <div className="flex">
                            {(() => {
                              if (store.createdDate) {
                                let a = new Date(store.createdDate + "Z");
                                return (
                                  a.getDate() +
                                  " Tháng " +
                                  (a.getMonth() + 1) +
                                  ", " +
                                  a.getFullYear() +
                                  " lúc " +
                                  (a.getHours() < 10
                                    ? "0" + a.getHours()
                                    : a.getHours()) +
                                  ":" +
                                  (a.getMinutes() < 10
                                    ? "0" + a.getMinutes()
                                    : a.getMinutes())
                                );
                              } else return "Không có dữ liệu";
                            })()}
                          </div>
                        </td>
                        <td className="pl-6 align-middle p-4">
                          <div className="flex items-center">
                            <span
                              className="mr-2 cursor-pointer"
                              onClick={() => {
                                // let storeEditing = {

                                // }
                                setModalStore({
                                  id: store.id,
                                  status: store.status,
                                });
                                setOpenModal(true);
                                setIsConfirmModal(true);
                                // changeStoreStatus(store.id, store.status);
                              }}
                            >
                              {store.status === 0 ? (
                                <StatusCard
                                  text="Hoạt động"
                                  backgroundColor="bg-green-50"
                                  dotColor="bg-green-600"
                                />
                              ) : (
                                <StatusCard
                                  text="Dừng hoạt động"
                                  backgroundColor="bg-gray-50"
                                  dotColor="bg-gray-600"
                                />
                              )}
                            </span>
                          </div>
                        </td>
                        <td className="pl-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                          <BsEyeFill
                            onClick={() => {
                              setModalStore(store);
                              setOpenModal(true);
                              setIsConfirmModal(false);
                            }}
                            className="p-2 w-10 h-10 text-gray-500 border border-gray-600 hover:bg-gray-600 hover:text-white rounded-md cursor-pointer"
                          />
                        </td>
                      </tr>
                    );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {(() => {
        if (isOpenModal) {
          return (
            <ModalWrapper
              StoreViewModal={StoreViewModal}
              viewObject={modalStore}
              setOpenModal={setOpenModal}
              isConfirmModal={isConfirmModal}
              changeStoreStatus={changeStoreStatus}
            />
          );
        }
      })()}
    </>
  );
}
