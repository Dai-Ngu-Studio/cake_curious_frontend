import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CardBarChart from "../../components/Cards/Dashboard/CardBarChart";
import CardLineChart from "../../components/Cards/Dashboard/CardLineChart";
import CardPageVisits from "../../components/Cards/Dashboard/CardPageVisits";
import CardSocialTraffic from "../../components/Cards/Dashboard/CardSocialTraffic";
import AdminHeaderStats from "../../components/Headers/AdminHeaderStats";
import { getAdminDashboard } from "../../features/dashboards/dashboardSlice";
import Loading from "../../utils/Loading";

export default function AdminDashboard() {
  const {
    isDashboardLoading,
    barChart,
    lineChart,
    tableStoreVisit,
    tableFamousRecipe,
    cardStats,
  } = useSelector((store) => store.dashboard);
  const { user } = useSelector((store) => store.user);
  let priorityRole = 99;
  for (let i = 0; i < user.hasRoles.length; i++) {
    var roleId = user.hasRoles[i].roleId;
    if (roleId < priorityRole) {
      priorityRole = roleId;
    }
  }
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
          <CardLineChart lineChart={lineChart} role={priorityRole} />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardBarChart barChart={barChart} role={priorityRole} />
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
