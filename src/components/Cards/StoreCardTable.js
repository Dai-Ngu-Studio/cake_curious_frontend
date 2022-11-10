import React, { useEffect } from "react";
import PropTypes from "prop-types";

import StoreImg from "../../assets/img/no-store.png";
// components
import StatusCard from "./StatusCard";
import TableDropdown from "../Dropdowns/TableDropdown";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../ultils/Loading";
import { getAllStores, setUpdateStore } from "../../features/stores/storeSlice";

export default function StoreCardTable() {
  const { stores, isStoreLoading, page, search, filter, sort } = useSelector(
    (selector) => selector.store
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllStores());
  }, [page, search, filter, sort]);

  if (isStoreLoading) {
    return <Loading />;
  }

  return (
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
                  Đánh giá
                </th>
                <th className="px-6 align-middle text-xs uppercase font-semibold text-left ">
                  Trạng thái
                </th>
                <th className="px-6 align-middle text-xs uppercase font-semibold text-left "></th>
              </tr>
            </thead>
            <tbody>
              {stores.map((store, index) => {
                return (
                  <tr
                    key={store.id}
                    className={
                      "hover:bg-green-50 " +
                      (index % 2 === 1 ? "bg-gray-50" : "bg-white")
                    }
                  >
                    <th className="pl-6 align-middle p-1 text-left flex justify-center">
                      <img
                        src={store.photoUrl || StoreImg}
                        className="w-32"
                      ></img>
                    </th>
                    <td className="pl-6 align-middle p-4">{store.name}</td>
                    <td className="pl-6 p-4">
                      <div className="flex items-center">
                        {store.user.photoUrl && (
                          <img
                            src={store.user.photoUrl}
                            className="mr-2 h-12 w-12 rounded-full border"
                          ></img>
                        )}
                        <div>{store.user.displayName}</div>
                      </div>
                    </td>
                    <td className="pl-6 align-middle p-4">
                      <div className="flex">{store.rating}</div>
                    </td>
                    <td className="pl-6 align-middle p-4">
                      <div className="flex items-center">
                        <span className="mr-2">
                          {store.status === 0 ? (
                            <StatusCard
                              text="Hoạt động"
                              backgroundColor="bg-green-200"
                              dotColor="bg-green-600"
                            />
                          ) : (
                            <StatusCard
                              text="Dừng hoạt động"
                              backgroundColor="bg-gray-200"
                              dotColor="bg-gray-600"
                            />
                          )}
                        </span>
                      </div>
                    </td>
                    <td className="pl-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                      <TableDropdown
                        link="/admin/store-form"
                        setUpdate={setUpdateStore({
                          editStoreId: store.id,
                          description: store.description,
                          name: store.name,
                          photoUrl: store.photoUrl,
                          address: store.address,
                          user: store.user,
                          rating: store.rating,
                          status: store.status,
                        })}
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
  );
}
