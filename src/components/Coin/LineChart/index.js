import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto"; //Dont get rid of this
import numberConvert from "../../../functions/numberConvert";

function LineChart({ chartData, priceType, multiAxis }) {
  const options = {
    plugins: {
      legend: {
        display: multiAxis ? true : false,
      },
    },
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    scales: {
      crypto1: {
        type: "linear",
        display: true,
        position: "left",
        ticks: {
          callback: function (value) {
            if (priceType === "total_volumes") {
              return "$"+ numberConvert(value);
            } else if (priceType === "market_caps") {
              return "$" + numberConvert(value);
            } else {
              return "$" + value.toLocaleString();
            }
          },
        },
      },
      crypto2: multiAxis && {
        type: "linear",
        display: true,
        position: "right",
        ticks: {
          callback: function (value) {
            if (priceType === "total_volumes") {
              return numberConvert(value);
            } else if (priceType === "market_caps") {
              return "$" + numberConvert(value);
            } else {
              return "$" + value.toLocaleString();
            }
          },
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
}

export default LineChart;