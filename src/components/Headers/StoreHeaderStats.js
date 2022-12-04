import React from "react";
// components
import CardStats from "../Cards/Dashboard/CardStats";

export default function StoreHeaderStats({ cardStats }) {
  return (
    <>
      {/* Header */}
      <div className="relative pt-32 pb-10">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="PRODUCT SOLD"
                  statTitle={cardStats?.currentMonthProductSold}
                  statArrow={
                    cardStats?.sinceLastMonthProductSold > 0 ? "up" : "down"
                  }
                  statPercent={cardStats?.sinceLastMonthProductSold}
                  statPercentColor={
                    cardStats?.sinceLastMonthProductSold > 0
                      ? "text-emerald-500"
                      : "text-red-500"
                  }
                  statDescripiron="Since last month"
                  statIconName="far fa-chart-bar"
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="SALES"
                  statTitle={cardStats?.currentWeekSales}
                  statArrow={cardStats?.sinceLastWeekSales > 0 ? "up" : "down"}
                  statPercent={cardStats?.sinceLastWeekSales}
                  statPercentColor={
                    cardStats?.sinceLastWeekSales > 0
                      ? "text-emerald-500"
                      : "text-red-500"
                  }
                  statDescripiron="Since last week"
                  statIconName="fas fa-chart-pie"
                  statIconColor="bg-orange-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="COMPLETE ORDERS"
                  statTitle={cardStats?.currentMonthTotalCompletedOrder}
                  statArrow={
                    cardStats?.sinceLastMonthTotalCompletedOrder > 0
                      ? "up"
                      : "down"
                  }
                  statPercent={cardStats?.sinceLastMonthTotalCompletedOrder}
                  statPercentColor={
                    cardStats?.sinceLastMonthTotalCompletedOrder > 0
                      ? "text-emerald-500"
                      : "text-red-500"
                  }
                  statDescripiron="Since last month"
                  statIconName="fas fa-users"
                  statIconColor="bg-pink-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="STORE VISIT"
                  statTitle={cardStats?.currentWeekStoreVisit}
                  statArrow={
                    cardStats?.sinceLastWeekStoreVisit > 0 ? "up" : "down"
                  }
                  statPercent={cardStats?.sinceLastWeekStoreVisit}
                  statPercentColor={
                    cardStats?.sinceLastWeekStoreVisit > 0
                      ? "text-emerald-500"
                      : "text-red-500"
                  }
                  statDescripiron="Since last week"
                  statIconName="fas fa-percent"
                  statIconColor="bg-lightBlue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
