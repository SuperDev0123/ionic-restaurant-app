import { styled } from "@mui/system"
import {
  Accordion as MuiAccordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

const CapBuilderHowToUse = () => {
  const Accordion = styled(MuiAccordion)`
    margin-bottom: 1rem;
    padding: 0.5rem;
  `

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>How to Get Your Base Stats</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography paragraph>
            1. Create a new loadout
        </Typography>
        <Typography paragraph>
            2. Don&apos;t add any archetypes, perks, or equipment to your CAP
        </Typography>
        <Typography paragraph>
            3. Go to the circle to the top-right of the archetype selection area that has the overall rating and position label (example: 47 OVR C) and press select.
        </Typography>
        <Typography paragraph>
            4. The attributes shown there are your base attributes.  Press square (on playstation) to toggle to the hitting/pitching attributes respectively.
        </Typography>
      </AccordionDetails>
    </Accordion>
  )
}
export default CapBuilderHowToUse
