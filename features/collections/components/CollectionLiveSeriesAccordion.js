import { styled } from "@mui/system"
import {
  Accordion as MuiAccordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

import Link from "@components/OurLink"

const Accordion = styled(MuiAccordion)`
  margin-bottom: 1rem;
  padding: 0.5rem;
`

const CollectionLiveSeriesAccordion = () => (
  <Accordion className="table-helper">
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1a-content"
      id="panel1a-header"
    >
      <Typography>Live Series Collection Information</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography component="p" paragraph>
        This collection involves collecting all Live Series players for all 30
        teams. You will gain rewards as you unlock each team, division and
        league.
      </Typography>
      <Typography component="p" paragraph>
        In the table below, you can see the current costs for each team plus the
        costs for each team summed for their division, league, or entire MLB.
        The "buy" cost indicated is for if you put in buy orders and the "sell"
        cost indicated is if you used the "buy now" feature to buy all the cards
        immediately in the game.
      </Typography>
      <Typography component="p" paragraph>
        <span>Primary Reward:</span>{" "}
        <Link href="/players/d68887eb62ebc7bafb5ad892919b44e2">
          99 Awards Chipper Jones
        </Link>
        <br />
        <span>Additional Rewards:</span>{" "}
        <Link href="/players/c4a6424fad3db0bab7b55785a0c6680d">
          99 Signature David Ortiz
        </Link>
        ,{" "}
        <Link href="/players/d56986c0fd21a33eec7f23d2082308cb">
          99 Milestone Alfonso Soriano
        </Link>
      </Typography>
    </AccordionDetails>
  </Accordion>
)

export default CollectionLiveSeriesAccordion
