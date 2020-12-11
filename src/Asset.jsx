import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const AssetWrapper = styled.div`
  border: 2px solid red;
  background-color: white;
  padding: 1rem;
`;

export default function Asset(props) {
  return (
    <Draggable
      key={props.asset.id}
      draggableId={props.asset.id}
      index={props.index}
      isDragDisabled={!props.editing}
    >
      {(provided, snapshot) => {
        return (
          <AssetWrapper
            index={props.index}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {props.asset.content}
          </AssetWrapper>
        );
      }}
    </Draggable>
  );
}
