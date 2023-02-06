import TeamBuilder from "../../../../features/team-builder/components/TeamBuilder/TeamBuilder"
import useAuth from "@useAuth"
import { useRouter } from "next/router"
import PageTemplate from "../../../../features/team-builder/components/PageTemplate"

const breadcrumbsItems = [
  { name: "Homeplate", href: "/" },
  { name: "Team Builder" },
]

function EditRoster({data}) {
  const { currentUser, userLoaded } = useAuth()
  const router = useRouter();

  if(!userLoaded || data === undefined){
    return (
      <>
        Loading...
      </>
    );
  } else if(currentUser?.uid !== data.user_id) {
    router.push("/players/team-builder/" + data.id);
    return (<></>);
  }

  return (
    <PageTemplate
      title="MLB The Show 22: Edit Roster - ShowZone"
      description="Use our Player Database to build your MLB The Show dream team."
      breadcrumbsItems={breadcrumbsItems}
      breadcrumbsText="MLB The Show 22: Edit Roster"
    >
      <TeamBuilder data={data} />
    </PageTemplate>
  )
}

export default EditRoster;

export async function getServerSideProps({ params: { rosterId } }) {
  const rosterData = await fetch(
    `https://showzone-api-dev.onrender.com/api/user-saved-roster/${rosterId}`
  )
  const data = await rosterData.json()

  return { props: { data } }
}
