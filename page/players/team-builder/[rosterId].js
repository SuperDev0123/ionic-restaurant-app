import TeamBuilderSaved from "../../../features/team-builder/components/TeamBuilder/TeamBuilderSaved"
import PageTemplate from "../../../features/team-builder/components/PageTemplate"

const breadcrumbsItems = [
  { name: "Homeplate", href: "/" },
  { name: "Team Builder" },
]

function SavedRoster({data, isMeta}) {
  if(data.roster_name) {
    if(isMeta) {
      data.name = data.roster_name + ' Meta Overall'
    } else {
      data.name = data.roster_name + ' True Overall'
    }
    data.user_name = "Showzone.io"
  }
  return (
    <PageTemplate
      title={`MLB The Show 22: Team Builder - ${data.name}`}
      description="Use our Player Database to build your MLB The Show dream team."
      breadcrumbsItems={breadcrumbsItems}
      breadcrumbsText="MLB The Show 22: Team Builder"
    >
      <TeamBuilderSaved data={data} />
    </PageTemplate>
  )
}

export default SavedRoster;

export async function getServerSideProps({ params: { rosterId } }) {
  if(parseInt(rosterId)) {
    const rosterData = await fetch(
      `https://showzone-api-dev.onrender.com/api/user-saved-roster/${rosterId}`
    )
    const data = await rosterData.json()
    const isMeta = false
    return { props: { data, isMeta } }
  } else {
    const rosterData = await fetch(
      `https://showzone-api-dev.onrender.com/api/team-builder-theme-teams/${rosterId}/`
    )
    const data = await rosterData.json()
      let isMeta = false
      if(rosterId.search('meta') > -1) {
        isMeta = true
      } 

    return { props: { data, isMeta } }
  }
}
