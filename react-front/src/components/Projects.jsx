import React, { useState, useEffect } from "react";
import Project from "./Project";

const Projects = ({ projectsToShow }) => {
  const [projects, setProject] = useState();

  useEffect(() => {
    setProject(
      projectsToShow.map((project, index) => (
        <Project key={index} project={project} />
      ))
    );
  }, []);

  return <div>{projects}</div>;
};

export default Projects;
