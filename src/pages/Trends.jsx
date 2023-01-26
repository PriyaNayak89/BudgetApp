import React from "react";

import { CChart } from "@coreui/react-chartjs";
import { Page } from "../components/Page.jsx";
function Trends() {
  const options = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Travel Transactions",
        backgroundColor: "rgba(220, 220, 220, 0.2)",
        borderColor: "rgba(220, 220, 220, 1)",
        pointBackgroundColor: "rgba(220, 220, 220, 1)",
        pointBorderColor: "#fff",
        data: [20000, 10000, 30000, 5000, 20000, 15000, 12000],
      },
      {
        label: "Salary",
        backgroundColor: "rgba(151, 187, 205, 0.2)",
        borderColor: "rgba(151, 187, 205, 1)",
        pointBackgroundColor: "rgba(151, 187, 205, 1)",
        pointBorderColor: "#fff",
        data: [70000, 80000, 90000, 60000, 20000, 78000, 80000],
      },
    ],
  };

  return (
    <Page>
      <CChart type="line" data={options}></CChart>
    </Page>
  );
}

export default Trends;
