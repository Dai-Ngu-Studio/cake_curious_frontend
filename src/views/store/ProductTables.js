import React from "react";
import { useSelector } from "react-redux";
import CardPaging from "../../components/Cards/CardPaging";
import CardSearch from "../../components/Cards/CardSearch";

// components
import ProductCardTable from "../../components/Cards/ProductCardTable";
import {
  changeProductPage,
  handleProductChange,
} from "../../features/products/productSlice";
import { ProductSortingOptions } from "../../ultils/SortingOptions";

export default function ProductTables() {
  const {
    totalProductPages,
    page,
    search,
    filter,
    isProductLoading,
    sort,
    filterOptions,
  } = useSelector((store) => store.product);
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardSearch
            sort={sort}
            filter={filter}
            search={search}
            loading={isProductLoading}
            filterOptions={filterOptions}
            handleChange={handleProductChange}
            sortOptions={ProductSortingOptions}
          />
          <ProductCardTable />
          {totalProductPages > 1 && (
            <CardPaging
              totalPages={totalProductPages}
              page={page}
              handleChangePage={changeProductPage}
            />
          )}
        </div>
      </div>
    </>
  );
}
