import React, { Fragment } from 'react';
import logo from './logo.svg';
import './App.css';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {'projects': [], 'loading': true};
  }

  render() {
       return (<Fragment>
        <h1 id="title">KANBAN</h1>
        <Projects projects={this.state.projects} loading={this.state.loading}/>
      </Fragment>);   
  }

  componentDidMount() {
    /*test slow connection to back-end*/
    sleep(1000).then(() => {
    const data = fetch("/projects/").then(response => response.json()
                                   ).then(data =>  this.setState({'projects': data.projects, 'loading': false}))
    });
  }
}

const Projects = props => {
  const projects = props.projects;
  const projLoading = <Project name='Loading...'/> 
  const projItems = projects.map((project) => 
            <Project key={project.name} name={project.name} /> 
      );
  if (props.loading) {
    return (<div id="projects">
       {projLoading}
       <Project name='+' />
    </div>);
    } else {
    return (<div id="projects">
       {projItems}
       <Project name='+' />
    </div>);
  }
}

const Project = props => {
      switch (props.name) {
         case '+':
           return <div className="project" id="add-project">+</div>;
           break;
         case 'Loading...':
           return <div className="project" id="loading-project">Loading...</div>;
           break;
         default:
           return <div className="project">{props.name}</div>;
    }
}

export default App;
