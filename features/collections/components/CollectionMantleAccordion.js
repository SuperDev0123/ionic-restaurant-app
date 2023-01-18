import { styled } from "@mui/system"
import Link from "@components/OurLink"
import {
  Accordion as MuiAccordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

const Accordion = styled(MuiAccordion)`
  margin-bottom: 1rem;
  padding: 0.5rem;
`

const CollectionMantleAccordion = () => (
  <Accordion className="table-helper">
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1a-content"
      id="panel1a-header"
    >
      <Typography>Mickey Mantle Collection Information</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography component="p" paragraph>
        This collection involves collecting 19 of 20 possible vouchers, where
        there is one for nearly each type of card. The table below illustrates
        the current low and high cost estimates for each of the 20 vouchers,
        then sums the 19 cheapest into the &apos;Mickey Mantle Collection&apos; row.
      </Typography>
      <Typography component="p" paragraph>
        The &apos;Buy Low&apos; number illustrates the &apos;Buy&apos; price assuming you&apos;ve
        collected all possible non-sellable cards of that type (completed all
        player programs, collections, etc.). The &apos;Buy High&apos; number illustrates
        the &apos;Buy&apos; price assuming you&apos;ve collected the minimum possible
        non-sellable cards of that type (from player programs, collections,
        etc.) and purchased the remaining from the market.
      </Typography>
      <Typography component="p" paragraph>
        The true cost for you as an individual is likely somewhere between these
        two figures and more than likely closer to the &apos;Buy Low&apos; figure, but
        depends on your specific inventory and what programs and collections
        that you have completed.
      </Typography>
      <Typography component="p" paragraph>
        You can see exactly how many stubs and cards YOU need to finish this
        collection by using our{" "}
        <Link href="/inventory">Inventory Tool</Link>!
      </Typography>
    </AccordionDetails>
  </Accordion>
)

export default CollectionMantleAccordion
