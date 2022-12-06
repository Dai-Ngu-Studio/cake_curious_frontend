import React from "react";
import { Chart } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import moment from "moment/moment";

export default function CardBarChart({ barChart, role }) {
  let currentMonthData = null;
  let lastMonthData = null;
  switch (role) {
    case 0:
      currentMonthData = barChart?.currentMonthReport
      lastMonthData = barChart?.lastMonthReport
      break;
    case 1:
      currentMonthData = barChart?.currentMonthReports
      lastMonthData = barChart?.lastMonthReports
      break;
    case 2:
      currentMonthData = barChart?.currentMonthSales
      lastMonthData = barChart?.lastMonthSales
      break;
  }
  
  const config = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: moment().month(new Date().getMonth()).format("MMMM"),
        backgroundColor: "#ed64a6",
        borderColor: "#ed64a6",
        data: currentMonthData,
        fill: false,
        barThickness: 8,
      },
      {
        label: moment()
          .month(new Date().getMonth() - 1)
          .format("MMMM"),
        fill: false,
        backgroundColor: "#4c51bf",
        borderColor: "#4c51bf",
        data: lastMonthData,
        barThickness: 8,
      },
    ],
  };
  const option = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      title: {
        display: false,
        text: "Orders Chart",
      },
      tooltips: {
        mode: "index",
        intersect: false,
      },
      legend: {
        labels: {
          color: "rgba(0,0,0,.4)",
        },
        align: "end",
        position: "bottom",
      },
    },
    hover: {
      mode: "nearest",
      intersect: true,
    },
    scales: {
      x: {
        display: false,
        title: {
          display: true,
          labelString: "Month",
        },
        grid: {
          borderDash: [2],
          borderDashOffset: [2],
          color: "rgba(33, 37, 41, 0.3)",
          zeroLineColor: "rgba(33, 37, 41, 0.3)",
          zeroLineBorderDash: [2],
          zeroLineBorderDashOffset: [2],
        },
      },
      y: {
        display: true,
        title: {
          display: false,
          labelString: "Value",
        },
        grid: {
          borderDash: [2],
          drawBorder: false,
          borderDashOffset: [2],
          color: "rgba(33, 37, 41, 0.2)",
          zeroLineColor: "rgba(33, 37, 41, 0.15)",
          zeroLineBorderDash: [2],
          zeroLineBorderDashOffset: [2],
        },
      },
    },
  };

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-blueGray-400 mb-1 text-xs font-semibold">
                Performance
              </h6>
              <h2 className="text-blueGray-700 text-xl font-semibold">
                {role === 0 || role === 1 ? "User report" : "Week sales"}
              </h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-350-px">
            <Bar data={config} options={option} />
          </div>
        </div>
      </div>
    </>
  );
}
