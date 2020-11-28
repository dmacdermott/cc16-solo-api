import React, { useState, useEffect } from "react";
import "./App.css";
import Stats from "./components/Stats";
import Sort from "./components/Sort";
import Projects from "./components/Projects.jsx";

function App() {
  const [allProjects, setAllProjects] = useState();
  const [projectsToShow, setProjectsToShow] = useState();

  useEffect(() => {
    fetch("http://localhost:3030/projects", {
      method: "GET",
    })
      .then(data => data.json())
      .then(data => setAllProjects(data))
      .catch(e => console.log(e));

    setProjectsToShow(allProjects);
  }, [setAllProjects]);

  /// API CALLS

  function getAProject(idOrName) {
    const response = fetch(`http://localhost:3030/projects/${idOrName}`, {
      method: "GET",
    })
      .then(data => data.json())
      .then(data => {
        setProjectsToShow(data);
        return data;
      })
      .catch(e => console.log(e));
    return response;
  }

  function getAllProjectsByType(type) {
    const response = fetch(`http://localhost:3030/projects?type=${type}`, {
      method: "GET",
    })
      .then(data => data.json())
      .then(data => {
        setProjectsToShow(data);

        return data;
      })
      .catch(e => console.log(e));
    return response;
  }

  function getByRequirement(req) {
    const response = fetch(
      `http://localhost:3030/projects?requirement=${req}`,
      {
        method: "GET",
      }
    )
      .then(data => data.json())
      .then(data => {
        setProjectsToShow(data);

        return data;
      })
      .catch(e => console.log(e));
    return response;
  }

  return (
    <div className="App">
      <h1>SOLO API</h1>
      {allProjects
        ? [
            <Stats allProjects={allProjects} />,
            <Sort allProjects={allProjects} />,
          ]
        : null}
      {projectsToShow ? <Projects projectsToShow={projectsToShow} /> : null}
    </div>
  );
}

export default App;
