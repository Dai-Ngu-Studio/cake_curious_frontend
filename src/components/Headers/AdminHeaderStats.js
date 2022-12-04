import React from "react";

// components
import CardStats from "../Cards/Dashboard/CardStats";

export default function AdminHeaderStats({ cardStats }) {
  return (
    <>
      {/* Header */}
      <div className="flex pt-32 pb-10">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="REPORT"
                  statTitle={cardStats?.currentWeekReport}
                  statArrow={cardStats?.sinceLastWeekReport > 0 ? "up" : "down"}
                  statPercent={cardStats?.sinceLastWeekReport}
                  statPercentColor={
                    cardStats?.sinceLastWeekReport > 0
                      ? "text-red-500"
                      : "text-emerald-500"
                  }
                  statDescripiron="Since last month"
                  statIconName="far fa-chart-bar"
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="NEW BAKERS"
                  statTitle={cardStats?.currentMonthNewBaker}
                  statArrow={
                    cardStats?.sinceLastMonthNewBaker > 0 ? "up" : "down"
                  }
                  statPercent={cardStats?.sinceLastMonthNewBaker}
                  statPercentColor={
                    cardStats?.sinceLastMonthNewBaker > 0
                      ? "text-emerald-500"
                      : "text-red-500"
                  }
                  statDescripiron="Since last month"
                  statIconName="fas fa-chart-pie"
                  statIconColor="bg-orange-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="ACTIVE USERS"
                  statTitle={cardStats?.currentWeekActiveUser}
                  statArrow={
                    cardStats?.sinceLastWeekActiveUser > 0 ? "up" : "down"
                  }
                  statPercent={cardStats?.sinceLastWeekActiveUser}
                  statPercentColor={
                    cardStats?.sinceLastWeekActiveUser > 0
                      ? "text-emerald-500"
                      : "text-red-500"
                  }
                  statDescripiron="Since last week"
                  statIconName="fas fa-users"
                  statIconColor="bg-pink-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="NEW STORE"
                  statTitle={cardStats?.currentMonthNewStore}
                  statArrow={
                    cardStats?.sinceLastMonthNewStore > 0 ? "up" : "down"
                  }
                  statPercent={cardStats?.sinceLastMonthNewStore}
                  statPercentColor={
                    cardStats?.sinceLastMonthNewStore > 0
                      ? "text-emerald-500"
                      : "text-red-500"
                  }
                  statDescripiron="Since last month"
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
