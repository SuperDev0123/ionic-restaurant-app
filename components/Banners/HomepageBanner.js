import React from "react"
import { styled, spacing } from "@mui/system"
import Grid from "@mui/material/Grid"
// import MuiButton from "@mui/material/Button"
import Button from "@components/Buttons/Button"
import { withTheme } from "@mui/styles"
import Typewriter from "typewriter-effect"

function HomepageBanner(props) {
  const Styles = styled("div")`
    text-align: center;
    padding: 8rem 0 22rem;
    background: url("./images/baseball-field.png");
    margin-left: calc(-100vw / 2 + 100% / 2);
    margin-right: calc(-100vw / 2 + 100% / 2);
    max-width: 100vw;
    margin-top: -5rem;
    margin-bottom: -20rem;
    h1 {
      text-transform: uppercase;
      font-size: 1.5rem;
      margin: 0;
      line-height: 1;
      ${props => props.theme.breakpoints.up("md")} {
        font-size: 2.5rem;
      }
      span {
        font-size: 2.5rem;
        color: #ed2024;
        ${props => props.theme.breakpoints.up("sm")} {
          font-size: 3rem;
        }
        ${props => props.theme.breakpoints.up("md")} {
          font-size: 5rem;
        }
      }
    }
    h2 {
      text-transform: uppercase;
      font-size: 1rem;
      margin: 1rem 0 3rem;
      ${props => props.theme.breakpoints.up("md")} {
        font-size: 2rem;
      }
    }
  `

  return (
    <Styles>
      <Grid container spacing={20} sx={{padding:".5rem"}}>
        <Grid item xs={12}>
          <h1>
            MLB The Show{" "}
            <Typewriter
              options={{
                strings: [
                  "Player Database.",
                  "Team Builder.",
                  "Flipping.",
                  "Theme Teams.",
                  "Collections.",
                  "Conquest Maps.",
                  "News & Tips.",
                  "Tier Lists.",
                  "Player Reviews."
                ],
                autoStart: true,
                loop: true,
              }}
            />
          </h1>
          <h2>Tools and Resources for MLB The Show Gamers</h2>
          <Button color="white" size="xl" style={{margin: ".25rem"}}>Login <span>&nbsp;Now</span></Button>       
          <Button color="gold" size="xl" style={{margin: ".25rem"}}>Register<span>&nbsp;a Free Account</span></Button>
          <Button size="xl" style={{margin: ".25rem"}}>Get <span>&nbsp;ShowZone&nbsp;</span> Pro</Button>
        </Grid>
      </Grid>
    </Styles>
  )
}

export default HomepageBanner
