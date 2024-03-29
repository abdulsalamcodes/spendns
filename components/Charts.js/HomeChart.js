import React, { useContext } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import MainContext from "../../contexts/MainContext";

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom",
    },
  },
};

const HomeChart = () => {
  const { total } = useContext(MainContext);

  const data = {
    labels: ["Expenses", "Incomes", "Debt Owed To Me", "Debt owed by me"],
    datasets: [
      {
        label: "# of Votes",
        data: [
          total.expenses,
          total.incomes,
          total.debtOwed,
          total.debtOwedByMe,
        ],

        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Doughnut data={data} height="200px" width="200px" options={options} />
  );
};

export default HomeChart;
