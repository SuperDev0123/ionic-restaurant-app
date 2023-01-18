import { spacing, styled } from "@mui/system"
import { Chart as ChartJS } from 'chart.js/auto'
import { Line } from "react-chartjs-2"
import {
  Card as MuiCard,
  CardContent,
  Typography as MuiTypography,
} from "@mui/material"
 
const Card = styled(MuiCard)(spacing)
const Spacer = styled("div")(spacing)
const Typography = styled(MuiTypography)(spacing)
const StatRow = styled("div")`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-bottom: 1rem;
`
const StatBox = styled("div")`
  min-width: 70px;
  font-weight: bold;
  color: #fff;
  background: #c90000;
  text-align: center;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
`

const MarketData = props => {
  let labels = props.player?.marketlisting?.price_history.map(function (e) {
    return e.date
  })
  let best_buy_price = props.player?.marketlisting?.price_history.map(function (
    e
  ) {
    return e.best_buy_price
  })
  let best_sell_price = props.player?.marketlisting?.price_history.map(
    function (e) {
      return e.best_sell_price
    }
  )
  const data = {
    labels: labels.reverse(),
    datasets: [
      {
        label: "Best Buy Price",
        data: best_buy_price.reverse(),
        backgroundColor: "#ed2024",
        borderColor: "#ed2024",
        barPercentage: 1,
        categoryPercentage: 1,
      },
      {
        label: "Best Sell Price",
        data: best_sell_price.reverse(),
        backgroundColor: "#fff",
        borderColor: "#fff",
        barPercentage: 1,
        categoryPercentage: 1,
      },
    ],
  }

  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Market Data
        </Typography>
        <Spacer mb={6} />
        <StatRow>
          <StatBox>
            <Typography className="stat-title" component="p">
              BEST BUY
            </Typography>
            <Typography variant="h6" component="p">
              {props.player?.marketlisting?.best_buy_price.toLocaleString() ?? ""}
            </Typography>
          </StatBox>
          <StatBox>
            <Typography className="stat-title" component="p">
              BEST SELL
            </Typography>
            <Typography variant="h6" component="p">
              {props.player?.marketlisting?.best_sell_price.toLocaleString() ?? ""}
            </Typography>
          </StatBox>
          <StatBox>
            <Typography className="stat-title" component="p">
              SALES/MIN
            </Typography>
            <Typography variant="h6" component="p">
              {props.player?.marketlisting?.sales_minute.toLocaleString() ?? ""}
            </Typography>
          </StatBox>
          <StatBox>
            <Typography className="stat-title" component="p">
              PROFIT/MIN
            </Typography>
            <Typography variant="h6" component="p">
              {props.player?.marketlisting?.profit_minute.toLocaleString() ?? ""}
            </Typography>
          </StatBox>
        </StatRow>
        <Line
          data={data}
          width={400}
          height={200}
          style={{maxWidth: "100%"}}
          options={{
            maintainAspectRatio: true,
            plugins: {
                legend: {
                  labels: {
                    color: "#D3D3D3",
                  },
                },
              },
              scales: {
                y: {
                  ticks: {
                    color: "#D3D3D3",
                  },
                },
                x: {
                  ticks: {
                    color: "#D3D3D3",
                  },
                },
              },
          }}
        />
      </CardContent>
    </Card>
  )
}

export default MarketData