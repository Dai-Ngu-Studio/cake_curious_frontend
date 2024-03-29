import React from "react";
import { useSelector } from "react-redux";
import CardPaging from "../../components/Cards/CardPaging";
import CardSearch from "../../components/Cards/CardSearch";
import { OrderCardTable } from "../../components/Cards/OrderCardTable";
import {
  changeOrderPage,
  handleOrderChange,
} from "../../features/orders/orderSlice";
import { OrderFilterOptions } from "../../utils/ViewOptions";

// components

export default function OrderTables() {
  const { totalOrderPages, page, search, filter } = useSelector(
    (store) => store.order
  );

  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardSearch
            filter={filter}
            search={search}
            filterOptions={OrderFilterOptions}
            handleChange={handleOrderChange}
          />
          <OrderCardTable />
          {totalOrderPages > 1 && (
            <CardPaging
              totalPages={totalOrderPages}
              page={page}
              handleChangePage={changeOrderPage}
            />
          )}
        </div>
      </div>
    </>
  );
}
