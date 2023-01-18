import Head from "next/head"
import { TeamBuilderContextProvider } from "../../../features/team-builder/contexts/TeamBuilderContext"
import PageHeaderTeamBuilder from "@components/PageHeader/PageHeaderTeamBuilder"
import Grid from "@mui/material/Grid"
import SidebarTeamBuilder from "@components/SidebarGeneric/SidebarTeamBuilder"

function PageTemplate({children, title, description, breadcrumbsItems, breadcrumbsText}) {
  return (
    <TeamBuilderContextProvider>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content={description}
        />
      </Head>
      <Grid container spacing={12} justifyContent="space-between">
        <Grid item xs>
          {children}
        </Grid>
        <SidebarTeamBuilder />
      </Grid>
    </TeamBuilderContextProvider>
  )
}

export default PageTemplate;