import Chip from "@mui/material/Chip"
import useAuth from "@useAuth"
import PageHeader from "@components/PageHeader/PageHeader"
import React from "react"

const breadcrumbsItems = [
  { name: "Homeplate", href: "/" },
  { name: "Exchanges", href: "" },
  { name: "Players" },
]

const ExchangesPlayersPageHeader = () => {
  const { currentUserIsGoldPlus } = useAuth()
  return (
    <>
      <PageHeader includeShareButton breadcrumbsItems={breadcrumbsItems}>
        Exchanges: Players{" "}
        {currentUserIsGoldPlus ? <Chip label="Pro" sx={{marginLeft: "1rem"}} color="primary" size="small" /> : ""}
      </PageHeader>
    </>
  )
}

export default ExchangesPlayersPageHeader
