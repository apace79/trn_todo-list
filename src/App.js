import React, { Fragment } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {'projects': []};
  }

  render() {
       return (<Fragment>
        <h1 id="title">KANBAN</h1>
        <Projects projects={this.state.projects}/>
      </Fragment>);   
  }

  componentWillMount() {
    const data = fetch("/projects/").then(response => response.json()).then(data => this.setState({'projects': data.projects}))
    /*const projects = fetch("/projects/").then(response => console.log(response))*/   
  }
}

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
