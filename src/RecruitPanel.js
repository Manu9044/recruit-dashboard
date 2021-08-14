import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import RecruitPanelCard from './RecruitPanelCard';

function RecruitPanel(props) {
  const { columnData, filteredList, loading } = props;
  const getheaders = (columnProvided) => columnData.map((header, index) => (
    <Draggable
      draggableId={header.name}
      index={index}
      key={header.name}
    >
      {(provided) => (
        <div
          key={header.id}
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="draggable-column"
        >
          <div className="card-header" {...provided.dragHandleProps}>
            {`${header.text} (${filteredList[header.id] ? filteredList[header.id].length : ''}) `}
          </div>
          <RecruitPanelCard header={header} filteredList={filteredList} loading={loading} />
          {columnProvided.placeholder}
        </div>
      )}
    </Draggable>
  ));
  return (
    <Droppable droppableId="columns" type="column-dragging" direction="horizontal">
      {(columnProvided) => (
        <div
          ref={columnProvided.innerRef}
          {...columnProvided.droppableProps}
          className="droppable-container"
        >
          {getheaders(columnProvided)}
        </div>
      )}
    </Droppable>
  );
}

export default React.memo(RecruitPanel);

