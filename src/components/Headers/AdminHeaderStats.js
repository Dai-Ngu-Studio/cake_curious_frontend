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
                  statSubtitle="BÁO CÁO"
                  statTitle={cardStats?.currentWeekReport}
                  statArrow={cardStats?.sinceLastWeekReport > 0 ? "up" : "down"}
                  statPercent={cardStats?.sinceLastWeekReport * 100}
                  statPercentColor={
                    cardStats?.sinceLastWeekReport > 0
                      ? "text-red-500"
                      : "text-emerald-500"
                  }
                  statDescripiron="Từ tuần trước"
                  statIconName="far fa-chart-bar"
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="THỢ LÀM BÁNH MỚI"
                  statTitle={cardStats?.currentMonthNewBaker}
                  statArrow={
                    cardStats?.sinceLastMonthNewBaker > 0 ? "up" : "down"
                  }
                  statPercent={cardStats?.sinceLastMonthNewBaker * 100}
                  statPercentColor={
                    cardStats?.sinceLastMonthNewBaker > 0
                      ? "text-emerald-500"
                      : "text-red-500"
                  }
                  statDescripiron="Từ tháng trước"
                  statIconName="fas fa-chart-pie"
                  statIconColor="bg-orange-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="LƯỢNG NGƯỜI DÙNG HOẠT ĐỘNG"
                  statTitle={cardStats?.currentWeekActiveUser}
                  statArrow={
                    cardStats?.sinceLastWeekActiveUser > 0 ? "up" : "down"
                  }
                  statPercent={cardStats?.sinceLastWeekActiveUser * 100}
                  statPercentColor={
                    cardStats?.sinceLastWeekActiveUser > 0
                      ? "text-emerald-500"
                      : "text-red-500"
                  }
                  statDescripiron="Từ tuần trước"
                  statIconName="fas fa-users"
                  statIconColor="bg-pink-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="CỬA HÀNG MỚI"
                  statTitle={cardStats?.currentMonthNewStore}
                  statArrow={
                    cardStats?.sinceLastMonthNewStore > 0 ? "up" : "down"
                  }
                  statPercent={cardStats?.sinceLastMonthNewStore * 100}
                  statPercentColor={
                    cardStats?.sinceLastMonthNewStore > 0
                      ? "text-emerald-500"
                      : "text-red-500"
                  }
                  statDescripiron="Từ tuần trước"
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
