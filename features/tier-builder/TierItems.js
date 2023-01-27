import { Draggable } from 'react-beautiful-dnd';

import PlayerCard from "@components/PlayerCard";

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  
  margin: `0 ${grid}px ${grid}px  0`,
  height: 238,
  width: 168,
  // change background colour if dragging
  background:  `${(isDragging ? "" : "grey")}`,
  border:  `2px ${(isDragging ? "lightgreen" : "transparent")} solid`,

  // styles we need to apply on draggables
  ...draggableStyle
});

function TierItems({
  tierIndex,
  items,
  handleCardClick,
}) {
  return (
    <>
      {items.map((item, index) => (
        <Draggable key={item.id} draggableId={item.id} index={index}>
          {(provided, snapshot) => {
            return (
              <span data-ref-name="Draggable">
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={getItemStyle(
                    snapshot.isDragging,
                    provided.draggableProps.style
                  )}
                  onClick={() => handleCardClick({ tierIndex, cardIndex: index })}
                >
                  {item.player ? (
                    <PlayerCard key={item?.player?.name} data={item?.player} />
                  ) : null}
                </div>
              </span>
            )
          }}
        </Draggable>
      ))}
    </>
  )
}

export default TierItems