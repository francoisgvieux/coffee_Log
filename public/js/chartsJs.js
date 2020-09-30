let ratio;
let dates;

const getRatioData = () =>
  axios.get("/dashboard/api/ratioData").then((result) => {
    console.log(result.data.datesData);
    return result.data;
  });

  chartRatioSatisfaction();

async function chartRatioSatisfaction() {
  let result = await getRatioData();
  let date = result.datesData;
  let ratio = result.ratioData;
  let rates = result.ratesData;
  console.log(ratio, date);
  const ctx = document.getElementById("myChart").getContext("2d");
  const ratioAndSatisfactionChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: date,
      datasets: [
        {
          label: "coffee/water ratio in %",
          yAxisID: "A",
          data: ratio,
          backgroundColor: ["rgba(241,197,63, 0.2)"],
          borderColor: ["rgba(241,197,63, 1)"],
          borderWidth: 1,
        },
        {
          label: "satisfaction on a 5points scale",
          data: rates,
          yAxisID: "B",
          fill: false,
          borderColor: ["rgba(255,62,47, 1)"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "Coffee/water ratio and satisfaction for each of your logs",
      },
      legend: {
        display: true,
        position: "bottom",
      },
      scales: {
        yAxes: [
          {
            gridLines: {
              display: false,
            },
            id: "A",
            type: "linear",
            position: "left",
            ticks: {
              max: 40,
              min: 0,
              stepSize: 10,
            },
          },
          {
            gridLines: {
              display: false,
            },
            id: "B",
            type: "linear",
            position: "right",
            ticks: {
              max: 5,
              min: 0,
              stepSize: 1,
            },
          },
        ],
      },
    },
  });
}
