import React, { useState, useEffect } from "react"
import ConquestMapGallery from "../features/conquest-maps/components/ConquestMapGallery"
import SidebarGeneric from "@components/SidebarGeneric"
import { Grid } from "@mui/material"
import SectionHeader from "@components/Typography/SectionHeader"
import Skeleton from "@mui/material/Skeleton"
import { CapacitorHttp } from "@capacitor/core"

function ConquestMapsPage() {
  const [data, setData] = useState("")
  const [loadingData, setLoadingData] = useState(true)

  const getData = async () => {
    setLoadingData(true)
    let options = {
      url: "https://content.showzone.io/wp-json/wp/v2/conquest?per_page=99",
    }
    const response = await CapacitorHttp.request({ ...options, method: "GET" })
    setData(response.data)
    setLoadingData(false)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <SectionHeader
        smallText="MLB The Show"
        title="Conquest Maps"
        breadcrumbsItems={[
          { name: "Homeplate", href: "/" },
          { name: "Conquest Maps" },
        ]}
      />
      <Grid container spacing={12} justifyContent="space-between">
        <Grid sx={{ maxWidth: "100%", width: "calc(100% - 350px)" }} item xs>
          {loadingData ? (
            <Skeleton
              animation="wave"
              variant="rectangular"
              width={"100%"}
              height={300}
            />
          ) : (
            <ConquestMapGallery conquestMaps={data} />
          )}
        </Grid>
        <SidebarGeneric />
      </Grid>
    </>
  )
}

export default ConquestMapsPage
