import React, { useState, useEffect } from "react";
import "./App.css";
import Stats from "./components/Stats";
import Sort from "./components/Sort";
import Projects from "./components/Projects.jsx";

function App() {
  const [allProjects, setAllProjects] = useState();
  const [projectsToShow, setProjectsToShow] = useState();
  const [singleProject, setSingleProject] = useState();

  useEffect(() => {
    fetch("http://localhost:3030/projects", {
      method: "GET",
    })
      .then(data => data.json())
      .then(data => {
        setAllProjects(data);
        setProjectsToShow(data);
      })
      .catch(e => console.log(e));
  }, [setAllProjects, setProjectsToShow]);

  console.log(projectsToShow);
  /// API CALLS

  function getAProject(idOrName) {
    fetch(`http://localhost:3030/projects/${idOrName}`, {
      method: "GET",
    })
      .then(data => data.json())
      .then(data => setProjectsToShow(data))
      .catch(e => console.log(e));
  }

  const getProjectName = projectInput => {
    console.log(projectInput);
    setSingleProject(projectInput);
  };

  const getSingleProject = () => getAProject(singleProject);

  // function getAllProjectsByType(type) {
  //   const response = fetch(`http://localhost:3030/projects?type=${type}`, {
  //     method: "GET",
  //   })
  //     .then(data => data.json())
  //     .then(data => {
  //       setProjectsToShow(data);

  //       return data;
  //     })
  //     .catch(e => console.log(e));
  //   return response;
  // }

  // function getByRequirement(req) {
  //   const response = fetch(
  //     `http://localhost:3030/projects?requirement=${req}`,
  //     {
  //       method: "GET",
  //     }
  //   )
  //     .then(data => data.json())
  //     .then(data => {
  //       setProjectsToShow(data);

  //       return data;
  //     })
  //     .catch(e => console.log(e));
  //   return response;
  // }
  return (
    <div className="App">
      <h1>SOLO API</h1>
      {allProjects
        ? [
            <Stats allProjects={allProjects} />,
            <Sort
              allProjects={allProjects}
              getProjectName={getProjectName}
              getSingleProject={getSingleProject}
            />,
          ]
        : null}
      {projectsToShow ? <Projects projectsToShow={projectsToShow} /> : null}
    </div>
  );
}

export default App;
