import dynamic from "next/dynamic"

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false })

function Line({ series, title, labels }) {
  const options = {
    chart: {
      height: 350,
      type: "line",
      background: "#1c1c1c",
      zoom: {
        type: "x",
        enabled: true,
        autoScaleYaxis: true,
      },
      events: {
        mounted: chart => {
          chart.windowResizeHandler()
        },
        zoomed: chart => {
          chart.windowResizeHandler()
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    grid: {
      show: true,
      borderColor: "#292929",
    },
    markers: {
      size: 3,
      fillOpacity: 0,
      strokeOpacity: 0.75,
      strokeColors: "#ed2024",
    },
    xaxis: {
      categories: labels.reverse(),
      labels: {
        show: true,
        showDuplicates: false,
        hideOverlappingLabels: true,
        rotate: 0,
      },
      axisBorder: { show: true },
      axisTicks: { show: false },
    },
    theme: {
      mode: "dark",
      palette: "palette1",
      monochrome: {
        enabled: true,
        color: "#ed2024",
        shadeTo: "light",
        shadeIntensity: 0.65,
      },
    },
  }
  return <Chart type="line" options={options} series={series} height={350} />
}

export default Line
