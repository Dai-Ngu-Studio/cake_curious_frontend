import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CardBarChart from "../../components/Cards/Dashboard/CardBarChart";
import CardLineChart from "../../components/Cards/Dashboard/CardLineChart";
import StaffHeaderStats from "../../components/Headers/StaffHeaderStats";
import { getStaffDashboard } from "../../features/dashboards/dashboardSlice";
import Loading from "../../utils/Loading";

export default function StaffDashboard() {
  const {
    isDashboardLoading,
    barChart,
    lineChart,
    cardStats,
  } = useSelector((store) => store.dashboard);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStaffDashboard());
  }, []);

  if (isDashboardLoading) {
    return <Loading />;
  }
  return (
    <>
      <StaffHeaderStats cardStats={cardStats} />
      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardLineChart lineChart={lineChart} role={1} />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardBarChart barChart={barChart} role={1} />
        </div>
      </div>
    </>
  );
}
