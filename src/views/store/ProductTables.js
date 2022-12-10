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
import { ProductTypeFilterOptions, ProductSortingOptions } from "../../utils/ViewOptions";

export default function ProductTables() {
  const { totalProductPages, page, search, filter, sort } =
    useSelector((store) => store.product);
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardSearch
            sort={sort}
            filter={filter}
            search={search}
            filterOptions={ProductTypeFilterOptions}
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
