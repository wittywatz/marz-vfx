import React from "react";
import { DraggableProvided, Droppable, Draggable } from "react-beautiful-dnd";
import { DraggableListProps } from "../interfaces";
import DraggableItem from "../DraggableItem/DraggableItem";

export const DraggableList = <T extends { id: number }>({
  ID,
  loading,
  listTitle,
  items,
  processItem,
}: DraggableListProps<T>) => (
  <Droppable droppableId={ID}>
    {(provided) => (
      <div
        ref={provided.innerRef}
        className="bg-neutral-500 p-4 flex flex-col w-full"
        data-testid={`droppable-container-${ID}`}
      >
        <h5
          className="font-bold text-white items-center justify-center mx-auto pb-3"
          data-testid={`droppable-title-${ID}`}
        >
          {listTitle}
        </h5>
        {items.length > 0 &&
          items.map((item, index) => (
            <Draggable key={item.id} draggableId={`${item.id}`} index={index}>
              {(provided: DraggableProvided) => (
                <DraggableItem<T>
                  item={item}
                  loading={loading}
                  draggableProvided={provided}
                  processItem={processItem}
                />
              )}
            </Draggable>
          ))}
        {provided.placeholder}
      </div>
    )}
  </Droppable>
);

export default DraggableList;
