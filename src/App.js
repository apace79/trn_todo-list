import React, { Fragment } from 'react';
import logo from './logo.svg';
/*import './App.css';*/

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/* TO-DO, back-end access class
class API {
  getJson(url, ) {
  
  }
}
*/

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {'projects': [], 'loading': true};
    this.onSelectProject = this.onSelectProject.bind(this)
  }

  render() {
       return (<Fragment>
                 <h1 id="title">KANBAN</h1>
                 <Projects projects={this.state.projects} 
                           loading={this.state.loading}
                           onSelectProject={this.onSelectProject} />
               </Fragment>);   
  }

  componentDidMount() {
    /*test slow connection to back-end*/
    sleep(2000).then(() => {fetch("/projects/"
              ).then(response => response.json()
              ).then(data =>  this.setState({'projects': data.projects, 'loading': false}))
    });
  }
  
  onSelectProject(e) {
    const idStr = e.target.dataset.id;
    /* set selected on the project with the right id */
    this.setState(prevState => {
        const selectTarget = (el => {
          if (el.id.toString() === idStr) {
            el.selected = true;
          } else {
            el.selected = false;
          }
          return el;
        });
        const projects = prevState.projects.map(selectTarget);
        return {'projects': projects};
      }
    );
  }
}

const Projects = props => {
  const projects = props.projects;
  const projLoading = <Project name='Loading...'/>;
  const projItems = projects.map((project) => 
            <Project key={project.name} 
                     id={project.id} 
                     name={project.name} 
                     selected={project.selected} 
                     onSelectProject= {props.onSelectProject}/> 
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
           return <div className={classes.join(' ')} 
                       data-id={props.id}  
                       data-selected={props.selected} 
                       onClick={props.onSelectProject}>{props.name}</div>;
    }
}

export default App;