import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrders,
  handleOrderChange,
} from "../../features/orders/orderSlice";
import Loading from "../../utils/Loading";
import User from "../../assets/img/user.png";
import TableDropdown from "../Dropdowns/TableDropdown";
import { OrderStatus } from "../../utils/StatusOptions";
import { BsCaretDownFill, BsCaretUpFill } from "react-icons/bs";

export const OrderCardTable = () => {
  const { orders, isOrderLoading, page, search, filter, sort } = useSelector(
    (store) => store.order
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrders());
  }, [page, search, filter, sort]);

  if (isOrderLoading) {
    return <Loading />;
  }

  const filterOrder = () => {
    if (sort === "DescOrderDate") {
      dispatch(handleOrderChange({ name: "sort", value: "AscOrderDate" }));
    } else {
      dispatch(handleOrderChange({ name: "sort", value: "DescOrderDate" }));
    }
  };

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
        {orders.length === 0 ? (
          <div className="block w-full overflow-x-auto">
            <h2 className="text-center pb-3">
              Không có đơn hàng để hiển thị...
            </h2>
          </div>
        ) : (
          <div className="block w-full overflow-x-auto">
            {/* Projects table */}
            <table className="items-center w-full bg-transparent border-collapse">
              <thead>
                <tr>
                  <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                    Ảnh người dùng
                  </th>
                  <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                    Tên người đặt
                  </th>
                  <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                    Địa chỉ đơn hàng
                  </th>
                  <th
                    className="flex items-center px-6 align-middle text-xs uppercase font-semibold text-left cursor-pointer"
                    onClick={filterOrder}
                  >
                    <div>Ngày đặt đơn hàng</div>
                    {sort === "DescOrderDate" ? (
                      <BsCaretDownFill className="text-md ml-2" />
                    ) : (
                      <BsCaretUpFill className="text-md ml-2" />
                    )}
                  </th>
                  {/* <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                    Ngày đặt đơn hàng
                  </th> */}
                  <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                    Trạng thái
                  </th>
                  <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => {
                  return (
                    <tr key={order.id} className="bg-white hover:bg-green-50">
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                        <img
                          src={order.user.photoUrl || User}
                          className="h-12 w-12 bg-white rounded-full border"
                          alt="..."
                        ></img>
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4">
                        {order.user.displayName}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4">
                        {order.address}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4">
                        <div className="flex">
                          {(() => {
                            if (order.orderDate) {
                              let a = new Date(order.orderDate + "Z");
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
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4">
                        <div className="flex items-center">
                          <span className="mr-2">
                            {OrderStatus.map((status) => {
                              return (
                                <div key={status.id}>
                                  {order.status === status.id
                                    ? status.name
                                    : ""}
                                </div>
                              );
                            })}
                          </span>
                        </div>
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                        <TableDropdown
                          link={`/store/order-form/${order.id}`}
                          userChatLink={`/store/chat/${order.user.id}`}
                          role={2}
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
    </>
  );
};
