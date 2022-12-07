import React from "react";
import { Chart } from "chart.js/auto";
import { Line } from "react-chartjs-2";

export default function CardLineChart({ lineChart, role }) {
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
        label: new Date().getFullYear(),
        backgroundColor: "#4c51bf",
        borderColor: "#4c51bf",
        data:
          role === 0
            ? lineChart?.lastYearActiveUser
            : lineChart?.lastYearStoreVisit,
        fill: false,
      },
      {
        label: new Date().getFullYear() - 1,
        fill: false,
        backgroundColor: "#fff",
        borderColor: "#fff",
        data:
          role === 0
            ? lineChart?.currentYearActiveUser
            : lineChart?.currentYearStoreVisit,
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
                {role === 0 ? "Active user" : "Store visit"}
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