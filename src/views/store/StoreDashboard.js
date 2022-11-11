import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CardBarChart from "../../components/Cards/CardBarChart";
import CardLineChart from "../../components/Cards/CardLineChart";
import StoreHeaderStats from "../../components/Headers/StoreHeaderStats";
import { getStoreDashboard } from "../../features/dashboards/dashboardSlice";
import Loading from "../../utils/Loading";

export default function StoreDashboard() {
  const { isDashboardLoading, barChart, lineChart, cardStats } = useSelector(
    (store) => store.dashboard
  );
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
    dispatch(getStoreDashboard());
  }, []);

  if (isDashboardLoading) {
    return <Loading />;
  }
  return (
    <>
      <StoreHeaderStats cardStats={cardStats} />
      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardLineChart lineChart={lineChart} role={priorityRole} />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardBarChart barChart={barChart} role={priorityRole} />
        </div>
      </div>
    </>
  );
}
