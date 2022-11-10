import React, { useEffect } from "react";
import PropTypes from "prop-types";

import Shop from "../../assets/img/shop.png";
// components

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
          <h2 className="text-center pb-3">No stores to display...</h2>
        </div>
      ) : (
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse border-b-2">
            <thead className="bg-white border-b-2">
              <tr>
                <th
                  className={
                    "px-6 align-middle py-3 text-xs uppercase font-semibold text-left "
                  }
                >
                  Photo
                </th>
                <th
                  className={
                    "px-6 align-middle  text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                  }
                >
                  Name
                </th>
                <th
                  className={
                    "px-6 align-middle  text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                  }
                >
                  Owner
                </th>
                <th
                  className={
                    "px-6 align-middle  text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                  }
                >
                  Rating
                </th>
                <th
                  className={
                    "px-6 align-middle  text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                  }
                >
                  Status
                </th>
                <th
                  className={
                    "px-6 align-middle  text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                  }
                ></th>
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
                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                      <img
                        src={store.photoUrl || Shop}
                        className="h-12 w-12 bg-white rounded-full border"
                      ></img>
                    </th>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4">
                      {store.name}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4">
                      {store.user.displayName}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4">
                      <div className="flex">{store.rating}</div>
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4">
                      <div className="flex items-center">
                        <span className="mr-2">
                          {store.status === 0 ? "Active" : "Inactive"}
                        </span>
                        {/* <div className="relative w-full">
                          <div className="overflow-hidden h-2 text-xs flex rounded bg-red-200">
                            <div
                              style={{ width: "60%" }}
                              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
                            ></div>
                          </div>
                        </div> */}
                      </div>
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
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
