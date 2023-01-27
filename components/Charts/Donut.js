import dynamic from "next/dynamic"

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false })

function Donut({ series, title, labels, totalFormatter }) {
  const options = {
    chart: {
      type: "donut",
      background: "#1c1c1c",
    },
    colors: ["#ed2024", "rgba(255, 255, 255, 0.3)"],
    legend: {
      show: false,
    },
    title: {
      text: title,
      align: "center",
      style: {
        fontSize: "16px",
        fontFamily: "Oswald",
      },
    },
    labels: labels,
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: true,
        },
        donut: {
          labels: {
            show: true,
            value: {
              show: true,
              fontSize: "28px",
              fontFamily: "Oswald",
              offsetY: -2,
            },
            total: {
              showAlways: true,
              show: true,
              label: "",
              formatter: totalFormatter,
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    style: {
      fontSize: "16px",
      fontFamily: "Oswald",
    },
    theme: {
      mode: "dark",
    },
  }
  return <Chart type="donut" options={options} series={series} />
}

export default Donut
