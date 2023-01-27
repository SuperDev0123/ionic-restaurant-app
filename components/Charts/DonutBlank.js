import dynamic from "next/dynamic"

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false })

function DonutBlank({ title}) {
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
    labels: ["", ""],
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
              formatter: function () {
                return "0%"
              },
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
    tooltip: {
      enabled: false,
    },
    theme: {
      mode: "dark",
    },
  }
  return <Chart options={options} series={[0, 1]} type="donut" />
}

export default DonutBlank
