import { useState } from "react"
import Button from "@mui/material/Button"

import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import TierItems from "@features/tier-builder/TierItems"
import { Grid, Tier } from "./styledComponents";
import { DragAndDropUtil } from "./utils/DragAndDropUtil";

const getListStyle = (isDraggingOver, isEmpty) => {

  return {
      background: isDraggingOver ? "rgba(255,255,255,0.1)" : "",
      display: "flex",
      flex: 1,
      width: '100%',
      overflow: "auto",
      minHeight: "238px"
  }
};

const tierNames = ["Pool", "S", "A", "B", "C", "D", "F"];
const tierColors = [
  "normal",
  "red",
  "orange",
  "orange-yellow",
  "yellow",
  "yellow-green",
  "green",
];

function AllTiers({
  setSelectedCardIndex,
  setTierIndex,
  setTiersData,
  tiersData,
  handleOpenModal,
}) {

  function onDragEnd(result) {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) return;

    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = DragAndDropUtil.reorder(tiersData[sInd], source.index, destination.index);
      const newTiersData = [...tiersData];
      newTiersData[sInd] = items;
      setTiersData(newTiersData);
    } else {
      const result = DragAndDropUtil.move(tiersData[sInd], tiersData[dInd], source, destination);
      const newTiersData = [...tiersData];
      newTiersData[sInd] = result[sInd];
      newTiersData[dInd] = result[dInd];
      
      setTiersData(newTiersData);
    }
  }

  const handleAddCardClick = (tierIndex) => {
    const tierLength = tiersData[tierIndex].length;

    setSelectedCardIndex(tierLength)
    setTierIndex(tierIndex)

    handleOpenModal()
  }

  const handleCardClick = ({ tierIndex, cardIndex }) => {
    setSelectedCardIndex(cardIndex)
    setTierIndex(tierIndex)
    handleOpenModal()
  }

  return (
    <DragDropContext onDragEnd={onDragEnd} direction="horizontal">
      {tierNames.map((tierName, index) => (
        <Grid container spacing={2}>
          <Grid item xs={0.5}>
            <Tier className={tierColors[index]}>{tierName}</Tier>
          </Grid>
          <Grid item xs={11.5}>
            <Droppable
              key={index}
              droppableId={`${index}`}
              direction="horizontal"
            >
              {(provided, snapshot) => (
                <div
                  data-ref-name="Droppable"
                  ref={provided.innerRef}
                  style={getListStyle(
                    snapshot.isDraggingOver,
                    index === tiersData.length - 1
                  )}
                >
                  <TierItems
                    tierIndex={index}
                    items={tiersData[index]}
                    handleCardClick={handleCardClick}
                  />
                  {provided.placeholder}
                  <Button onClick={() => handleAddCardClick(index)}>Add Card</Button>
                </div>
              )}
            </Droppable>
          </Grid>
        </Grid>
      ))}
    </DragDropContext>
  )
}

export default AllTiers
