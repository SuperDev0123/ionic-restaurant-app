
import React, { useState, useEffect } from "react"
import dynamic from "next/dynamic"

import SidebarGeneric from "@components/SidebarGeneric"
import PlayerSearchModal from "@features/tier-builder/PlayerSearchModal"
import useTableData from "@features/tables/hooks/use-table-data"
import useTableDefinition from "@features/tables/hooks/use-table-definition"
import AllTiers from "@features/tier-builder/AllTiers"
import { Grid, ListHeaderBlock } from "@features/tier-builder/styledComponents"
import { TierBuilderUtil } from "@features/tier-builder/utils/TierBuilderUtil"
import { TierBuilderApi } from "./api/TierBuilderApi"
import useAuth from "@features/auth/hooks/useAuth"
import ActionButtons from "./ActionButtons"
import ListName from "./ListName"
import ListDescription from "./ListDescription"

const FiltersModal = dynamic(
  () => {
    return import("../../components/FiltersModal");
  },
  { ssr: false }
);

const TABLE_DATA_SOURCE_URI = "https://api.showzone.io/api/player-profiles/"

function TierBuilderPage({ tierListData }) {
  const { currentUser, userLoaded } = useAuth()

  const [sidebarHidden, setSidebarHidden] = useState(false)
  const [windowReady, setWindowReady] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const [isPublic, setIsPublic] = useState(true)
  const [name, setName] = useState(tierListData?.name ?? "")
  const [description, setDescription] = useState(tierListData?.description ?? "")
  const [tiersData, setTiersData] = useState(TierBuilderUtil.generateTiersDataArray(tierListData))

  const [openFilters, setOpenFilters] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [selectedCardIndex, setSelectedCardIndex] = useState(null)
  const [tierIndex, setTierIndex] = useState(null)
  
  const { columns, columnsData } = useTableDefinition("players")
  const {
    data,
    count,
    dataFilters,
    isLoading,
    updateDataFilters,
  } = useTableData(TABLE_DATA_SOURCE_URI, {
    game: "MLB The Show 22",
    order_by: "desc playerprofileadvanced__overall_true",
  })

  useEffect(() => {
    setWindowReady(true);
  }, []);

  const handleFilterOpen = () => setOpenFilters(true)
  const handleFilterClose = () => setOpenFilters(false)

  const handleOpenModal = () => setOpenModal(true)
  const handleCloseModal = () => setOpenModal(false)

  const assignCardToSlot = (player) => {
    setTiersData(prevState => {
      prevState[tierIndex][selectedCardIndex] = TierBuilderUtil.generateItemObject({ index: selectedCardIndex, player })

      return prevState;
    })

    handleCloseModal()
  }

  const saveTierList = async () => {
    if (!userLoaded || !currentUser) return

    const params = {
      name,
      description,
      isPublic,
      tiersData,
      tierId: tierListData?.id,
      userId: currentUser.uid,
      userName: currentUser.displayName,
    }

    await TierBuilderApi.save(params);
  }

  return (
    <>
      <FiltersModal
        isOpen={openFilters}
        onClose={handleFilterClose}
        columnsData={columnsData}
        dataFilters={dataFilters}
        updateDataFilters={updateDataFilters}
      />
      <PlayerSearchModal
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        assignCardToSlot={assignCardToSlot}
      />
      <Grid container spacing={12} justifyContent="space-between">
        <Grid sx={{ maxWidth: "100%", width: "calc(100% - 350px)" }} item xs>
          <ListHeaderBlock>
            <div>
              <ListName 
                name={name}
                setName={setName}
              />
              <ListDescription 
                description={description}
                setDescription={setDescription}
              />
            </div>
            <ActionButtons 
              isPublic={isPublic}
              setIsPublic={setIsPublic}
              userLoaded={userLoaded}
              currentUser={currentUser}
              isSaving={isSaving}
              handleFilterOpen={handleFilterOpen}
              save={saveTierList}
            />
          </ListHeaderBlock>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {windowReady ? (
              <AllTiers
                tiersData={tiersData}
                setTiersData={setTiersData}
                setSelectedCardIndex={setSelectedCardIndex}
                setTierIndex={setTierIndex}
                handleOpenModal={handleOpenModal}
              />
            ) : null}
          </div>
        </Grid>
        <SidebarGeneric sidebarHidden={sidebarHidden} />
      </Grid>
    </>
  )
}

export default TierBuilderPage
