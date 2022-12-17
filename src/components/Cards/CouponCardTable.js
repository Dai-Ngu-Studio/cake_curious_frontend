import React, { useEffect } from "react";

// components
import TableDropdown from "../Dropdowns/TableDropdown";
import { useDispatch, useSelector } from "react-redux";

import Loading from "../../utils/Loading";
import { Link } from "react-router-dom";
import moment from "moment";
import {
  getAllCoupons,
  handleCouponChange,
} from "../../features/coupons/couponSlice";
import { BsCaretDownFill, BsCaretUpFill } from "react-icons/bs";

export default function CouponCardTable() {
  const { coupons, isCouponLoading, page, search, filter, sort } = useSelector(
    (store) => store.coupon
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCoupons());
  }, [page, search, filter, sort]);

  if (isCouponLoading) {
    return <Loading />;
  }

  const filterCoupon = () => {
    if (sort === "DescExpireDate") {
      dispatch(handleCouponChange({ name: "sort", value: "AscExpireDate" }));
    } else {
      dispatch(handleCouponChange({ name: "sort", value: "DescExpireDate" }));
    }
  };

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <Link
                className="font-semibold text-lg text-blueGray-700"
                to="/store/coupon-form"
              >
                Tạo mới Phiếu giảm giá
              </Link>
            </div>
          </div>
        </div>
        {coupons.length === 0 ? (
          <div className="block w-full overflow-x-auto">
            <h2 className="text-center pb-3">
              Không có phiếu giảm để hiển thị...
            </h2>
          </div>
        ) : (
          <div className="block w-full overflow-x-auto">
            {/* Projects table */}
            <table className="items-center w-full bg-transparent border-collapse">
              <thead>
                <tr>
                  <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                    Mã
                  </th>
                  <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                    Tên
                  </th>
                  <th
                    className="flex items-center px-6 align-middle text-xs uppercase font-semibold text-left cursor-pointer"
                    onClick={filterCoupon}
                  >
                    <div>Ngày hết hạn</div>
                    {sort === "DescExpireDate" ? (
                      <BsCaretDownFill className="text-md ml-2" />
                    ) : (
                      <BsCaretUpFill className="text-md ml-2" />
                    )}
                  </th>
                  {/* <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                    Ngày hết hạn
                  </th> */}
                  <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                    Tổng số lần sử dụng
                  </th>
                  <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                    Trạng thái
                  </th>
                  <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"></th>
                </tr>
              </thead>
              <tbody>
                {coupons.map((coupon) => {
                  return (
                    <tr key={coupon.id} className="bg-white hover:bg-green-50">
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                        {coupon.code}
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4">
                        {coupon.name}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4">
                        {(() => {
                          if (coupon.expiryDate) {
                            let a = new Date(coupon.expiryDate + "Z");
                            return (
                              a.getDate() +
                              " Tháng " +
                              a.getMonth() +
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
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4">
                        <div className="flex">{coupon.maxUses}</div>
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4">
                        <div className="flex items-center">
                          <span className="mr-2">
                            {coupon.status === 0
                              ? "Đang hoạt động"
                              : "Dừng hoạt động"}
                          </span>
                        </div>
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                        <TableDropdown
                          link={`/store/coupon-form/${coupon.id}`}
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
}
