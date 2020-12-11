import React from "react";
import Asset from "./Asset";
import styled from "styled-components";
import { Droppable, Draggable } from "react-beautiful-dnd";

const AssetsContainer = styled.div`
  padding: 1rem;
  border: 2px solid black;
  display: flex;
  flex-direction: row;
`;

export default function Version(props) {
  return (
    <Draggable
      key={props.version.id}
      draggableId={props.version.id}
      index={props.index}
      isDragDisabled={props.editing}
    >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <h2>{props.version.title}</h2>
          <Droppable
            droppableId={props.version.id}
            direction="horizontal"
            type="assets"
            isDropDisabled={!props.editing}
          >
            {(provided) => (
              <AssetsContainer
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {props.assets.map(
                  (asset, index) =>
                    asset && (
                      <Asset
                        key={asset.id}
                        asset={asset}
                        index={index}
                        editing={props.editing}
                      />
                    )
                )}
                {provided.placeholder}
              </AssetsContainer>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}
