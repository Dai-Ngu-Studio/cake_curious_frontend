import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders, setUpdateOrder } from "../../features/orders/orderSlice";
import Loading from "../../utils/Loading";
import User from "../../assets/img/user.png";
import moment from "moment/moment";
import TableDropdown from "../Dropdowns/TableDropdown";
import { OrderStatus } from "../../utils/StatusOptions";
import { setChatting } from "../../features/chats/chatSlice";

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

  return (
    <>
      <div
        className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white"       
      >
        {orders.length === 0 ? (
          <div className="block w-full overflow-x-auto">
            <h2 className="text-center pb-3">Không có đơn hàng để hiển thị...</h2>
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
                  <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                    Ngày đặt đơn hàng
                  </th>
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
                          {moment
                            .utc(order.orderDate)
                            .local()
                            .format("MMM Do, YYYY")}
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
