import React, { useState, useEffect } from "react"
import QuirksArchive from "../../features/quirks/components/QuirksArchive"
import Grid from "@mui/material/Grid"
import SidebarGeneric from "@components/SidebarGeneric"
import SectionHeader from "@components/Typography/SectionHeader"
import { CapacitorHttp } from "@capacitor/core"
import Skeleton from "@mui/material/Skeleton"

function QuirksPage() {
  const [quirks, setQuirks] = useState("")
  const [loadingQuirks, setLoadingQuirks] = useState(false)

  const getQuirks = async () => {
    setLoadingQuirks(true)
    let options = {
      url: "https://content.showzone.io/wp-json/wp/v2/quirks?_embed&per_page=100&order=asc&orderby=title",
    }
    const response = await CapacitorHttp.request({ ...options, method: "GET" })
    setQuirks(response.data)
    setLoadingQuirks(false)
  }

  useEffect(() => {
    getQuirks()
  }, [])

  return (
    <>
      <SectionHeader
        smallText="MLB The Show"
        title="Player Quirks"
        breadcrumbsItems={[
          { name: "Homeplate", href: "/" },
          { name: "Players", href: "/players" },
          { name: "Quirks" },
        ]}
      />
      <Grid container spacing={12} justifyContent="space-between">
        <Grid sx={{ maxWidth: "100%", width: "calc(100% - 350px)" }} item xs>  
          {loadingQuirks ? (
            <Skeleton
              animation="wave"
              variant="rectangular"
              width={"100%"}
              height={300}
            />
          ) : (
            <QuirksArchive quirks={quirks} />
          )}
        </Grid>
        <SidebarGeneric />
      </Grid>
    </>
  )
}

export default QuirksPage
