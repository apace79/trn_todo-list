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
    sleep(2000).then(() => {fetch("/projects/").then(response => response.json()
                                              ).then(data =>  this.setState({'projects': data.projects, 'loading': false}))
    });
  }
}

const Projects = props => {
  const projects = props.projects;
  const projLoading = <Project name='Loading...'/>;
  const projItems = projects.map((project) => 
            <Project key={project.name} name={project.name} selected={project.selected} /> 
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

const Spinner = props => (<div className="spinner">
                            <div className="bounce1"></div>
                            <div className="bounce2"></div>
                            <div className="bounce3"></div>
                          </div>
                          );

const AddButton = props => (<div className="circle">
                              <div className="bar horizontal"></div>
                              <div className="bar vertical"></div>
                            </div>
                            );

const Project = props => {
      switch (props.name) {
         case '+':
           return (<div className="project" id="add-project">
                     <AddButton />
                   </div>
                   );
         case 'Loading...':
           return (<div className="project" id="loading-project">
                     <Spinner />
                   </div>
                   );
         default:
           let classes = ['project'];
           if (props.selectedp === 'Y') {
             classes.push('selected')
           }
           return <div className={classes.join(' ')}  data-selected={props.selected} >{props.name}</div>;
    }
}

export default App;