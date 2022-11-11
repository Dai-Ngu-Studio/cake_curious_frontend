import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../utils/Loading";
import { getAllOrderDetails } from "../../features/order-details/orderDetailSlice";

export const OrderDetailCardTable = ({ orderId }) => {
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
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white"
        }
      >
        {orderDetails.length === 0 ? (
          <div className="block w-full overflow-x-auto">
            <h2 className="text-center pb-3">No order details to display...</h2>
          </div>
        ) : (
          <div className="block w-full overflow-x-auto">
            {/* Projects table */}
            <table className="items-center w-full bg-transparent border-collapse">
              <thead>
                <tr>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                    }
                  >
                    Product Name
                  </th>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                    }
                  >
                    Quantity
                  </th>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                    }
                  >
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.map((orderDetail) => {
                  return (
                    <tr key={orderDetail.id}>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4">
                        {orderDetail.productName}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4">
                        {orderDetail.quantity}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4">
                        {orderDetail.price}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="items-center w-full bg-transparent border-collapse">
                  <th
                    scope="row"
                    className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                  >
                    Total
                  </th>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4 bg-blueGray-50 border-blueGray-100"></td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4 bg-blueGray-50 border-blueGray-100">
                    21,000
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>
    </>
  );
};
