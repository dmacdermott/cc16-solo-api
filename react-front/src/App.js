import React, { useState, useEffect } from "react";
import "./App.css";
import Stats from "./components/Stats";

function App() {
  const [projects, setProjects] = useState();

  useEffect(() => {
    fetch("http://localhost:3030/projects", {
      method: "GET",
    })
      .then(data => data.json())
      .then(data => setProjects(data))
      .catch(e => console.log(e));
  }, [setProjects]);
  if (projects)
    console.log(
      projects,
      projects.filter(project => project.nightmare !== null).length
    );

  return (
    <div className="App">
      <h1>SOLO API</h1>
      {projects ? <Stats projects={projects} /> : null}{" "}
    </div>
  );
}

export default App;
