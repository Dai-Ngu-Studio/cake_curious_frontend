import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CardBarChart from "../../components/Cards/CardBarChart";
import CardLineChart from "../../components/Cards/CardLineChart";
import CardPageVisits from "../../components/Cards/CardPageVisits";
import CardSocialTraffic from "../../components/Cards/CardSocialTraffic";
import AdminHeaderStats from "../../components/Headers/AdminHeaderStats";
import { getAdminDashboard } from "../../features/dashboards/dashboardSlice";
import Loading from "../../ultils/Loading";

export default function StaffDashboard() {
  const {
    isDashboardLoading,
    barChart,
    lineChart,
    tableStoreVisit,
    tableFamousRecipe,
    cardStats,
  } = useSelector((store) => store.dashboard);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAdminDashboard());
  }, []);

  if (isDashboardLoading) {
    return <Loading />;
  }
  return (
    <>
      <AdminHeaderStats cardStats={cardStats} />
      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardLineChart lineChart={lineChart} role={0} />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardBarChart barChart={barChart} role={0} />
        </div>
      </div>
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardPageVisits famousRecipes={tableFamousRecipe} />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardSocialTraffic storeVisits={tableStoreVisit} />
        </div>
      </div>
    </>
  );
}
