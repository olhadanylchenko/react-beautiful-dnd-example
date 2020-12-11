import React, { useState } from "react";
import ReactDOM from "react-dom";
import initialData from "./initial-data";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Version from "./Version";

const App = () => {
  const [assets] = useState(initialData.assets);
  const [versions, setVersions] = useState(initialData.versions);
  const [versionOrder, setVersionOrder] = useState(initialData.versionOrder);
  const [editing, setEditing] = useState(false);

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "assets") {
      const sourceVersion = versions[source.droppableId];
      const destinationVersion = versions[destination.droppableId];

      if (sourceVersion === destinationVersion) {
        const newSourceAssets = [...sourceVersion.assetIds];
        newSourceAssets.splice(source.index, 1);
        newSourceAssets.splice(destination.index, 0, draggableId);

        const newSourceVersion = {
          ...sourceVersion,
          assetIds: newSourceAssets,
        };
        setVersions({ ...versions, [source.droppableId]: newSourceVersion });
      } else {
        const newSourceAssets = [...sourceVersion.assetIds];
        const newDestinationAssets = [...destinationVersion.assetIds];

        newSourceAssets.splice(source.index, 1);
        newDestinationAssets.splice(destination.index, 0, draggableId);

        const newSourceVersion = {
          ...sourceVersion,
          assetIds: newSourceAssets,
        };
        const newDestinationVersion = {
          ...destinationVersion,
          assetIds: newDestinationAssets,
        };
        setVersions({
          ...versions,
          [source.droppableId]: newSourceVersion,
          [destination.droppableId]: newDestinationVersion,
        });
      }
    }
    if (type === "versions") {
      const newVersionOrder = [...versionOrder];

      newVersionOrder.splice(source.index, 1);
      newVersionOrder.splice(destination.index, 0, draggableId);

      setVersionOrder(newVersionOrder);
    }
  };

  const handleEditClick = () => {
    setEditing(!editing);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <button onClick={handleEditClick}>Edit Assets</button>

      <Droppable
        droppableId="all-versions"
        type="versions"
        isDropDisabled={editing}
      >
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {versionOrder.map((versionId, index) => {
              const version = versions[versionId];
              const versionAssets = version.assetIds.map(
                (assetId) => assets[assetId]
              );
              return (
                <Version
                  key={version.id}
                  version={version}
                  assets={versionAssets}
                  index={index}
                  editing={editing}
                />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
