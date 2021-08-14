import React, { useCallback } from 'react';
import {
  Button, Icon, Dropdown, Input, Header,
} from 'semantic-ui-react';

function RecruitHeader(props) {
  const {
    handleReset,
    courseList, selectedCourse, handleCourse, handleAll, handleSearch, tabName,
  } = props;
  const handleCourseCallback = useCallback((e, obj) => handleCourse(e, obj), []);
  return (
    <>
      <div className="header-container">
        <div className="left-header">
          <Header as='h3' className="header-text">Recruiter Dashboard</Header>
          <Button className={`indicator ${tabName === 'all'}`} onClick={() => handleAll('all')}>View All</Button>
          <Dropdown
            button
            className={`indicator icon ${tabName === 'position'}`}
            labeled
            icon="filter"
            options={courseList}
            onChange={handleCourseCallback}
            value={selectedCourse}
            placeholder="FILTER BY COURSE"
          />
          <Button className={`indicator ${tabName === 'recent'}`} onClick={() => handleReset('recent')}><Icon name='sync' /> Reset All</Button>
        </div>
        <div className="right-header">
          <Input type="text" className="search" icon='search' placeholder="Search by name" onChange={(e) => handleSearch(e.target.value)} />
          <Button>
            <Icon className="setting" />
            Configurations
          </Button>
          <Button circular icon='angle left' />
          <div className="page-count">( 0 - 30 )</div>
          <Button circular icon="angle right" />
        </div>
      </div>
    </>
  );
}

export default React.memo(RecruitHeader);