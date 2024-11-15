import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";

// Registering required components for the bar chart
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const MonthlyExpensesBarChart = ({ transactions }) => {
  // Calculate the total expenses for each month
  const monthlyExpenses = [];
  for (let month = 0; month < 12; month++) {
    const monthTransactions = transactions.filter(transaction => {
      const transactionDate = new Date(parseInt(transaction.date));
      return transactionDate.getMonth() === month;
    });

    const monthTotal = monthTransactions.reduce((total, transaction) => total + transaction.amount, 0);
    monthlyExpenses.push(monthTotal);
  }

  const monthlyExpenseData = {
    labels: [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ],
    datasets: [
      {
        label: "Monthly Expenses",
        data: monthlyExpenses,
        backgroundColor: "rgba(75, 192, 192, 0.2)", // Light color for the bars
        borderColor: "rgba(75, 192, 192, 1)", // Darker color for the borders
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75, 192, 192, 0.5)", // Hover effect for bars
        hoverBorderColor: "rgba(75, 192, 192, 1)", // Hover effect for borders
        hoverBorderWidth: 2, // Thicker border on hover
      },
    ],
  };

  return (
    <div className="card card-chart" style={{ width: "100%", height: "500px" }}>
      <div className="card-header card-chart-header">
        <h3 className="chart-title text-center text-light">Monthly Expenses</h3>
      </div>
      <div className="card-body card-chart-body" style={{ padding: "0", margin: "0" }}>
        <Bar
          className="chart chartjs-render-monitor chart-legend"
          data={monthlyExpenseData}
          options={{
            responsive: true,
            maintainAspectRatio: false, // Maintains aspect ratio when resizing
            plugins: {
              legend: {
                position: "top",
                labels: {
                  font: {
                    size: 14, // Adjust font size for the legend
                  },
                },
              },
              tooltip: {
                enabled: true,
                callbacks: {
                  // Customize tooltips to show detailed information
                  label: function (context) {
                    return `${context.label}: ₹${context.raw.toFixed(2)}`;
                  },
                },
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Month",
                  color: "black",
                  font: {
                    size: 16,
                  },
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Amount (Rs.)",
                  color: "black",
                  font: {
                    size: 16,
                  },
                },
                beginAtZero: true,
                ticks: {
                  callback: function (value) {
                    return `₹${value.toFixed(2)}`; // Format y-axis ticks as currency
                  },
                },
              },
            },
            animation: {
              duration: 1000, // Duration of chart animation
              easing: 'easeOutBounce', // Easing function for animation
            },
          }}
        />
      </div>
    </div>
  );
};

export default MonthlyExpensesBarChart;
