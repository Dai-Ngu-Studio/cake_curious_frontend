import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CardPaging from "../../components/Cards/CardPaging";
import { OrderDetailCardTable } from "../../components/Cards/OrderDetailCardTable";
import FormRowSelect from "../../components/Inputs/FormRowSelect";
import { changeOrderDetailPage } from "../../features/order-details/orderDetailSlice";
import {
  getSingleOrder,
  handleOrderChange,
  updateOrder,
} from "../../features/orders/orderSlice";
import Loading from "../../utils/Loading";
import { OrderStatus } from "../../utils/StatusOptions";

const OrderForm = () => {
  const {
    isOrderLoading,
    isOrderProcessing,
    total,
    status,
    orderDate,
    discountedTotal,
    address,
    user,
    processedDate,
    completedDate,
    isOrderDoneUpdating,
    code,
  } = useSelector((store) => store.order);
  const dispatch = useDispatch();
  const { totalOrderDetailPages, page } = useSelector(
    (store) => store.orderDetail
  );
  const { editOrderId } = useParams();

  const [disableSelectStatus, setDisableSelectStatus] = useState(false);
  const [disableOptionStatus, setDisableOptionStatus] = useState(null);
  const [isOrderEditing, setIsOrderEditing] = useState(false);

  useEffect(() => {
    if (isOrderDoneUpdating) {
      dispatch(getSingleOrder({ orderId: editOrderId }));
    }
  }, [isOrderDoneUpdating]);

  useEffect(() => {
    if (parseInt(status) === 1 || parseInt(status) === 2) {
      setDisableSelectStatus(true);
    }
    if (parseInt(status) === 3) {
      setDisableOptionStatus(0);
    } else if (parseInt(status) === 0) {
      setDisableOptionStatus(1);
    }
  }, [status]);

  useEffect(() => {
    if (editOrderId) {
      setIsOrderEditing(true);
    }
    dispatch(getSingleOrder({ orderId: editOrderId }));
  }, []);

  if (isOrderLoading) {
    return <Loading />;
  }

  const handleOrderInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleOrderChange({ name, value }));
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    if (isOrderEditing) {
      dispatch(
        updateOrder({
          orderId: editOrderId,
          order: {
            id: editOrderId,
            orderDate,
            discountedTotal,
            address,
            status: parseInt(status),
          },
        })
      );
      if (status === 1 || status === 2) {
        setDisableSelectStatus(true);
      }
      if (status === 3) {
        setDisableOptionStatus(0);
      }
      return;
    }
  };

  return (
    <div className="relative bg-gray-100 md:pt-32 pb-32 pt-12">
      <div className="4/5 bg-white shadow-lg">
        <div className="w-full h-0.5 bg-indigo-500"></div>
        <div className="flex justify-between p-4">
          <div>
            <h6 className="font-bold">
              Ngày đặt đơn hàng :{" "}
              <span className="text-sm font-medium">
                {(() => {
                  if (orderDate) {
                    let a = new Date(orderDate + "Z");
                    return (
                      a.getDate() +
                      " Tháng " +
                      (a.getMonth() + 1) +
                      ", " +
                      a.getFullYear() +
                      " lúc " +
                      (a.getHours() < 10 ? "0" + a.getHours() : a.getHours()) +
                      ":" +
                      (a.getMinutes() < 10
                        ? "0" + a.getMinutes()
                        : a.getMinutes())
                    );
                  } else return "Không có dữ liệu";
                })()}
              </span>
            </h6>{" "}
            <h6 className="font-bold">
              Ngày xử lý đơn hàng :{" "}
              <span className="text-sm font-medium">
                {(() => {
                  if (processedDate) {
                    let a = new Date(processedDate + "Z");
                    return (
                      a.getDate() +
                      " Tháng " +
                      (a.getMonth() + 1) +
                      ", " +
                      a.getFullYear() +
                      " lúc " +
                      (a.getHours() < 10 ? "0" + a.getHours() : a.getHours()) +
                      ":" +
                      (a.getMinutes() < 10
                        ? "0" + a.getMinutes()
                        : a.getMinutes())
                    );
                  } else return "Không có dữ liệu";
                })()}
              </span>
            </h6>{" "}
            <h6 className="font-bold">
              Ngày hoàn thành đơn hàng :{" "}
              <span className="text-sm font-medium">
                {(() => {
                  if (completedDate) {
                    let a = new Date(completedDate + "Z");
                    return (
                      a.getDate() +
                      " Tháng " +
                      (a.getMonth() + 1) +
                      ", " +
                      a.getFullYear() +
                      " lúc " +
                      (a.getHours() < 10 ? "0" + a.getHours() : a.getHours()) +
                      ":" +
                      (a.getMinutes() < 10
                        ? "0" + a.getMinutes()
                        : a.getMinutes())
                    );
                  } else return "Không có dữ liệu";
                })()}
              </span>
            </h6>
            <h6 className="font-bold">
              Mã đơn : <span className="text-sm font-medium"> {code}</span>
            </h6>
          </div>
          <div className="w-40">
            <address className="text-sm">
              <span className="font-bold"> Người đặt : </span>
              {user?.displayName}
            </address>
          </div>
          <div className="w-40">
            <address className="text-sm">
              <span className="font-bold">Giao tới :</span>
              {address}
            </address>
          </div>
          <div></div>
        </div>
        <div className="flex justify-center p-4">
          <div className="border-b border-gray-200 shadow w-2/3">
            <OrderDetailCardTable
              orderId={editOrderId}
              total={total}
              discountedTotal={discountedTotal}
            />
            {totalOrderDetailPages > 1 && (
              <CardPaging
                totalPages={totalOrderDetailPages}
                page={page}
                handleChangePage={changeOrderDetailPage}
              />
            )}
          </div>
        </div>
        <div>
          <form className="flex justify-between p-4">
            <FormRowSelect
              name="status"
              labelText="Trạng thái"
              disabledSelection={disableSelectStatus}
              disabledOption={disableOptionStatus}
              value={status}
              list={OrderStatus}
              handleChange={handleOrderInput}
            />
            <button
              type="submit"
              disabled={isOrderProcessing}
              onClick={handleOrderSubmit}
              className={
                isOrderProcessing
                  ? "text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
                  : "text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              }
            >
              {isOrderProcessing ? (
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
                  Đang xử lý...
                </>
              ) : (
                "Lưu"
              )}
            </button>
          </form>
        </div>
        <div className="w-full h-0.5 bg-indigo-500"></div>
      </div>
    </div>
  );
};

export default OrderForm;
