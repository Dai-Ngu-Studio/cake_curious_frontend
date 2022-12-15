import React from "react";
import { useSelector } from "react-redux";
import CardPaging from "../../components/Cards/CardPaging";
import CardSearch from "../../components/Cards/CardSearch";
import CouponCardTable from "../../components/Cards/CouponCardTable";
import {
  changeCouponPage,
  handleCouponChange,
} from "../../features/coupons/couponSlice";
import { CouponFilterOptions } from "../../utils/ViewOptions";

// components

export default function CouponTables() {
  const { totalCouponPages, page, search, filter } = useSelector(
    (store) => store.coupon
  );
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardSearch
            filter={filter}
            search={search}
            filterOptions={CouponFilterOptions}
            handleChange={handleCouponChange}
          />
          <CouponCardTable />
          {totalCouponPages > 1 && (
            <CardPaging
              totalPages={totalCouponPages}
              page={page}
              handleChangePage={changeCouponPage}
            />
          )}
        </div>
      </div>
    </>
  );
}
