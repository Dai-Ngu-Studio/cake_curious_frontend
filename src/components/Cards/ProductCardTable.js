import React, { useEffect } from "react";

import Product from "../../assets/img/product.png";
// components

import TableDropdown from "../Dropdowns/TableDropdown";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProducts,
  handleProductChange,
} from "../../features/products/productSlice";
import Loading from "../../utils/Loading";
import { Link } from "react-router-dom";
import { BsCaretDownFill, BsCaretUpFill } from "react-icons/bs";
import StatusCard from "./StatusCard";
export default function ProductCardTable() {
  const { products, isProductLoading, page, search, filter, sort } =
    useSelector((store) => store.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [page, search, filter, sort]);

  if (isProductLoading) {
    return <Loading />;
  }
  const filterProduct = () => {
    if (sort === "DescPrice") {
      dispatch(handleProductChange({ name: "sort", value: "AscPrice" }));
    } else {
      dispatch(handleProductChange({ name: "sort", value: "DescPrice" }));
    }
  };

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <Link
                className="flex items-center p-2 w-fit text-green-500 border border-green-600 hover:bg-green-600 hover:text-white rounded-md cursor-pointer"
                to="/store/product-form"
              >
                Tạo mới sản phẩm
              </Link>
            </div>
          </div>
        </div>
        {products.length === 0 ? (
          <div className="block w-full overflow-x-auto">
            <h2 className="text-center pb-3">
              Không có sản phẩm để hiển thị...
            </h2>
          </div>
        ) : (
          <div className="block w-full overflow-x-auto">
            {/* Projects table */}
            <table className="items-center w-full bg-transparent border-collapse">
              <thead>
                <tr>
                  <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                    Ảnh
                  </th>
                  <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                    Tên
                  </th>
                  <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                    Số lượng
                  </th>
                  <th
                    className="flex items-center px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                    onClick={filterProduct}
                  >
                    <div>Giá cả</div>
                    {sort === "DescPrice" ? (
                      <BsCaretDownFill className="text-md ml-2" />
                    ) : (
                      <BsCaretUpFill className="text-md ml-2" />
                    )}
                  </th>
                  {/* <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                    Giá cả
                  </th> */}
                  <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                    Trạng thái
                  </th>
                  <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"></th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => {
                  return (
                    <tr key={product.id} className="bg-white hover:bg-green-50">
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                        <img
                          src={product.photoUrl || Product}
                          className="h-12 w-12 bg-white rounded-full border"
                          alt="..."
                        ></img>
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4">
                        {product.name}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4">
                        {product.quantity}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4">
                        <div className="flex">{product.price}</div>
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4">
                        <div className="flex items-center">
                          <span className="mr-2">
                            {product.status === 0 ? (
                              <StatusCard
                                text="Đang hoạt động"
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
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                        <TableDropdown
                          link={`/store/product-form/${product.id}`}
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
