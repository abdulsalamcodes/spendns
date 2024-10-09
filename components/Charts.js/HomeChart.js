import React, { useContext } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";
import MainContext from "../../contexts/MainContext";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const DoughnutOptions = {
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom",
    },
    title: {
      display: true,
      text: "Debt Distribution",
      font: {
        size: 16,
      },
    },
  },
};

const BarOptions = {
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: "Upcoming Debts Due",
      font: {
        size: 16,
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: "Amount (₦)",
      },
    },
  },
};

const DebtChart = () => {
  const { debts, total } = useContext(MainContext);

  // Process debts by category
  const categorizedDebts = debts.reduce((acc, debt) => {
    const category = debt.category || "Uncategorized";
    if (!acc[category]) {
      acc[category] = {
        owed: 0,
        owedByMe: 0,
      };
    }
    if (debt.owedByMe) {
      acc[category].owedByMe += debt.amount;
    } else {
      acc[category].owed += debt.amount;
    }
    return acc;
  }, {});

  // Prepare data for doughnut chart
  const doughnutData = {
    labels: ["Owed To Me", "Owed By Me"],
    datasets: [
      {
        data: [total.debtOwed, total.debtOwedByMe],
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)", // Green for money owed to you
          "rgba(255, 99, 132, 0.2)", // Red for money you owe
        ],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  // Get upcoming debts due in the next 30 days
  const today = new Date();
  const thirtyDaysFromNow = new Date(
    today.getTime() + 30 * 24 * 60 * 60 * 1000
  );

  const upcomingDebts = debts
    .filter((debt) => {
      const dueDate = new Date(debt.dueDate);
      return dueDate >= today && dueDate <= thirtyDaysFromNow;
    })
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 5); // Show only the next 5 upcoming debts

  const barData = {
    labels: upcomingDebts.map((debt) => {
      const dueDate = new Date(debt.dueDate);
      return `${dueDate.getMonth() + 1}/${dueDate.getDate()}`;
    }),
    datasets: [
      {
        data: upcomingDebts.map((debt) => debt.amount),
        backgroundColor: upcomingDebts.map((debt) =>
          debt.owedByMe ? "rgba(255, 99, 132, 0.2)" : "rgba(75, 192, 192, 0.2)"
        ),
        borderColor: upcomingDebts.map((debt) =>
          debt.owedByMe ? "rgba(255, 99, 132, 1)" : "rgba(75, 192, 192, 1)"
        ),
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-full">
      <div className="h-48 mb-8">
        <Doughnut data={doughnutData} options={DoughnutOptions} />
      </div>
      {upcomingDebts.length > 0 && (
        <div className="h-48">
          <Bar data={barData} options={BarOptions} />
        </div>
      )}
      <div className="mt-4">
        <h3 className="text-sm font-semibold mb-2">Debt by Category</h3>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(categorizedDebts).map(([category, amounts]) => (
            <div key={category} className="text-xs">
              <p className="font-medium">{category}</p>
              <p className="text-green-600">
                Owed: ₦{amounts.owed.toLocaleString()}
              </p>
              <p className="text-red-600">
                Owing: ₦{amounts.owedByMe.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DebtChart;
