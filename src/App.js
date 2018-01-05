import React, { Fragment } from 'react';
import logo from './logo.svg';
import './App.css';

const App = props => {
      const projects = [{'name':'KANBANF'}, {'name':'BOARDGAME 1'}, {'name':'BOARDGAME 2'}];
      return (<Fragment>
        <h1 id="title">KANBAN</h1>
        <Projects projects={projects}/>
      </Fragment>);
    };

const Projects = props => {
  const projects = props.projects;
  const projItems = projects.map((project) => 
            <Project key={project.name} name={project.name} /> 
      );
  return (<div id="projects">
     {projItems}
     <Project name='+' />
  </div>);
  };

const Project = props => {
    if (props.name === '+') {
      return <div className="project" id="add-project">+</div>;
    } else {
      return <div className="project">{props.name}</div>;
    }
  };

export default App;
