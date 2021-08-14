import React, { useMemo, useState, useCallback } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import RecruitHeader from './RecruitHeader';
import { data, courseLists, columnDatas } from './CandidatesInfo';
import RecruitPanel from './RecruitPanel';
import './App.css';


function RecruitDashboard() {
  const [candidateData, setCandidateData] = useState(data);
  const [loading, setLoading] = useState(false);
  const [tabName, setTabName] = useState('all');
  const courseList = useMemo(() => courseLists, []);
  const [selectedCourse, setselectedCourse] = useState('');
  const [columnData, setColumnData] = useState(columnDatas);
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = useCallback((value) => {
    setSearchValue(value);
  }, []);

  const searchFilter = (searchList) => {
    if (searchValue) {
      const registeredCandidates = searchList.registeredCandidates.filter(
        (item) => item.name.toLowerCase().includes(searchValue.toLowerCase()),
      );
      const technicalRound = searchList.technicalRound.filter(
        (item) => item.name.toLowerCase().includes(searchValue.toLowerCase()),
      );
      const hrRound = searchList.hrRound.filter(
        (item) => item.name.toLowerCase().includes(searchValue.toLowerCase()),
      );
      const selectedCandidates = searchList.selectedCandidates.filter(
        (item) => item.name.toLowerCase().includes(searchValue.toLowerCase()),
      );
      return {
        registeredCandidates,
        technicalRound,
        hrRound,
        selectedCandidates,
      };
    }
    return { ...searchList };
  };

  const handleAll = useCallback((name) => {
    setTabName(name);
    setselectedCourse('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 400);
  }, []);

  const filteredCandidates = () => {
    if (selectedCourse) {
      const registeredCandidates = candidateData.registeredCandidates.filter(
        (item) => item.course === selectedCourse,
      );
      const technicalRound = candidateData.technicalRound.filter(
        (item) => item.course === selectedCourse,
      );
      const hrRound = candidateData.hrRound.filter(
        (item) => item.course === selectedCourse,
      );
      const selectedCandidates = candidateData.selectedCandidates.filter(
        (item) => item.course === selectedCourse,
      );
      setLoading(true);
      setTimeout(() => {
      setLoading(false);
    }, 400);
      return {
        registeredCandidates,
        technicalRound,
        hrRound,
        selectedCandidates,
      };
    }
    return { ...candidateData };
  };

  const handleCourse = useCallback((e, obj) => {
    setselectedCourse(obj.value);
    setTabName('position');
  }, []);

  const handleReset = useCallback((name) => {
    setLoading(true);
    setTabName(name);
    setTimeout(() => {
      setLoading(false);
    }, 400);
    setCandidateData(data)
  }, []);

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);
    destClone.splice(droppableDestination.index, 0, removed);
    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;
    return result;
  };

  const handleDrag = (result) => {
    const { type } = result;
    const { source, destination } = result;
    if (type === 'column-dragging') {
      if (!destination) {
        return;
      }
      const draggingList = reorder(
        columnData,
        source.index,
        destination.index,
      );
      setColumnData(draggingList);
    } else if (type === 'row-dragging') {
      let draggingdata = {};
      if (!destination) {
        return;
      }
      if (source.droppableId === destination.droppableId) {
        const items = reorder(
          candidateData[source.droppableId],
          source.index,
          destination.index,
        );
        draggingdata = { ...candidateData, [source.droppableId]: items };
      } else {
        const results = move(
          candidateData[source.droppableId],
          candidateData[destination.droppableId],
          source,
          destination,
        );
        draggingdata = {
          ...candidateData,
          [source.droppableId]: results[source.droppableId],
          [destination.droppableId]: results[destination.droppableId],
        };
      }
      setCandidateData(draggingdata);
    }
  };

  let filteredList = useMemo(filteredCandidates, [selectedCourse, candidateData]);
  filteredList = useMemo(() => searchFilter(filteredList), [searchValue, filteredList]);
  return (
    <div className="recruit-container">
      <div className="recruit-header">
      <RecruitHeader
        handleReset={handleReset}
        courseList={courseList}
        selectedCourse={selectedCourse}
        handleCourse={handleCourse}
        handleAll={handleAll}
        handleSearch={handleSearch}
        tabName={tabName}
      />
      </div>
      <DragDropContext onDragEnd={handleDrag}>
        <RecruitPanel
          columnData={columnData}
          filteredList={filteredList}
          loading={loading}
        />
      </DragDropContext>
    </div>
  );
}

export default RecruitDashboard;