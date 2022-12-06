import React from "react";
import { Chart } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import moment from "moment";

export default function CardLineChart({ lineChart, role }) {
  let currentYearData = null;
  let lastYearData = null;
  let label = "";
  // const months = [];
  // for (let index = 0; index < lineChart?.currentYearActiveUser?.length; index++) {
  //   const element =  lineChart?.currentYearActiveUser[index];
  //   if (element > 0) {
  //     // console.log(element);
  //      months.push(moment().year(new Date().getFullYear()).month(index+1).date(0).startOf("month").format("MMM"))
  //   }
  //   // months.push(moment().year(2022).month(index+1).date(0).startOf("month"))
  //   // console.log(element)
  // }
  // console.log(months)
  switch (role) {
    case 0:
      currentYearData = lineChart?.currentYearActiveUser
      lastYearData = lineChart?.lastYearActiveUser
      label = "Active user"
      break;
    case 1:
      currentYearData = lineChart?.currentYearProcessedReports
      lastYearData = lineChart?.currentYearUnprocessedReports
      label = "Reports"
      break;
    case 2:
      currentYearData = lineChart?.currentYearStoreVisit
      lastYearData = lineChart?.lastYearStoreVisit
      label = "Store visit"
      break;
  }

  const config = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: role === 0 ? new Date().getFullYear() : "Processed Reports",
        backgroundColor: "#4c51bf",
        borderColor: "#4c51bf",
        data: currentYearData,
        fill: false,
      },
      {
        label: role === 0 ? new Date().getFullYear() - 1 : "Unprocessed Reports",
        fill: false,
        backgroundColor: "#fff",
        borderColor: "#fff",
        data: lastYearData,
      },
    ],
  };
  const option = {
    maintainAspectRatio: false,
    responsive: true,

    plugins: {
      title: {
        display: false,
        text: "Sales Charts",
        fontColor: "white",
      },
      legend: {
        labels: {
          color: "white",
        },
        align: "end",
        position: "bottom",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    hover: {
      mode: "nearest",
      intersect: true,
    },
    scales: {
      x: {
        ticks: {
          color: "rgba(255,255,255,.7)",
        },
        display: true,
        title: {
          display: false,
          labelString: "Month",
          color: "white",
        },
        grid: {
          display: false,
          borderDash: [2],
          borderDashOffset: [2],
          color: "rgba(33, 37, 41, 0.3)",
          zeroLineColor: "rgba(0, 0, 0, 0)",
          zeroLineBorderDash: [2],
          zeroLineBorderDashOffset: [2],
        },
      },

      y: {
        ticks: {
          color: "rgba(255,255,255,.7)",
        },
        display: true,
        title: {
          display: false,
          labelString: "Value",
          fontColor: "white",
        },
        grid: {
          borderDash: [3],
          borderDashOffset: [3],
          drawBorder: false,
          color: "rgba(255, 255, 255, 0.15)",
          zeroLineColor: "rgba(33, 37, 41, 0)",
          zeroLineBorderDash: [2],
          zeroLineBorderDashOffset: [2],
        },
      },
    },
  };

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-blueGray-100 mb-1 text-xs font-semibold">
                Overview
              </h6>
              <h2 className="text-white text-xl font-semibold">
                {label}
              </h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-350-px">
            <Line data={config} options={option} />
          </div>
        </div>
      </div>
    </>
  );
}
