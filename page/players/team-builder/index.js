import TeamBuilder from "../../../features/team-builder/components/TeamBuilder"
import PageTemplate from "../../../features/team-builder/components/PageTemplate"
import SectionHeader from "@components/Typography/SectionHeader"
import MuiAccordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import Typography from "@mui/material/Typography"
import { styled, spacing } from "@mui/system"

const Accordion = styled(MuiAccordion)`
  border-top: 3px solid ${props => props.theme.palette.primary.main};
  margin-bottom: 1rem;
  padding: 0.5rem;
`

function TeamBuilderPage() {
  return (
    <>
      <SectionHeader
        smallText="MLB The Show"
        title="Team Builder"
        breadcrumbsItems={[
          { name: "Homeplate", href: "/" },
          { name: "Players", href: "/players" },
          { name: "Team Builder" },
        ]}
      />
      <PageTemplate
        title="MLB The Show 22: Team Builder - ShowZone"
        description="Use our Player Database to build your MLB The Show dream team."
      >
        <Accordion className="table-helper" sx={{ marginBottom: "1rem" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="h5" component="p">How to Use the Team Builder</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography component="p" paragraph>
              There are two ways to build teams - manually or using the
              &quot;generate&quot; option.
            </Typography>
            <Typography component="h4">
              <strong>Manual</strong>
            </Typography>
            <Typography component="p" paragraph>
              Simply select the position you wish to fill and search for the
              player you would like to place there (you will only see players
              who are eligible to play that position). You can use the
              &quot;Filter&quot; button to narrow down the types of players you
              see in your search.
            </Typography>
            <Typography component="h4">
              <strong>Generate (Pro Only)</strong>
            </Typography>
            <Typography component="p" paragraph>
              If you wish to apply specific filters to your generated roster,
              use the &quot;Filters&quot; button and apply the filters of your
              choice. Note, this step is optional.
            </Typography>
            <Typography component="p" paragraph>
              Next, go to the &quot;Generate&quot; button and apply the
              constraints you want your generated roster to fall within. You can
              also set &quot;Objectives&quot; to optimize hitters, starting
              pitchers or relief pitchers for specific attributes.
            </Typography>
            <Typography component="p" paragraph>
              Press the &quot;Generate Roster&quot; button and wait a view
              seconds for your roster to be created.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <TeamBuilder />
      </PageTemplate>
    </>
  )
}

export default TeamBuilderPage
