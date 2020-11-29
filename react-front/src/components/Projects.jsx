import React, { useState, useEffect } from "react";

import Project from "./Project";
import "./projects.css";

const Projects = ({ projectsToShow }) => {
  const [projects, setProject] = useState();

  useEffect(() => {
    if (projectsToShow.length > 1) {
      setProject(
        projectsToShow.map(project => (
          <Project key={project.id} project={project} />
        ))
      );
    } else {
      setProject([
        <Project key={projectsToShow.id} project={projectsToShow} />,
      ]);
    }
  }, [setProject, projectsToShow]);

  return <div id="project-area">{projects}</div>;
};

export default Projects;
