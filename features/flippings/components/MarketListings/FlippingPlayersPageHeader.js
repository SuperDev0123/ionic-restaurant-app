import Chip from "@mui/material/Chip"
import useAuth from "@useAuth"
import PageHeader from "@components/PageHeader/PageHeader"
import React, { useState } from "react"

const breadcrumbsItems = [
  { name: "Homeplate", href: "/" },
  { name: "Flipping" },
]

const FlippingPlayersPageHeader = () => {
  const { currentUserIsGoldPlus } = useAuth()
  return (
    <>
      <PageHeader includeShareButton breadcrumbsItems={breadcrumbsItems}>
        Flipping
        {currentUserIsGoldPlus ? <Chip label="Pro" sx={{marginLeft: "1rem"}} color="primary" size="small" /> : ""}
      </PageHeader>
    </>
  )
}

export default FlippingPlayersPageHeader
