import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../utils/Loading";
import { getAllOrderDetails } from "../../features/order-details/orderDetailSlice";

export const OrderDetailCardTable = ({ orderId, discountedTotal, total }) => {
  const { orderDetails, isOrderDetailLoading, page, sort } = useSelector(
    (store) => store.orderDetail
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrderDetails({ orderId: orderId }));
  }, [page, sort]);

  if (isOrderDetailLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex flex-col min-w-0 break-words shadow-lg rounded">
        {orderDetails.length === 0 ? (
          <div className="block w-full overflow-x-auto">
            <h2 className="text-center pb-3">
              Không có chi tiết đơn hàng để hiển thị...
            </h2>
          </div>
        ) : (
          <div className="block w-full overflow-x-auto">
            {/* Projects table */}
            <table className="items-center w-full bg-transparent border-collapse">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-xs text-gray-500 ">#</th>
                  <th className="px-4 py-2 text-xs text-gray-500 ">TÊN</th>
                  <th className="px-4 py-2 text-xs text-gray-500 ">
                    SỐ LƯỢNG SẢN PHẨM
                  </th>
                  <th className="px-4 py-2 text-xs text-gray-500 ">
                    GIÁ ĐƠN SẢN PHẨM
                  </th>
                  <th className="px-4 py-2 text-xs text-gray-500 ">TỔNG PHỤ</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.map((orderDetail, index) => {
                  return (
                    //     <tr className="whitespace-nowrap">
                    //   <td className="px-6 py-4 text-sm text-gray-500">1</td>
                    //   <td className="px-6 py-4">
                    //     <div className="text-sm text-gray-900">
                    //       Amazon Brand - Symactive Men's Regular Fit T-Shirt
                    //     </div>
                    //   </td>
                    //   <td className="px-6 py-4">
                    //     <div className="text-sm text-gray-500">4</div>
                    //   </td>
                    //   <td className="px-6 py-4 text-sm text-gray-500">$20</td>
                    //   <td className="px-6 py-4">$30</td>
                    // </tr>
                    <tr className="whitespace-nowrap" key={orderDetail.id}>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {orderDetail.productName}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500">
                          {orderDetail.quantity}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {orderDetail.price}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {orderDetail.price * orderDetail.quantity}
                      </td>
                    </tr>
                  );
                })}
                <tr className="">
                  <td colspan="3"></td>
                  <td className="text-sm font-bold">Tổng cộng</td>
                  <td className="text-sm font-bold tracking-wider">
                    <b>{total}</b>
                  </td>
                </tr>
                <tr>
                  <th colspan="3"></th>
                  <td className="text-sm font-bold">
                    <b></b>
                  </td>
                  <td className="text-sm font-bold">
                    <b>
                      {discountedTotal !== total
                        ? "Có giảm giá"
                        : "Không giảm giá"}
                    </b>
                  </td>
                </tr>
                <tr className="text-white bg-gray-800">
                  <th colspan="3"></th>
                  <td className="text-sm font-bold">
                    <b>Tổng cần trả</b>
                  </td>
                  <td className="text-sm font-bold">
                    <b>{discountedTotal}</b>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};
