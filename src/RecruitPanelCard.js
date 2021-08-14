import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import Scrollbars from 'react-custom-scrollbars';
import { Placeholder } from 'semantic-ui-react';

function RecruitPanelCard(props) {
  const { header, filteredList, loading } = props;
  const holderLength = [1, 2, 3, 4, 5, 6];
  const card = React.useMemo(() => (
    filteredList[header.id] ? filteredList[header.id].map((data, index) => (
      <Draggable key={data.id} draggableId={data.id} index={index}>
        {(provided) => (
          <div
            className={`rounds-card ${data.cgpa >= 7 ? "eligable" : "not-eligable"}`}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            key={index + 1}
          >
            <div className="row-id-btn">
              <span className="id">{data.id}</span>
              <button className="btn">View Profile</button>
            </div>
            <div className="name">Candidate Name : {data.name}</div>
            <div className="valid">Course : {data.course}</div>
            <div className="valid">CGPA : {data.cgpa}</div>
            <div className="detail">Email Id : {data.emailId}</div>
            <div className="detail">Mobile Number : {data.mobileNo}</div>
            <div className="detail">Date of Birth : {data.dob}</div>
          </div>
        )}
      </Draggable>
    )) : []), [filteredList[header.id]]);
  return (
    <Droppable droppableId={header.id} type="row-dragging">
      {(rowProvided) => (
        <div ref={rowProvided.innerRef}>
          <Scrollbars style={{ height: 515 }}>
            {!loading ? card
              : holderLength.map((a) => (
                <div className="rounds-card" key={a}>
                  <Placeholder>
                    <Placeholder.Header image>
                      <Placeholder.Line />
                      <Placeholder.Line />
                    </Placeholder.Header>
                    <Placeholder.Paragraph>
                      <Placeholder.Line length="medium" />
                      <Placeholder.Line length="short" />
                    </Placeholder.Paragraph>
                  </Placeholder>
                </div>
              ))}
          </Scrollbars>
          {rowProvided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default React.memo(RecruitPanelCard);