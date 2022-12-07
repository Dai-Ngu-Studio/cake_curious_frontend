import React from "react";

// components
import CardStats from "../Cards/Dashboard/CardStats";

export default function StaffHeaderStats({ cardStats }) {
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
                  statSubtitle="TODAY REPORTS"
                  statTitle={cardStats?.todayReports}
                  statArrow={cardStats?.sinceYesterdayReports > 0 ? "up" : "down"}
                  statPercent={cardStats?.sinceYesterdayReports}
                  statPercentColor={
                    cardStats?.sinceYesterdayReports > 0
                      ? "text-red-500"
                      : "text-emerald-500"
                  }
                  statDescripiron="Since yesterday"
                  statIconName="far fa-chart-bar"
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="REPORTED RECIPE"
                  statTitle={cardStats?.currentWeekReportedRecipes}
                  statArrow={
                    cardStats?.sinceLastWeekReportedRecipes > 0 ? "up" : "down"
                  }
                  statPercent={cardStats?.sinceLastWeekReportedRecipes}
                  statPercentColor={
                    cardStats?.sinceLastWeekReportedRecipes > 0
                      ? "text-red-500"
                      : "text-emerald-500"
                  }
                  statDescripiron="Since last week"
                  statIconName="fas fa-chart-pie"
                  statIconColor="bg-orange-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="REPORTED COMMENT"
                  statTitle={cardStats?.currentWeekReportedComments}
                  statArrow={
                    cardStats?.sinceLastWeekReportedComments > 0 ? "up" : "down"
                  }
                  statPercent={cardStats?.sinceLastWeekReportedComments}
                  statPercentColor={
                    cardStats?.sinceLastWeekReportedComments > 0
                      ? "text-red-500"
                      : "text-emerald-500"
                  }
                  statDescripiron="Since last week"
                  statIconName="fas fa-users"
                  statIconColor="bg-pink-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="NEW STORE"
                  statTitle={cardStats?.currentWeekProcessedReports}
                  statArrow={
                    cardStats?.sinceLastWeekProcessedReports > 0 ? "up" : "down"
                  }
                  statPercent={cardStats?.sinceLastWeekProcessedReports}
                  statPercentColor={
                    cardStats?.sinceLastWeekProcessedReports > 0
                      ? "text-red-500"
                      : "text-emerald-500"
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
